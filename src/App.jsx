import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import { LightDarkModeProvider } from "./contexts/LigthDarkModeContext";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import AppLayout from "./components/ui/AppLayout";
import Spinner from "./components/ui/Spinner";

const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Overview = lazy(() => import("./pages/Overview"));
const Bookings = lazy(() => import("./pages/Bookings"));
const Services = lazy(() => import("./pages/Services"));
const Availability = lazy(() => import("./pages/Availability"));
const Users = lazy(() => import("./pages/Users"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./components/ui/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <LightDarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="/overview" />} />
                <Route path="/overview" element={<Overview />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/services" element={<Services />} />
                <Route path="/availability" element={<Availability />} />
                <Route path="/users" element={<Users />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/reset-password/:resetToken"
                element={<ResetPassword />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <Toaster richColors closeButton />
      </QueryClientProvider>
    </LightDarkModeProvider>
  );
}

export default App;
