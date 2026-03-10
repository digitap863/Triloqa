"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Upload, X, Plus, Trash2, Bold, Italic, Heading2, List, ListOrdered, Quote, Undo, Redo, RotateCcw } from "lucide-react";

// TipTap Imports
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useBlogStore } from "@/stores/blogStore";

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) return null;
    const buttons = [
        { icon: Bold, action: () => editor.chain().focus().toggleBold().run(), active: "bold" },
        { icon: Italic, action: () => editor.chain().focus().toggleItalic().run(), active: "italic" },
        { icon: Heading2, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: "heading", activeOptions: { level: 2 } },
        { icon: List, action: () => editor.chain().focus().toggleBulletList().run(), active: "bulletList" },
        { icon: ListOrdered, action: () => editor.chain().focus().toggleOrderedList().run(), active: "orderedList" },
        { icon: Quote, action: () => editor.chain().focus().toggleBlockquote().run(), active: "blockquote" },
    ];
    return (
        <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 border-b border-gray-200">
            {buttons.map((btn, i) => (
                <button
                    key={i}
                    type="button"
                    onClick={btn.action}
                    className={`p-1.5 rounded transition-colors hover:bg-gray-200 ${editor.isActive(btn.active, btn.activeOptions || {}) ? "text-[#1D8F2C] bg-green-50 shadow-inner" : "text-gray-600"}`}
                >
                    <btn.icon size={16} />
                </button>
            ))}
            <div className="w-px h-6 bg-gray-300 mx-1" />
            <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()} className="p-1.5 rounded hover:bg-gray-200 text-gray-500 disabled:opacity-30"><Undo size={16} /></button>
            <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()} className="p-1.5 rounded hover:bg-gray-200 text-gray-500 disabled:opacity-30"><Redo size={16} /></button>
        </div>
    );
};

