import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyDriver from "./pages/ApplyDriver";
import NotificationPage from "./pages/NotificationPage";
import Users from "./pages/admin/Users";
import Driver from "./pages/admin/Driver";
import Profile from "./pages/driver/Profile";
import BookingPage from "./pages/BookingPage";
import Applied from "./pages/Applied";
import DriverApplied from "./pages/driver/DriverApplied";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
           
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />

            <Route
              path="/apply-driver"
              element={
                <ProtectedRoute>
                  <ApplyDriver />
                </ProtectedRoute>
              }
            />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/notification"
              element={
                <ProtectedRoute>
                  <NotificationPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/driver"
              element={
                <ProtectedRoute>
                  <Driver />
                </ProtectedRoute>
              }
            /> 

             <Route
              path="/driver/profile/:id"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/driver/apply/:driverId"
              element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              }
            />

              <Route
              path="/applied"
              element={
                <ProtectedRoute>
                  <Applied />
                </ProtectedRoute>
              }
            />

            <Route
              path="/driver-applied"
              element={
                <ProtectedRoute>
                  <DriverApplied />
                </ProtectedRoute>
              }
            />

          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;