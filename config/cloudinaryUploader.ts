// utils/cloudinaryUploader.ts
export const uploadToCloudinary = async (
  file: File,
  uploadPreset: string
): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset); // Ensure this matches your Cloudinary setup.

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (!cloudName) {
    throw new Error(
      'Cloudinary cloud name is not defined in environment variables.'
    );
  }

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error.message || 'Failed to upload to Cloudinary'
      );
    }

    const data = await response.json();
    return data.secure_url; // Return the uploaded image URL.
  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    throw new Error('Image upload failed');
  }
};