const ContentSection = ({ section, index, updateSection, removeSection }: { section: { heading: string; body: string }; index: number; updateSection: (idx: number, data: any) => void; removeSection: (idx: number) => void; }) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: section.body,
        immediatelyRender: false,
        onUpdate: ({ editor }) => { updateSection(index, { body: editor.getHTML() }); },
    });
    return (
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden mb-6 group">
            <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-b border-gray-100">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Section #{index + 1}</h3>
                {index > 0 && (
                    <button type="button" onClick={() => removeSection(index)} className="text-red-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100">
                        <Trash2 size={16} />
                    </button>
                )}
            </div>
            <div className="p-6 space-y-4">
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-tighter">Section Heading</label>
                    <input type="text" value={section.heading} onChange={(e) => updateSection(index, { heading: e.target.value })} placeholder="Section Title..." className="w-full text-lg font-bold text-gray-800 border-b border-gray-200 focus:border-[#1D8F2C] outline-none pb-1" />
                </div>
                <div className="border border-gray-200 rounded overflow-hidden shadow-inner">
                    <MenuBar editor={editor} />
                    <div className="p-4 min-h-[180px] tiptap-editor">
                        <EditorContent editor={editor} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function EditBlogPage() {
    const router = useRouter();
    const { id } = useParams() as { id: string };
    const { fetchBlogById, updateBlog, loading } = useBlogStore();

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({ title: "", slug: "", author: "Triloqa Team", date: "", tags: "", });
    const [sections, setSections] = useState<{ heading: string; body: string }[]>([]);

    useEffect(() => {
        const load = async () => {
            const blog = await fetchBlogById(id);
            if (blog) {
                setFormData({
                    title: blog.title,
                    slug: blog.slug,
                    author: blog.author,
                    date: blog.date.split('T')[0],
                    tags: blog.tags.join(", "),
                });
                setImagePreview(blog.image);
                setSections(blog.content || []);
            }
        };
        load();
    }, [id, fetchBlogById]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (name === "title") setFormData(prev => ({ ...prev, slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const updateSection = (idx: number, data: any) => { setSections(prev => { const next = [...prev]; next[idx] = { ...next[idx], ...data }; return next; }); };
    const addSection = () => { setSections(prev => [...prev, { heading: "", body: "" }]); };
    const removeSection = (idx: number) => { setSections(prev => prev.filter((_, i) => i !== idx)); };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append("title", formData.title);
            data.append("author", formData.author);
            data.append("date", formData.date);
            data.append("tags", formData.tags);
            data.append("content", JSON.stringify(sections));
            if (imageFile) data.append("image", imageFile);

            await updateBlog(id, data);
            alert("Update Success!");
            router.push("/admin/blogs");
        } catch (error) {
            console.error(error);
            alert("Update Failed.");
        }
    };

    return (
        <div className="min-h-screen bg-[#F9FBFC] font-sans pb-20">
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/blogs" className="p-2 hover:bg-gray-100 rounded-full">
                            <ArrowLeft size={20} className="text-gray-600" />
                        </Link>
                        <div>
                            <h1 className="text-lg font-bold text-[#1b1e2e]">Update Article</h1>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-[#1D8F2C] rounded-full animate-pulse" /> Live Editing Mode
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleSubmit} disabled={loading}
                        className="px-6 py-2 bg-[#1D8F2C] text-white text-sm font-bold rounded flex items-center gap-2 hover:bg-green-700 transition-all shadow-sm shadow-green-200"
                    >
                        <Save size={16} /> {loading ? "Updating..." : "Save Changes"}
                    </button>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-10 lg:py-14">
                <form className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-8 space-y-8">
                        <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
                            <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full text-3xl md:text-4xl font-black text-[#1b1e2e] placeholder:text-gray-200 outline-none mb-4" placeholder="Draft Title..." required />
                            <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100 w-fit">
                                <span className="font-mono">Slug:</span>
                                <span className="text-[#1D8F2C] font-semibold">{formData.slug}</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-sm font-bold text-[#1b1e2e] uppercase tracking-wider flex items-center gap-2">
                                    <div className="w-1 h-4 bg-[#1D8F2C]" />
                                    Dynamic Content
                                </h2>
                                <button type="button" onClick={addSection} className="text-[11px] font-bold text-[#1D8F2C] flex items-center gap-1 hover:underline">
                                    <Plus size={14} /> Add Block
                                </button>
                            </div>
                            {sections.map((section, idx) => (
                                <ContentSection key={idx} index={idx} section={section} updateSection={updateSection} removeSection={removeSection} />
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Featured Image</h3>
                            <div className="relative aspect-video w-full rounded-lg border-2 border-dashed border-gray-200 overflow-hidden group">
                                {imagePreview ? (
                                    <>
                                        <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all backdrop-blur-[2px]">
                                            <label className="p-3 bg-white text-gray-800 rounded-full cursor-pointer hover:bg-gray-100 hover:scale-110 transition-all shadow-xl">
                                                <RotateCcw size={20} />
                                                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                            </label>
                                        </div>
                                    </>
                                ) : (
                                    <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                                        <Upload size={24} className="text-gray-300 mb-2" />
                                        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">Image Required</span>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                    </label>
                                )}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
                            <div className="space-y-1.5 font-bold">
                                <label className="text-[11px] text-gray-400 uppercase tracking-widest">Metadata Tags</label>
                                <input type="text" name="tags" value={formData.tags} onChange={handleInputChange} placeholder="Solar, Renewable..." className="w-full px-3 py-2 border border-gray-200 rounded text-sm outline-none focus:border-[#1D8F2C]" />
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Post Author</label>
                                    <input type="text" name="author" value={formData.author} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-200 rounded text-sm outline-none focus:border-[#1D8F2C]" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Publish Date</label>
                                    <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-200 rounded text-sm outline-none focus:border-[#1D8F2C]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </main>

            <style jsx global>{`
                .tiptap-editor .ProseMirror { min-height: 150px; outline: none; }
                .tiptap-editor h2 { font-size: 1.25rem; font-weight: 700; margin-bottom: 0.75rem; color: #1b1e2e; }
                .tiptap-editor p { margin-bottom: 0.75rem; color: #4B5563; line-height: 1.6; }
                .tiptap-editor blockquote { border-left: 4px solid #1D8F2C; padding-left: 1rem; font-style: italic; margin-bottom: 1rem; }
            `}</style>
        </div>
    );
}
