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

interface GalleryStore {
    galleryItems: GalleryItem[];
    pagination: Pagination | null;
    loading: boolean;
    error: string | null;
    fetchGallery: (params?: {
        category?: string;
        search?: string;
        page?: number;
        limit?: number;
    }) => Promise<void>;
    addGalleryItem: (formData: FormData) => Promise<void>;
    deleteGalleryItem: (id: string) => Promise<void>;
    fetchGalleryItemById: (id: string) => Promise<GalleryItem | null>;
    updateGalleryItem: (id: string, formData: FormData) => Promise<GalleryItem>;
    currentGalleryItem: GalleryItem | null;
}

export const useGalleryStore = create<GalleryStore>((set) => ({
    galleryItems: [],
    pagination: null,
    currentGalleryItem: null,
    loading: false,
    error: null,

    fetchGallery: async (params = {}) => {
        set({ loading: true, error: null });
        try {
            const response = await api.get("/admin/gallery", { params });
            // API returns { galleryItems: [...], pagination: {...} }
            set({
                galleryItems: response.data.galleryItems,
                pagination: response.data.pagination,
                loading: false
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to fetch gallery items";
            set({ error: message, loading: false });
        }
    },

    addGalleryItem: async (formData: FormData) => {
        set({ loading: true, error: null });
        try {
            const response = await api.post("/admin/gallery", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            set((state) => ({
                galleryItems: [response.data, ...state.galleryItems],
                loading: false
            }));
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to add gallery item";
            set({ error: message, loading: false });
            throw error;
        }
    },

    deleteGalleryItem: async (id: string) => {
        set({ loading: true, error: null });
        try {
            await api.delete(`/admin/gallery/${id}`);
            set((state) => ({
                galleryItems: state.galleryItems.filter((p) => p._id !== id),
                loading: false
            }));
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to delete gallery item";
            set({ error: message, loading: false });
            throw error;
        }
    },

    fetchGalleryItemById: async (id: string) => {
        set({ loading: true, error: null });
        try {
            const response = await api.get(`/admin/gallery/${id}`);
            set({ currentGalleryItem: response.data, loading: false });
            return response.data;
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to fetch gallery item";
            set({ error: message, loading: false, currentGalleryItem: null });
            return null;
        }
    },

    updateGalleryItem: async (id: string, formData: FormData) => {
        set({ loading: true, error: null });
        try {
            const response = await api.put(`/admin/gallery/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            set((state) => ({
                galleryItems: state.galleryItems.map(p => p._id === id ? response.data : p),
                loading: false
            }));
            return response.data;
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to update gallery item";
            set({ error: message, loading: false });
            throw error;
        }
    }
}));
