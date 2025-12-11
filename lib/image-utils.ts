import { unlink } from "fs/promises";
import { join } from "path";

/**
 * Delete an image file from the filesystem
 * @param imagePath - The URL path of the image (e.g., "/uploads/blogs/filename.jpg")
 * @returns Promise<boolean> - true if deleted, false if file doesn't exist or error
 */
export async function deleteImageFile(imagePath: string | null | undefined): Promise<boolean> {
    if (!imagePath) return false;

    try {
        // Remove leading slash and construct full path
        const relativePath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;
        const filepath = join(process.cwd(), "public", relativePath);

        // Check if file exists and delete
        await unlink(filepath);
        return true;
    } catch (error) {
        // File doesn't exist or already deleted - that's okay
        if ((error as NodeJS.ErrnoException).code === "ENOENT") {
            return false;
        }
        console.error(`Error deleting image file ${imagePath}:`, error);
        return false;
    }
}

/**
 * Delete multiple image files
 * @param imagePaths - Array of image URL paths
 */
export async function deleteImageFiles(imagePaths: (string | null | undefined)[]): Promise<void> {
    await Promise.all(imagePaths.map((path) => deleteImageFile(path)));
}

