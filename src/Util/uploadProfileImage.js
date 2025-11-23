import { API_ENDPOINTS } from "./apiEndpoints";

const CLOUDINARY_UPLOAD_PRESET = "moneymanager";
const uploadProfileImage = async (image) => {
  try {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    const response = await fetch(API_ENDPOINTS.upload_image, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      const data = await response.json();

      throw new Error(
        "Failed to upload image : " +
          response?.statusText +
          " " +
          response?.status +
          " " +
          data?.error?.message
      );
    }
    const data = await response.json();
    console.log("Image uploaded successfully ! ");

    return data.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

export { uploadProfileImage };
