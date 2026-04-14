import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Weather from "./pages/Weather";
import Market from "./pages/Market";
import Navbar from "./components/Navbar";
import CropDetail from "./pages/CropDetail";
import AddCrop from "./components/AddCrops";
import MyCrops from "./pages/MyCrops";
import Detail from "./pages/Detail";
import BuyerMarket from "./pages/BuyerMarket";
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Crops from "./pages/Crops";
import FarmerDashboard from "./pages/FarmerDashboard";
import AddOrEditCrop from "./pages/AddOrEditCrop"; // ✅ added

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/crops"
          element={
            <ProtectedRoute>
              <Crops />
            </ProtectedRoute>
          }
        />
        <Route
          path="/weather"
          element={
            <ProtectedRoute>
              <Weather />
            </ProtectedRoute>
          }
        />
        <Route
          path="/market"
          element={
            <ProtectedRoute>
              <Market />
            </ProtectedRoute>
          }
        />
        <Route
          path="/crop/:cropId"
          element={
            <ProtectedRoute>
              <CropDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-crops"
          element={
            <ProtectedRoute>
              <MyCrops />
            </ProtectedRoute>
          }
        />
        <Route
          path="/detail"
          element={
            <ProtectedRoute>
              <Detail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/buy-crop"
          element={
            <ProtectedRoute>
              <BuyerMarket />
            </ProtectedRoute>
          }
        />
        <Route
          path="/farmer"
          element={
            <ProtectedRoute>
              <FarmerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-crop"
          element={
            <ProtectedRoute>
              <AddOrEditCrop />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-crop/:cropId"
          element={
            <ProtectedRoute>
              <AddOrEditCrop />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
