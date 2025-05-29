import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AppProvider } from "./contexts/AppContext";

// Layout and Auth-related pages
import Layout from "./components/Layout";
import Login from "./pages/Login";
import MobileInput from "./pages/MobileInput";
import OtpVerification from "./pages/OtpVerification";
import NoStoreLinked from "./pages/NoStoreLinked";
import StoreSelection from "./pages/StoreSelection";
import ContactForm from "./pages/ContactForm";
import ContactSuccess from "./pages/ContactSuccess";
import OnboardingStoreInfo from "./pages/OnboardingStoreInfo";
import OnboardingDocuments from "./pages/OnboardingDocuments";
import OnboardingAgreement from "./pages/OnboardingAgreement";
import ThanksFor from "./pages/ThanksFor";

// App Pages
import Dashboard from "../components/Dashboard/Dashboard";
import Product from "../components/Product/ProductList/Product";
import Profile from "../components/Profile/Profile";
import Order from "../components/Order/Order";
import Addproduct from "../components/Product/AddProduct/Addproduct";
import EditProduct from "../components/Product/Edit/EditProduct";

function App() {
  return (
    <AppProvider>
    
        <Toaster position="top-center" />
        <Routes>
          {/* Auth & Onboarding Routes inside Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Login />} />
            <Route path="mobile-input" element={<MobileInput />} />
            <Route path="otp-verification" element={<OtpVerification />} />
            <Route path="no-store" element={<NoStoreLinked />} />
            <Route path="select-store" element={<StoreSelection />} />
          </Route>

          {/* Other Independent Routes */}
          <Route path="contact" element={<ContactForm />} />
          <Route path="contact-success" element={<ContactSuccess />} />
          <Route path="store-info" element={<OnboardingStoreInfo />} />
          <Route path="documents" element={<OnboardingDocuments />} />
          <Route path="agreement" element={<OnboardingAgreement />} />
          <Route path="thanksfor" element={<ThanksFor />} />

          {/* Main App Pages */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="product" element={<Product />} />
          <Route path="addproduct" element={<Addproduct />} />
          <Route path="editproduct" element={<EditProduct />} />
          <Route path="profile" element={<Profile />} />
          <Route path="order" element={<Order />} />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
   
    </AppProvider>
  );
}

export default App;
