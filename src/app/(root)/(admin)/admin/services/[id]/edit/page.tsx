"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Upload, X, RotateCcw, Bold, Italic, Heading2, List, ListOrdered, Quote, Undo, Redo, Layers } from "lucide-react";

// TipTap Imports
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useServiceStore } from "@/stores/serviceStore";

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
                <button key={i} type="button" onClick={btn.action} className={`p-1.5 rounded transition-colors hover:bg-gray-200 ${editor.isActive(btn.active, btn.activeOptions || {}) ? "text-[#1D8F2C] bg-green-50 shadow-inner" : "text-gray-600"}`}>
                    <btn.icon size={16} />
                </button>
            ))}
            <div className="w-px h-6 bg-gray-300 mx-1" />
            <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()} className="p-1.5 rounded hover:bg-gray-200 text-gray-500 disabled:opacity-30"><Undo size={16} /></button>
            <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()} className="p-1.5 rounded hover:bg-gray-200 text-gray-500 disabled:opacity-30"><Redo size={16} /></button>
        </div>
    );
};

export default function EditServicePage() {
    const router = useRouter();
    const { id } = useParams() as { id: string };
    const { fetchServiceById, updateService, loading } = useServiceStore();

    const [img1Preview, setImg1Preview] = useState<string | null>(null);
    const [img2Preview, setImg2Preview] = useState<string | null>(null);
    const [img1File, setImg1File] = useState<File | null>(null);
    const [img2File, setImg2File] = useState<File | null>(null);
    const [formData, setFormData] = useState({ title: "", slug: "", });

    const editor = useEditor({
        extensions: [StarterKit],
        content: "<p>Loading description...</p>",
        immediatelyRender: false,
    });

    useEffect(() => {
        const load = async () => {
            const service = await fetchServiceById(id);
            if (service) {
                setFormData({ title: service.title, slug: service.slug, });
                setImg1Preview(service.img1);
                setImg2Preview(service.img2);
                editor?.commands.setContent(service.description);
            }
        };
        load();
    }, [id, fetchServiceById, editor]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (name === "title") setFormData(prev => ({ ...prev, slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, num: 1 | 2) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (num === 1) setImg1File(file); else setImg2File(file);
            const reader = new FileReader();
            reader.onloadend = () => { if (num === 1) setImg1Preview(reader.result as string); else setImg2Preview(reader.result as string); };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append("title", formData.title);
            data.append("description", editor?.getHTML() || "");
            if (img1File) data.append("img1", img1File);
            if (img2File) data.append("img2", img2File);

            await updateService(id, data);
            alert("Updated Successfully!");
            router.push("/admin/services");
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
                        <Link href="/admin/services" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <ArrowLeft size={20} className="text-gray-600" />
                        </Link>
                        <div>
                            <h1 className="text-lg font-bold text-[#1b1e2e]">Update Service</h1>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Service ID: {id.slice(-6)}
                            </p>
                        </div>
                    </div>
                    <button onClick={handleSubmit} disabled={loading} className="px-6 py-2 bg-[#1D8F2C] text-white text-sm font-bold rounded flex items-center gap-2 hover:bg-green-700 transition-all shadow-sm shadow-green-200">
                        <Save size={16} /> {loading ? "Saving..." : "Update Service"}
                    </button>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-10 lg:py-14">
                <form className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-8 space-y-8">
                        <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
                            <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full text-2xl md:text-3xl font-black text-[#1b1e2e] placeholder:text-gray-200 outline-none mb-4" placeholder="Service Name..." required />
                            <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100 w-fit">
                                <span className="font-mono">URL:</span>
                                <span className="text-[#1D8F2C] font-semibold">/services/{formData.slug}</span>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 block flex items-center gap-2">
                                <Layers size={13} className="text-[#1D8F2C]" />
                                Profile Content
                            </label>
                            <div className="border border-gray-200 rounded overflow-hidden">
                                <MenuBar editor={editor} />
                                <div className="p-4 min-h-[300px] tiptap-editor">
                                    <EditorContent editor={editor} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Primary Image</h3>
                            <div className="relative aspect-[16/10] w-full rounded-lg border-2 border-dashed border-gray-200 overflow-hidden bg-gray-50 group">
                                {img1Preview ? (
                                    <>
                                        <Image src={img1Preview} alt="Preview 1" fill className="object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                                            <label className="p-2.5 bg-white text-gray-800 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-lg">
                                                <RotateCcw size={18} />
                                                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 1)} />
                                            </label>
                                        </div>
                                    </>
                                ) : (
                                    <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100">
                                        <Upload size={24} className="text-gray-300 mb-2" />
                                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 1)} />
                                    </label>
                                )}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Secondary Image</h3>
                            <div className="relative aspect-[16/10] w-full rounded-lg border-2 border-dashed border-gray-200 overflow-hidden bg-gray-50 group">
                                {img2Preview ? (
                                    <>
                                        <Image src={img2Preview} alt="Preview 2" fill className="object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                                            <label className="p-2.5 bg-white text-gray-800 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-lg">
                                                <RotateCcw size={18} />
                                                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 2)} />
                                            </label>
                                        </div>
                                    </>
                                ) : (
                                    <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100">
                                        <Upload size={24} className="text-gray-300 mb-2" />
                                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 2)} />
                                    </label>
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </main>

            <style jsx global>{`
                .tiptap-editor .ProseMirror { min-height: 250px; outline: none; }
                .tiptap-editor h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.75rem; color: #1b1e2e; }
                .tiptap-editor p { margin-bottom: 1rem; color: #4B5563; line-height: 1.6; }
            `}</style>
        </div>
    );
}
