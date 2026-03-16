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

interface UserSubServiceStore {
    subServices: SubServiceItem[];
    currentSubService: SubServiceItem | null;
    otherSubServices: SubServiceItem[];
    pagination: Pagination | null;
    loading: boolean;
    error: string | null;

    /** Fetch sub-services for a given parent service */
    fetchSubServices: (params?: {
        parentServiceId?: string;
        page?: number;
        limit?: number;
    }) => Promise<void>;

    /** Fetch a single sub-service by its slug */
    fetchSubServiceBySlug: (slug: string) => Promise<void>;
}

/* ─── Store ─── */
export const useUserSubServiceStore = create<UserSubServiceStore>((set) => ({
    subServices: [],
    currentSubService: null,
    otherSubServices: [],
    pagination: null,
    loading: false,
    error: null,

    fetchSubServices: async (params = {}) => {
        set({ loading: true, error: null });
        try {
            const response = await api.get("/user/sub-services", { params });
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

    fetchSubServiceBySlug: async (slug: string) => {
        set({ loading: true, error: null, currentSubService: null });
        try {
            const response = await api.get(`/user/sub-services/${slug}`);
            set({
                currentSubService: response.data.subService,
                otherSubServices: response.data.otherSubServices,
                loading: false
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to fetch sub-service details";
            set({ error: message, loading: false });
        }
    },
}));
