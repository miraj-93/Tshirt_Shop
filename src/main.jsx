import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  RouterProvider,
} from "react-router";
import { router } from './Router/routers';
import { AuthProvider } from './Context/AuthContext';
import { CartProvider } from './Context/CartContext';
import ProtectedRouteAdmin from './Components/ProtectedRouteAdmin';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
      <AuthProvider>
       <CartProvider>
    <RouterProvider router={router} />,
     </CartProvider>
      </AuthProvider>
     
  </StrictMode>,
)
