import api from "@/lib/api";
import { create } from "zustand";

export interface GalleryItem {
    _id: string;
    title: string;
    image: string;
    category: string;
    date: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
}

interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

interface UserGalleryStore {
    galleryItems: GalleryItem[];
    pagination: Pagination | null;
    loading: boolean;
    error: string | null;
    fetchGallery: (params?: {
        category?: string;
        page?: number;
        limit?: number;
    }) => Promise<void>;
}

export const useUserGalleryStore = create<UserGalleryStore>((set) => ({
    galleryItems: [],
    pagination: null,
    loading: false,
    error: null,

    fetchGallery: async (params = {}) => {
        set({ loading: true, error: null });
        try {
            const response = await api.get("/user/gallery", { params });
            set({
                galleryItems: response.data.galleryItems,
                pagination: response.data.pagination,
                loading: false
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to fetch gallery items";
            set({ error: message, loading: false });
        }
    }
}));
