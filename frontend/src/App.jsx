import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import Stores from "./pages/Stores";
import StoreOwnerDashboard from "./pages/StoreOwnerDashboard";
import Users from "./pages/Users";
import StoresManagement from "./pages/StoresManagement";
import StoreOwnerRatings
from "./pages/StoreOwnerRatings";
import ChangePassword from "./pages/ChangePassword";
import UserDetails from "./pages/UserDetails";
import CreateUser from "./pages/CreateUser";
import CreateStore from "./pages/CreateStore";
import AdminRoute from "./components/AdminRoute";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminRoute>
      <AdminDashboard />
      </AdminRoute>

    </ProtectedRoute>
  }
/>
        <Route
         path="/users"
         element={
           <ProtectedRoute>
             <Users />
           </ProtectedRoute>
         }
        />
        <Route
         path="/manage-stores"
        element={
          <ProtectedRoute>
            <StoresManagement />
          </ProtectedRoute>
        }
        />
        <Route
          path="/stores"
          element={
            <ProtectedRoute>
              <Stores />
            </ProtectedRoute>
          }
        />
        <Route
  path="/owner-ratings"
  element={
    <ProtectedRoute>
      <StoreOwnerRatings />
    </ProtectedRoute>
  }
 />
 <Route
  path="/change-password"
  element={
    <ProtectedRoute>
      <ChangePassword />
    </ProtectedRoute>
  }
/>
        <Route
          path="/owner"
          element={
            <ProtectedRoute>
              <StoreOwnerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/:id"
          element={
            <ProtectedRoute>
              <UserDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-user"
          element={
            <ProtectedRoute>
              <CreateUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-store"
          element={
            <ProtectedRoute>
              <CreateStore />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;