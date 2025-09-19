import {
  createBrowserRouter,
} from "react-router";
import mainLayout from "../Layouts/mainLayout";
import Home from "../Pages/Home";
import ProductDetails from "../Pages/ProductDetails";
import SearchResults from "../Pages/SearchResult";
import Shop from "../Pages/Shop";
import Cart from "../Pages/Cart";
import Blogs from "../Pages/Blogs";
import BlogDetails from "../Pages/BlogsDetails";
import Login from "../Components/Login";
import SignUp from "../Components/SignUp";
import UserProfile from "../Pages/userProfile";
import AdminProducts from "../Pages/AdminProduct";
import AdminBlogs from "../Pages/AdminBlog";
import CarouselManager from "../Pages/CarouselManager";
import ProtectedRouteAdmin from "../Components/ProtectedRouteAdmin";
import AboutUs from "../Pages/AboutUs";
import Contact from "../Pages/Contact";
import TermsPolicy from "../Pages/TermsPolicy";
import AdminDashboard from "../Pages/AdminDashBoard";
import ProductForm from "../Pages/ProductForm";
// import Orders from './../src/modules/user/ui/Orders';
// import Users from './../src/modules/superadmin/ui/Users';
import Checkout from "../Pages/checkOut";
import UserCard from "../Components/userCard";
import Users from '../Pages/Users';
import Orders from '../Pages/Orders';




export const router = createBrowserRouter([
  {
    path: "/",
    Component: mainLayout,
    children:[
        {
            index:true,
            Component:Home,
        },

       {path:"/login",
        Component:Login,

         },
        {
         path:"/signup",
         Component:SignUp,
        },

        {
        path:"/search",
        Component:SearchResults,
        },
        {
          path:"/product/:id",
          Component:ProductDetails,
        },{
            path:"/shop",
            Component:Shop,
        },
        {
            path:"/cart",
            Component:Cart,
        },
        {
            path:"/blogs",
            Component:Blogs,
        },
        {
            path:"/blogs/:id",
            Component:BlogDetails,
        },
        {
          path:"/userprofile",
          Component:UserProfile,
        },
        {
          path:"/aboutUs",
          Component:AboutUs,
        },
        {
          path:"/contact",
          Component:Contact,
        },
        {
          path:"/termsPolicy",
          Component:TermsPolicy,
        },
        {
          path:"/productForm",
          Component:ProductForm,
        },
        {
          path:"/checkout",
          Component:Checkout,
        },

        {
           path:"/userCard",
           Component:UserCard,
        },
        {
          path:"/admin/orders",
          element:(
           <ProtectedRouteAdmin requiredRole="admin">
          <Orders/>
          </ProtectedRouteAdmin>
          ),
        },  
        
        
        // Protected Admin Routes
        {
        path:"/admin/carousel",
        element:(
           <ProtectedRouteAdmin requiredRole="admin">
        <CarouselManager/>
        </ProtectedRouteAdmin>
        ),
        },
        {
          path:"/admin/users",
          element:(
           <ProtectedRouteAdmin requiredRole="admin">
          <Users/>
          </ProtectedRouteAdmin>
          ),
        }
      
        ,{
           path: "/admin/products",
        element: (
           <ProtectedRouteAdmin requiredRole="admin">
            <AdminProducts />
           </ProtectedRouteAdmin>
        ),

        },
        {
          path: "/admin/blogs",
        element: (
           <ProtectedRouteAdmin requiredRole="admin">
            <AdminBlogs />
          </ProtectedRouteAdmin>
        ),
        },
        {
           path: "/carouselmanager",
        element: (
           <ProtectedRouteAdmin requiredRole="admin">
            <CarouselManager />
           </ProtectedRouteAdmin>
        ),
        },{
           path: "/dashboard",
        element: (
           <ProtectedRouteAdmin requiredRole="admin">
            <AdminDashboard />
          </ProtectedRouteAdmin>
        ),
        }
    ]
        
    
  },
]);

