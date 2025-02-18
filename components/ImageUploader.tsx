"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { removeBackground } from "@/app/actions/removeBackground";

export default function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      // Create a preview URL for the selected image
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);

    try {
      // First, upload the file to get a temporary URL
      const formData = new FormData();
      formData.append("file", selectedFile);

      // Upload to a temporary storage service (you'll need to implement this)
      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload image");
      }

      const { url } = await uploadResponse.json();

      // Now remove the background using the server action
      const processedImageUrl = await removeBackground(url);

      // Update the processed image container
      const processedImageContainer = document.getElementById(
        "processedImageContainer"
      );
      if (processedImageContainer) {
        processedImageContainer.innerHTML = `<img src="${processedImageUrl}" alt="Processed Image" class="max-w-full max-h-full object-contain" />`;
      }
    } catch (error) {
      console.error("Error processing image:", error);
      alert("Failed to process image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Upload Image</h2>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 h-64 flex items-center justify-center">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <p className="text-gray-500">Select an image to upload</p>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100"
      />
      <Button
        onClick={handleUpload}
        disabled={!selectedFile || isUploading}
        className="w-full"
      >
        {isUploading ? "Processing..." : "Remove Background"}
      </Button>
    </div>
  );
}
