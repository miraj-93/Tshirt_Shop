
import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../Utils/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

// const AuthContext = createContext();
  export const AuthContext = createContext(); // 👈 add export

// Hook for using Auth
export const useAuth = () => useContext(AuthContext);


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);





  // 🔹 Register with Email/Password
  const register = async (email, password, name) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(res.user, { displayName: name });

    // Save user to Firestore
    await setDoc(doc(db, "users", res.user.uid), {
      uid: res.user.uid,
      name,
      email,
      role: "customer", // default role
      createdAt: serverTimestamp(),
    });

    setUser(res.user);
    setRole("customer");
  };

  // 🔹 Login with Email/Password
  const login = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    setUser(res.user);

    // Fetch role from Firestore
    const docSnap = await getDoc(doc(db, "users", res.user.uid));
    if (docSnap.exists()) {
      setRole(docSnap.data().role);
    }
  };

  // 🔹 Google Login
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);

    // Check if user exists in Firestore
    const userRef = doc(db, "users", res.user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      await setDoc(userRef, {
        uid: res.user.uid,
        name: res.user.displayName,
        email: res.user.email,
        role: "customer", // default role
        createdAt: serverTimestamp(),
      });
    }

    setUser(res.user);
    setRole(docSnap.exists() ? docSnap.data().role : "customer");
  };

  // 🔹 Logout
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setRole(null);
  };

  // 🔹 Keep User Authenticated + Fetch Role
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        const docSnap = await getDoc(doc(db, "users", currentUser.uid));
        if (docSnap.exists()) {
          setRole(docSnap.data().role);
        } else {
          // Fallback in case user doc is missing
          await setDoc(doc(db, "users", currentUser.uid), {
            uid: currentUser.uid,
            name: currentUser.displayName || "No Name",
            email: currentUser.email,
            role: "customer",
            createdAt: serverTimestamp(),
          });
          setRole("customer");
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, role, register, login, googleLogin, logout, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

