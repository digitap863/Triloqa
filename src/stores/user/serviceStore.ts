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

interface UserServiceStore {
    services: ServiceItem[];
    currentService: ServiceItem | null;
    otherServices: ServiceItem[];
    pagination: Pagination | null;
    loading: boolean;
    error: string | null;
    fetchServices: (params?: {
        search?: string;
        page?: number;
        limit?: number;
    }) => Promise<void>;
    fetchServiceBySlug: (slug: string) => Promise<void>;
}

export const useUserServiceStore = create<UserServiceStore>((set) => ({
    services: [],
    currentService: null,
    otherServices: [],
    pagination: null,
    loading: false,
    error: null,

    fetchServices: async (params = {}) => {
        set({ loading: true, error: null });
        try {
            const response = await api.get("/user/services", { params });
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

    fetchServiceBySlug: async (slug: string) => {
        set({ loading: true, error: null, currentService: null });
        try {
            const response = await api.get(`/user/services/${slug}`);
            set({
                currentService: response.data.service,
                otherServices: response.data.otherServices,
                loading: false
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to fetch service details";
            set({ error: message, loading: false });
        }
    }
}));
