import api from "@/lib/api";
import { create } from "zustand";

export interface ServiceItem {
    _id: string;
    title: string;
    slug: string;
    description: string;
    img1: string;
    img2: string;
    createdAt: string;
    updatedAt: string;
}

interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

interface ServiceStore {
    services: ServiceItem[];
    pagination: Pagination | null;
    loading: boolean;
    error: string | null;
    fetchServices: (params?: {
        search?: string;
        page?: number;
        limit?: number;
    }) => Promise<void>;
    addService: (formData: FormData) => Promise<void>;
    deleteService: (id: string) => Promise<void>;
    fetchServiceById: (id: string) => Promise<ServiceItem | null>;
    updateService: (id: string, formData: FormData) => Promise<ServiceItem>;
}

export const useServiceStore = create<ServiceStore>((set) => ({
    services: [],
    pagination: null,
    loading: false,
    error: null,

    fetchServices: async (params = {}) => {
        set({ loading: true, error: null });
        try {
            const response = await api.get("/admin/services", { params });
            set({
                services: response.data.services,
                pagination: response.data.pagination,
                loading: false
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to fetch services";
            set({ error: message, loading: false });
        }
    },

    addService: async (formData: FormData) => {
        set({ loading: true, error: null });
        try {
            const response = await api.post("/admin/services", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            set((state) => ({
                services: [response.data, ...state.services],
                loading: false
            }));
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to add service";
            set({ error: message, loading: false });
            throw error;
        }
    },

    deleteService: async (id: string) => {
        set({ loading: true, error: null });
        try {
            await api.delete(`/admin/services/${id}`);
            set((state) => ({
                services: state.services.filter((p) => p._id !== id),
                loading: false
            }));
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to delete service";
            set({ error: message, loading: false });
            throw error;
        }
    },

    fetchServiceById: async (id: string) => {
        set({ loading: true, error: null });
        try {
            const response = await api.get(`/admin/services/${id}`);
            set({ loading: false });
            return response.data;
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to fetch service";
            set({ error: message, loading: false });
            return null;
        }
    },

    updateService: async (id: string, formData: FormData) => {
        set({ loading: true, error: null });
        try {
            const response = await api.put(`/admin/services/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            set((state) => ({
                services: state.services.map(p => p._id === id ? response.data : p),
                loading: false
            }));
            return response.data;
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to update service";
            set({ error: message, loading: false });
            throw error;
        }
    }
}));
