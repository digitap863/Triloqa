import api from "@/lib/api";
import { create } from "zustand";

interface AuthState {
  loading: boolean;
  error: null | string;
  adminLogin: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; message?: string }>;
  clearError: () => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  loading: false,
  error: null,
  adminLogin: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post("/admin/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        set({ loading: false, error: null });
        return { success: true };
      } else {
        set({
          loading: false,
          error: response.data.message || "Login failed",
        });
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      let errorMessage = "An error occurred during login";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      // Handle axios error with response
      if (typeof error === "object" && error !== null && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }

      console.error("Login error:", error);
      set({
        error: errorMessage,
        loading: false,
      });
      return { success: false, message: errorMessage };
    }
  },

  clearError: () => {
    set({ error: null });
  },

  logout: async () => {
    try {
      await api.post("/admin/auth/logout");
      set({ error: null });
      
      // Force a full page reload to clear any cached state and cookies
      window.location.href = "/admin/login";
    } catch (error) {
      console.error("Logout error:", error);
      // Even if the API call fails, clear local state and redirect
      set({ error: null });
      window.location.href = "/admin/login";
    }
  },
}));