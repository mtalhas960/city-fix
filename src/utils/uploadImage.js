export async function uploadImage(file) {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', "cityfix_unsigned_reports");
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/dmie3ln0b/image/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return {
                imageUrl: null,
                error: errorData.error?.message || `Upload failed with status: ${response.status}`
            };
        }
        const data = await response.json();
        if (!data.secure_url) {
            return {
                imageUrl: null,
                error: "Upload successful but image URL not received"
            };
        }
        return {
            imageUrl: data.secure_url,
            error: null
        };
    } catch (err) {
        console.error('Error uploading image:', err);
        return {
            imageUrl: null,
            error: err instanceof Error ? err.message : 'Failed to upload image'
        };
    }
}

export async function uploadMultipleImages(files) {
    const imageUrls = [];
    const errors = [];
    for (const file of files) {
        const result = await uploadImage(file);
        if (result.imageUrl) {
            imageUrls.push(result.imageUrl);
        }
        if (result.error) {
            errors.push(result.error);
        }
    }
    return { imageUrls, errors };
}
