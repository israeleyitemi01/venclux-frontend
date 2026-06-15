import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Layouts
import DashboardLayout from "./components/layout/DashboardLayout";
import StoreLayout from "./components/layout/StoreLayout";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import Orders from "./pages/admin/Orders";
import Products from "./pages/admin/Products";
import Customers from "./pages/admin/Customers";
import Automation from "./pages/admin/Automation";
import StorefrontConfig from "./pages/admin/StorefrontConfig";
import Analytics from "./pages/admin/Analytics";
import Settings from "./pages/admin/Settings";
import SearchResults from "./pages/admin/SearchResults";

// Public Storefront Pages
import VendorStore from "./pages/public/VendorStore";
import Checkout from "./pages/public/Checkout";
import SuccessConfirmation from "./pages/public/SuccessConfirmation";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerifyOtp from "./pages/auth/VerifyOtp";

// Context Providers
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext"; 

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
              {/* Index redirects to Login for now */}
              <Route path="/" element={<Navigate to="/login" replace />}/> 

              {/* Authentication Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-otp" element={<VerifyOtp />} />

            {/* Protected Vendor Admin Portal Routes */}
            <Route path="/admin" element={<DashboardLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="orders" element={<Orders />} />
              <Route path="products" element={<Products />} />
              <Route path="customers" element={<Customers />} />
              <Route path="automation" element={<Automation />} />
              <Route path="storefront" element={<StorefrontConfig />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
              <Route path="search" element={<SearchResults />} />
            </Route>

            {/* Public Storefront Customer Routes */}
            <Route path="/shop/:storeSlug" element={<StoreLayout />}>
              <Route index element={<VendorStore />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="confirmation" element={<SuccessConfirmation />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;