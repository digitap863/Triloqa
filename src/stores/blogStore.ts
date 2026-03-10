import api from "@/lib/api";
import { create } from "zustand";

export interface BlogItem {
    _id: string;
    title: string;
    slug: string;
    author: string;
    date: string;
    image: string;
    content: { heading: string; body: string }[];
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

interface BlogStore {
    blogs: BlogItem[];
    pagination: Pagination | null;
    loading: boolean;
    error: string | null;
    fetchBlogs: (params?: {
        search?: string;
        page?: number;
        limit?: number;
    }) => Promise<void>;
    addBlog: (formData: FormData) => Promise<void>;
    deleteBlog: (id: string) => Promise<void>;
    fetchBlogById: (id: string) => Promise<BlogItem | null>;
    updateBlog: (id: string, formData: FormData) => Promise<BlogItem>;
}

export const useBlogStore = create<BlogStore>((set) => ({
    blogs: [],
    pagination: null,
    loading: false,
    error: null,

    fetchBlogs: async (params = {}) => {
        set({ loading: true, error: null });
        try {
            const response = await api.get("/admin/blogs", { params });
            set({
                blogs: response.data.blogs,
                pagination: response.data.pagination,
                loading: false
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to fetch blogs";
            set({ error: message, loading: false });
        }
    },

    addBlog: async (formData: FormData) => {
        set({ loading: true, error: null });
        try {
            const response = await api.post("/admin/blogs", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            set((state) => ({
                blogs: [response.data, ...state.blogs],
                loading: false
            }));
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to add blog";
            set({ error: message, loading: false });
            throw error;
        }
    },

    deleteBlog: async (id: string) => {
        set({ loading: true, error: null });
        try {
            await api.delete(`/admin/blogs/${id}`);
            set((state) => ({
                blogs: state.blogs.filter((p) => p._id !== id),
                loading: false
            }));
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to delete blog";
            set({ error: message, loading: false });
            throw error;
        }
    },

    fetchBlogById: async (id: string) => {
        set({ loading: true, error: null });
        try {
            const response = await api.get(`/admin/blogs/${id}`);
            set({ loading: false });
            return response.data;
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to fetch blog";
            set({ error: message, loading: false });
            return null;
        }
    },

    updateBlog: async (id: string, formData: FormData) => {
        set({ loading: true, error: null });
        try {
            const response = await api.put(`/admin/blogs/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            set((state) => ({
                blogs: state.blogs.map(p => p._id === id ? response.data : p),
                loading: false
            }));
            return response.data;
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to update blog";
            set({ error: message, loading: false });
            throw error;
        }
    }
}));
