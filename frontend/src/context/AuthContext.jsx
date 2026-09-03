import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  getCurrentUser,
  loginUser,
  loginWithGoogleUser,
  registerUser,
  updateProfile,
} from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const persistUser = (newUser) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem("probook_user", JSON.stringify(newUser));
      localStorage.setItem("userName", newUser.name || "User");
    }
  };

  useEffect(() => {
    const bootstrap = async () => {
      const storedToken = localStorage.getItem("urban_token");

      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await getCurrentUser();
        persistUser(response.user);
      } catch {
        localStorage.removeItem("urban_token");
        localStorage.removeItem("probook_user");
        localStorage.removeItem("userName");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, []);

  const login = async (email, password) => {
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    if (!email.includes("@")) {
      throw new Error("Please enter a valid email address.");
    }

    const response = await loginUser({ email, password });
    localStorage.setItem("urban_token", response.token);
    persistUser(response.user);

    return response.user;
  };

  const register = async (name, email, password, phone = "") => {
    if (!name || !email || !password) {
      throw new Error("Please fill in all fields.");
    }

    if (!email.includes("@")) {
      throw new Error("Please enter a valid email address.");
    }

    if (password.length < 6) {
      throw new Error("Password must contain at least 6 characters.");
    }

    const response = await registerUser({
      name,
      email,
      password,
      phone,
    });

    localStorage.setItem("urban_token", response.token);
    persistUser(response.user);

    return response.user;
  };

  const logout = () => {
    localStorage.removeItem("urban_token");
    localStorage.removeItem("probook_user");
    localStorage.removeItem("userName");
    setUser(null);
  };

  const loginWithGoogle = async (credential) => {
    const response = await loginWithGoogleUser(credential);
    localStorage.setItem("urban_token", response.token);
    localStorage.setItem("personal_email", response.user.email);
    localStorage.setItem("user_email", response.user.email);
    persistUser(response.user);
    return response.user;
  };

  const refreshUser = async () => {
    const response = await getCurrentUser();
    persistUser(response.user);
    return response.user;
  };

  const updateUser = async (updates) => {
    const response = await updateProfile(updates);
    persistUser(response.user);
    return response.user;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        loginWithGoogle,
        refreshUser,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}