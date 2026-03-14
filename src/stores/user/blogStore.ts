import api from "@/lib/api";
import { create } from "zustand";

export interface BlogItem {
    _id: string;
    title: string;
    slug: string;
    author: string;
    date: string;
    image: string;
    content: string;
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

interface UserBlogStore {
    blogs: BlogItem[];
    currentBlog: BlogItem | null;
    recentBlogs: BlogItem[];
    pagination: Pagination | null;
    loading: boolean;
    error: string | null;
    fetchBlogs: (params?: {
        search?: string;
        tag?: string;
        page?: number;
        limit?: number;
    }) => Promise<void>;
    fetchBlogBySlug: (slug: string) => Promise<void>;
}

export const useUserBlogStore = create<UserBlogStore>((set) => ({
    blogs: [],
    currentBlog: null,
    recentBlogs: [],
    pagination: null,
    loading: false,
    error: null,

    fetchBlogs: async (params = {}) => {
        set({ loading: true, error: null });
        try {
            const response = await api.get("/user/blogs", { params });
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

    fetchBlogBySlug: async (slug: string) => {
        set({ loading: true, error: null, currentBlog: null });
        try {
            const response = await api.get(`/user/blogs/${slug}`);
            set({
                currentBlog: response.data.blog,
                recentBlogs: response.data.recentBlogs,
                loading: false
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to fetch blog details";
            set({ error: message, loading: false });
        }
    }
}));
