import api from "@/lib/api";
import { create } from "zustand";

/* ─── Types ─── */
export interface SubServiceItem {
    _id: string;
    parentServiceId: string;
    title: string;
    slug: string;
    description: string;
    img: string;
    order: number;
    createdAt: string;
    updatedAt: string;
}

interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

interface SubServiceStore {
    subServices: SubServiceItem[];
    pagination: Pagination | null;
    loading: boolean;
    error: string | null;

    /** Fetch all sub-services for a given parent service */
    fetchSubServices: (params?: {
        parentServiceId?: string;
        page?: number;
        limit?: number;
    }) => Promise<void>;

    /** Create a new sub-service */
    addSubService: (formData: FormData) => Promise<SubServiceItem>;

    /** Fetch a single sub-service by its _id */
    fetchSubServiceById: (id: string) => Promise<SubServiceItem | null>;

    /** Update an existing sub-service */
    updateSubService: (id: string, formData: FormData) => Promise<SubServiceItem>;

    /** Delete a sub-service */
    deleteSubService: (id: string) => Promise<void>;
}

/* ─── Store ─── */
export const useSubServiceStore = create<SubServiceStore>((set) => ({
    subServices: [],
    pagination: null,
    loading: false,
    error: null,

    fetchSubServices: async (params = {}) => {
        set({ loading: true, error: null });
        try {
            const response = await api.get("/admin/sub-services", { params });
            set({
                subServices: response.data.subServices,
                pagination: response.data.pagination,
                loading: false,
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to fetch sub-services";
            set({ error: message, loading: false });
        }
    },

    addSubService: async (formData: FormData) => {
        set({ loading: true, error: null });
        try {
            const response = await api.post("/admin/sub-services", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            set((state) => ({
                subServices: [response.data, ...state.subServices],
                loading: false,
            }));
            return response.data;
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to add sub-service";
            set({ error: message, loading: false });
            throw error;
        }
    },

    fetchSubServiceById: async (id: string) => {
        set({ loading: true, error: null });
        try {
            const response = await api.get(`/admin/sub-services/${id}`);
            set({ loading: false });
            return response.data;
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to fetch sub-service";
            set({ error: message, loading: false });
            return null;
        }
    },

    updateSubService: async (id: string, formData: FormData) => {
        set({ loading: true, error: null });
        try {
            const response = await api.patch(`/admin/sub-services/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            set((state) => ({
                subServices: state.subServices.map((s) => (s._id === id ? response.data : s)),
                loading: false,
            }));
            return response.data;
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to update sub-service";
            set({ error: message, loading: false });
            throw error;
        }
    },

    deleteSubService: async (id: string) => {
        set({ loading: true, error: null });
        try {
            await api.delete(`/admin/sub-services/${id}`);
            set((state) => ({
                subServices: state.subServices.filter((s) => s._id !== id),
                loading: false,
            }));
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to delete sub-service";
            set({ error: message, loading: false });
            throw error;
        }
    },
}));
