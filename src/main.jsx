import { StrictMode } from "react";  
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from './context/CartContext'
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// นำ code React ทั้งหมดไปแสดงผลบนหน้า HTML ที่มี id เป็น "root"
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
);
