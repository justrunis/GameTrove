import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/http";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { AuthVerify } from "./auth/auth";

import Header from "./components/UI/Header";
import Footer from "./components/UI/Footer";

import Home from "./pages/Home";
import Games from "./pages/Games";
import Game from "./pages/Game";
import About from "./pages/About";
import Giveaways from "./pages/Giveaways";

import AdminRoute from "./components/Auth/AdminRoute";
import Admin from "./pages/Admin";

import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Profile from "./pages/Profile";

import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [token, setToken] = useState(localStorage.getItem("game-trove-token"));

  const handleLogin = (token) => {
    setToken(token);
  };

  AuthVerify(token);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <ToastContainer position="top-center" />
          <main className="flex-grow flex flex-col justify-center items-center">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/games" element={<Games />} />
              <Route path="/games/:id" element={<Game />} />
              <Route path="/about" element={<About />} />
              <Route path="/giveaways" element={<Giveaways />} />

              <Route element={<ProtectedRoute token={token} />}>
                <Route path="/profile" element={<Profile />} />
              </Route>

              <Route element={<AdminRoute token={token} />}>
                <Route path="/admin" element={<Admin />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
