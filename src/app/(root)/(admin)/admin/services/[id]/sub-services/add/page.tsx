"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import {
    ArrowLeft,
    Upload,
    X,
    Save,
    Layers,
    Heading1,
    Heading2,
    Bold,
    Italic,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
} from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useSubServiceStore } from "@/stores/subServiceStore";
import { useServiceStore } from "@/stores/serviceStore";

/* ─── Tiptap Menu Bar ─── */
const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) return null;
    const buttons = [
        { icon: Bold, action: () => editor.chain().focus().toggleBold().run(), active: "bold", title: "Bold" },
        { icon: Italic, action: () => editor.chain().focus().toggleItalic().run(), active: "italic", title: "Italic" },
        { icon: Heading1, action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: "heading", activeOptions: { level: 1 }, title: "H1" },
        { icon: Heading2, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: "heading", activeOptions: { level: 2 }, title: "H2" },
        { icon: List, action: () => editor.chain().focus().toggleBulletList().run(), active: "bulletList", title: "Bullet List" },
        { icon: ListOrdered, action: () => editor.chain().focus().toggleOrderedList().run(), active: "orderedList", title: "Ordered List" },
        { icon: Quote, action: () => editor.chain().focus().toggleBlockquote().run(), active: "blockquote", title: "Blockquote" },
    ];
    return (
        <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 border-b border-gray-200">
            {buttons.map((btn, i) => (
                <button
                    key={i}
                    type="button"
                    onClick={btn.action}
                    className={`p-1.5 rounded transition-colors hover:bg-gray-200 ${editor.isActive(btn.active, btn.activeOptions || {}) ? "text-[#1D8F2C] bg-green-50 shadow-inner" : "text-gray-600"}`}
                    title={btn.title}
                >
                    <btn.icon size={16} />
                </button>
            ))}
            <div className="w-px h-6 bg-gray-300 mx-1" />
            <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()} className="p-1.5 rounded hover:bg-gray-200 text-gray-500 disabled:opacity-30">
                <Undo size={16} />
            </button>
            <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()} className="p-1.5 rounded hover:bg-gray-200 text-gray-500 disabled:opacity-30">
                <Redo size={16} />
            </button>
        </div>
    );
};

