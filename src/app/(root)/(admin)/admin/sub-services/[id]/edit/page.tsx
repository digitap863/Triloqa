"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import {
    ArrowLeft,
    Save,
    Upload,
    RotateCcw,
    Layers,
    Bold,
    Italic,
    Heading1,
    Heading2,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
    Loader2,
} from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useSubServiceStore } from "@/stores/subServiceStore";

/* ─── Tiptap Menu Bar ─── */
const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) return null;
    const buttons = [
        { icon: Bold, action: () => editor.chain().focus().toggleBold().run(), active: "bold" },
        { icon: Italic, action: () => editor.chain().focus().toggleItalic().run(), active: "italic" },
        { icon: Heading1, action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: "heading", activeOptions: { level: 1 } },
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
            <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()} className="p-1.5 rounded hover:bg-gray-200 text-gray-500 disabled:opacity-30">
                <Undo size={16} />
            </button>
            <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()} className="p-1.5 rounded hover:bg-gray-200 text-gray-500 disabled:opacity-30">
                <Redo size={16} />
            </button>
        </div>
    );
};

/* ─── Main Page ─── */
export default function EditSubServicePage() {
    const router = useRouter();
    const { id } = useParams() as { id: string };
    const { fetchSubServiceById, updateSubService, loading } = useSubServiceStore();

    const [imgPreview, setImgPreview] = useState<string | null>(null);
    const [imgFile, setImgFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({ title: "", slug: "" });
    const [parentTitle, setParentTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");  // raw HTML from DB
    const [fetchLoading, setFetchLoading] = useState(true);

    const editor = useEditor({
        extensions: [StarterKit],
        content: "",
        immediatelyRender: false,
    });

    // ── Single fetch: load all data into state ──
    useEffect(() => {
        if (!id) return;
        const load = async () => {
            setFetchLoading(true);
            const sub = await fetchSubServiceById(id);
            if (sub) {
                setFormData({ title: sub.title, slug: sub.slug });
                setImgPreview(sub.img);
                setDescription(sub.description);   // store HTML for editor
                const parent = (sub as any).parentServiceId;
                if (parent && typeof parent === "object") {
                    setParentTitle(parent.title);
                }
            }
            setFetchLoading(false);
        };
        load();
    }, [id]); // run only once on mount

    // ── Set editor content once BOTH editor is ready AND description is loaded ──
    useEffect(() => {
        if (editor && description) {
            editor.commands.setContent(description);
        }
    }, [editor, description]);

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
        try {
            const data = new FormData();
            data.append("title", formData.title);
            data.append("description", editor?.getHTML() || "");
            if (imgFile) data.append("img", imgFile);

            await updateSubService(id, data);
            alert("Sub-service updated successfully!");
            router.push("/admin/services");
        } catch (error) {
            console.error(error);
            alert("Update failed. Please try again.");
        }
    };

    if (fetchLoading) {
        return (
            <div className="min-h-screen bg-[#F9FBFC] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3 text-gray-400">
                    <Loader2 size={32} className="animate-spin text-[#1D8F2C]" />
                    <p className="text-sm font-medium">Loading sub-service...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F9FBFC] font-sans pb-20">

            {/* ─── NAV ─── */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/services" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <ArrowLeft size={20} className="text-gray-600" />
                        </Link>
                        <div>
                            <h1 className="text-lg font-bold text-[#1b1e2e]">Edit Sub-Service</h1>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                                {parentTitle ? (
                                    <>Under: <span className="text-[#1D8F2C]">{parentTitle}</span></>
                                ) : (
                                    <>ID: {id.slice(-6)}</>
                                )}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-6 py-2 bg-[#1D8F2C] text-white text-sm font-bold rounded flex items-center gap-2 hover:bg-green-700 transition-all disabled:opacity-50 shadow-sm shadow-green-200"
                    >
                        <Save size={16} />
                        {loading ? "Saving..." : "Update Sub-Service"}
                    </button>
                </div>
            </nav>

            {/* ─── CONTEXT BADGE ─── */}
            {parentTitle && (
                <div className="max-w-7xl mx-auto px-6 pt-6">
                    <div className="flex items-center gap-2 text-xs text-gray-500 bg-[#1D8F2C]/5 border border-[#1D8F2C]/10 px-4 py-2.5 rounded-lg w-fit">
                        <Layers size={13} className="text-[#1D8F2C]" />
                        <span>Editing sub-service under</span>
                        <span className="font-bold text-[#1D8F2C]">{parentTitle}</span>
                    </div>
                </div>
            )}

            <main className="max-w-7xl mx-auto px-6 py-8">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* ─── MAIN CONTENT ─── */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* Title */}
                        <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full text-2xl md:text-3xl font-black text-[#1b1e2e] placeholder:text-gray-200 outline-none mb-4"
                                placeholder="Sub-service title..."
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
                                Description
                            </label>
                            <div className="border border-gray-200 rounded overflow-hidden">
                                <MenuBar editor={editor} />
                                <div className="p-4 min-h-[300px] tiptap-editor">
                                    <EditorContent editor={editor} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ─── SIDEBAR ─── */}
                    <div className="lg:col-span-4 space-y-6">

                        {/* Image Upload */}
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                                Sub-Service Image
                            </h3>
                            <div className="relative aspect-[16/10] w-full rounded-lg border-2 border-dashed border-gray-200 overflow-hidden bg-gray-50 group">
                                {imgPreview ? (
                                    <>
                                        <Image src={imgPreview} alt="Preview" fill className="object-cover" />
                                        {/* Hover overlay to re-upload */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                                            <label className="p-2.5 bg-white text-gray-800 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-lg" title="Replace image">
                                                <RotateCcw size={18} />
                                                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                            </label>
                                        </div>
                                    </>
                                ) : (
                                    <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100/50 transition-all">
                                        <Upload size={24} className="text-gray-300 mb-2" />
                                        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">Click to Upload</span>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                    </label>
                                )}
                            </div>
                            {imgFile && (
                                <p className="mt-2 text-[10px] text-[#1D8F2C] font-semibold">
                                    ✓ New image selected — will be uploaded on save
                                </p>
                            )}
                        </div>

                        {/* Info card */}
                        <div className="p-5 bg-blue-50 rounded-xl border border-blue-100/50 flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                <Layers size={18} className="text-blue-600" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-blue-900 mb-1 leading-none">Editing Mode</h4>
                                <p className="text-[11px] text-blue-700 leading-relaxed">
                                    Only fields you change will be updated. Leave the image as-is to keep the current one.
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
