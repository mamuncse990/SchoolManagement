import { ChangeEvent, useState } from 'react';
import Image from 'next/image';

interface FileUploadProps {
  onUploadComplete: (path: string) => void;
  previewUrl?: string;
}

export default function FileUpload({ onUploadComplete, previewUrl }: FileUploadProps) {
  const [preview, setPreview] = useState<string>(previewUrl || '');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // Create form data
      const formData = new FormData();
      formData.append('file', file);

      // Upload file
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        onUploadComplete(data.path);
      } else {
        throw new Error(data.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
        {preview ? (
          <Image
            src={preview}
            alt="Preview"
            width={128}
            height={128}
            className="object-cover"
          />
        ) : (
          <span className="text-gray-400">No image</span>
        )}
      </div>
      <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
        />
        {uploading ? 'Uploading...' : 'Upload Image'}
      </label>
    </div>
  );
}