export default function AddSubServicePage() {
    const router = useRouter();
    const params = useParams();
    const parentId = params.id as string;

    const { addSubService, loading } = useSubServiceStore();
    const { fetchServiceById } = useServiceStore();
    const [parentService, setParentService] = useState<{ title: string } | null>(null);

    // Image states
    const [imgPreview, setImgPreview] = useState<string | null>(null);
    const [imgFile, setImgFile] = useState<File | null>(null);

    // Form state
    const [formData, setFormData] = useState({ title: "", slug: "" });

    // Tiptap editor
    const editor = useEditor({
        extensions: [StarterKit],
        content: "<p>Describe this sub-service here...</p>",
        immediatelyRender: false,
    });

    // Fetch parent service name for breadcrumb context
    useEffect(() => {
        const fetchParent = async () => {
            const parent = await fetchServiceById(parentId);
            if (parent) setParentService(parent);
        };
        if (parentId) fetchParent();
    }, [parentId, fetchServiceById]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (name === "title") {
            setFormData(prev => ({
                ...prev,
                slug: value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
            }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImgFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setImgPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !imgFile) {
            alert("Please enter a title and upload an image.");
            return;
        }
        try {
            const data = new FormData();
            data.append("title", formData.title);
            data.append("description", editor?.getHTML() || "");
            data.append("img", imgFile);
            data.append("parentServiceId", parentId);

            await addSubService(data);

            alert("Type added successfully!");
            router.push("/admin/services");
        } catch (error) {
            console.error("Submission failed:", error);
            alert("Failed to add type. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-[#F9FBFC] font-sans pb-20">
            {/* ─── NAVIGATION ─── */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/services" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <ArrowLeft size={20} className="text-gray-600" />
                        </Link>
                        <div>
                            <h1 className="text-lg font-bold text-[#1b1e2e]">Add Types</h1>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                                Under:{" "}
                                <span className="text-[#1D8F2C]">
                                    {parentService?.title || "Loading..."}
                                </span>
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-6 py-2 bg-[#1D8F2C] text-white text-sm font-bold rounded flex items-center gap-2 hover:bg-green-700 transition-all disabled:opacity-50 shadow-sm shadow-green-200"
                    >
                        <Save size={16} />
                        {loading ? "Saving..." : "Save Type"}
                    </button>
                </div>
            </nav>

            {/* ─── CONTEXT BADGE ─── */}
            <div className="max-w-7xl mx-auto px-6 pt-6">
                <div className="flex items-center gap-2 text-xs text-gray-500 bg-[#1D8F2C]/5 border border-[#1D8F2C]/10 px-4 py-2.5 rounded-lg w-fit">
                    <Layers size={13} className="text-[#1D8F2C]" />
                    <span>This type will be nested under</span>
                    <span className="font-bold text-[#1D8F2C]">{parentService?.title || "parent service"}</span>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-8">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* ─── MAIN CONTENT (8 cols) ─── */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* Title Block */}
                        <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full text-2xl md:text-3xl font-black text-[#1b1e2e] placeholder:text-gray-200 outline-none mb-4"
                                placeholder="e.g. Residential Solar Setup..."
                                required
                            />
                            <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100 w-fit">
                                <span className="font-mono">Slug:</span>
                                <span className="text-[#1D8F2C] font-semibold">
                                    /services/{formData.slug || "sub-service-slug"}
                                </span>
                            </div>
                        </div>

                        {/* Description Editor */}
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Layers size={13} className="text-[#1D8F2C]" />
                                Type Description
                            </label>
                            <div className="border border-gray-200 rounded overflow-hidden">
                                <MenuBar editor={editor} />
                                <div className="p-4 min-h-[300px] tiptap-editor">
                                    <EditorContent editor={editor} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ─── SIDEBAR (4 cols) ─── */}
                    <div className="lg:col-span-4 space-y-6">

                        {/* Image Upload */}
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Type Image</h3>
                            <div className="relative aspect-[16/10] w-full rounded-lg border-2 border-dashed border-gray-200 overflow-hidden group bg-gray-50">
                                {imgPreview ? (
                                    <>
                                        <Image src={imgPreview} alt="Preview" fill className="object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => { setImgPreview(null); setImgFile(null); }}
                                            className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-red-500 transition-colors backdrop-blur-sm"
                                        >
                                            <X size={14} />
                                        </button>
                                    </>
                                ) : (
                                    <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100/50 transition-all">
                                        <Upload size={24} className="text-gray-300 mb-2" />
                                        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">Click to Upload</span>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                    </label>
                                )}
                            </div>
                        </div>

                        {/* Tip card */}
                        <div className="p-5 bg-green-50 rounded-xl border border-green-100/50 flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                <Layers size={18} className="text-[#1D8F2C]" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-green-900 mb-1 leading-none">Type</h4>
                                <p className="text-[11px] text-green-700 leading-relaxed uppercase tracking-tight font-medium opacity-80">
                                    Title • Description • Image
                                </p>
                                <p className="text-[10px] text-green-600 leading-relaxed mt-1">
                                    Types appear nested under the parent service on the detail page.
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </main>

            <style jsx global>{`
        .tiptap-editor .ProseMirror { min-height: 250px; outline: none; }
        .tiptap-editor h1 { font-size: 1.875rem; font-weight: 800; margin-bottom: 1rem; color: #1b1e2e; }
        .tiptap-editor h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.75rem; color: #1b1e2e; }
        .tiptap-editor p { margin-bottom: 1rem; color: #4B5563; line-height: 1.6; }
        .tiptap-editor ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; }
        .tiptap-editor ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1rem; }
        .tiptap-editor blockquote { border-left: 4px solid #1D8F2C; padding-left: 1rem; font-style: italic; margin-bottom: 1rem; }
      `}</style>
        </div>
    );
}
