import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

/**
 * Extracts the public_id from a Cloudinary URL.
 * Example URL: https://res.cloudinary.com/demo/image/upload/v12345/CAS/Faculty/image_name.png
 * Public ID: CAS/Faculty/image_name
 */
export const getPublicIdFromUrl = (url: string): string | null => {
    try {
        const parts = url.split("/");
        const filenameWithExtension = parts.pop();
        if (!filenameWithExtension) return null;
        
        const filename = filenameWithExtension.split(".")[0];
        
        // Find the index of 'upload' in the parts array
        const uploadIndex = parts.indexOf("upload");
        if (uploadIndex === -1) return null;
        
        // The parts after 'vXXXXX' (version) or after 'upload' if no version
        // Usually it's upload/v12345/folder/subfolder/public_id
        // We want everything after the version part
        const afterUpload = parts.slice(uploadIndex + 1);
        
        // Check if the first part after upload is a version (starts with 'v' followed by digits)
        if (afterUpload[0] && /^v\d+$/.test(afterUpload[0])) {
            afterUpload.shift();
        }
        
        return [...afterUpload, filename].join("/");
    } catch (error) {
        console.error("Error extracting public_id from URL:", error);
        return null;
    }
};

/**
 * Deletes an image from Cloudinary using its URL.
 */
export const deleteFromCloudinary = async (url: string): Promise<boolean> => {
    if (!url) return false;
    
    const publicId = getPublicIdFromUrl(url);
    if (!publicId) return false;
    
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result.result === "ok";
    } catch (error) {
        console.error("Cloudinary deletion error:", error);
        return false;
    }
};

export default cloudinary;