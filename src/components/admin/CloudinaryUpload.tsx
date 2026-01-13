'use client';

import { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';

interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
}

interface CloudinaryUploadProps {
  onUploadSuccess: (url: string) => void;
  onUploadError?: (error: string) => void;
  multiple?: boolean;
  maxFiles?: number;
  folder?: string;
  label?: string;
  currentImage?: string;
}

export function CloudinaryUpload({
  onUploadSuccess,
  onUploadError,
  multiple = false,
  maxFiles = 10,
  folder = 'olivehaus',
  label = 'Upload Image',
  currentImage,
}: CloudinaryUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage ?? null);

  const uploadToCloudinary = useCallback(async (file: File) => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      throw new Error('Cloudinary configuration is missing');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', folder);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data: CloudinaryUploadResult = await response.json();
    return data;
  }, [folder]);

  const handleFileSelect = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const filesToUpload = Array.from(files).slice(0, maxFiles);
      const totalFiles = filesToUpload.length;
      let completedFiles = 0;

      for (const file of filesToUpload) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          onUploadError?.(`${file.name} is not an image file`);
          continue;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          onUploadError?.(`${file.name} is too large (max 10MB)`);
          continue;
        }

        const result = await uploadToCloudinary(file);
        onUploadSuccess(result.secure_url);
        
        if (!multiple) {
          setPreviewUrl(result.secure_url);
        }

        completedFiles++;
        setUploadProgress(Math.round((completedFiles / totalFiles) * 100));
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Upload failed';
      onUploadError?.(message);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      // Reset the input
      event.target.value = '';
    }
  }, [maxFiles, multiple, onUploadError, onUploadSuccess, uploadToCloudinary]);

  const handleRemoveImage = useCallback(() => {
    setPreviewUrl(null);
    onUploadSuccess('');
  }, [onUploadSuccess]);

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-neutral-300">
        {label}
      </label>
      
      {previewUrl && !multiple ? (
        <div className="relative inline-block">
          <img
            src={previewUrl}
            alt="Preview"
            className="h-32 w-32 rounded-lg object-cover border border-neutral-700"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-neutral-700 bg-neutral-800/50 p-6 hover:border-neutral-500 hover:bg-neutral-800 transition-colors">
          <input
            type="file"
            accept="image/*"
            multiple={multiple}
            onChange={handleFileSelect}
            disabled={isUploading}
            className="hidden"
          />
          
          {isUploading ? (
            <div className="flex flex-col items-center">
              <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
              <span className="mt-2 text-sm text-neutral-400">
                Uploading... {uploadProgress}%
              </span>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center rounded-full bg-neutral-700 p-3">
                {multiple ? (
                  <Upload className="h-6 w-6 text-neutral-300" />
                ) : (
                  <ImageIcon className="h-6 w-6 text-neutral-300" />
                )}
              </div>
              <span className="mt-2 text-sm text-neutral-400">
                Click to upload {multiple ? 'images' : 'an image'}
              </span>
              <span className="text-xs text-neutral-500">
                PNG, JPG, WebP up to 10MB
              </span>
            </>
          )}
        </label>
      )}
    </div>
  );
}

interface MultiImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
  folder?: string;
  label?: string;
}

export function MultiImageUpload({
  images,
  onImagesChange,
  maxImages = 10,
  folder = 'olivehaus',
  label = 'Gallery Images',
}: MultiImageUploadProps) {
  const [error, setError] = useState<string | null>(null);

  const handleUploadSuccess = useCallback((url: string) => {
    if (url && images.length < maxImages) {
      onImagesChange([...images, url]);
    }
    setError(null);
  }, [images, maxImages, onImagesChange]);

  const handleRemoveImage = useCallback((index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  }, [images, onImagesChange]);

  const handleUploadError = useCallback((errorMessage: string) => {
    setError(errorMessage);
  }, []);

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-neutral-300">
        {label} ({images.length}/{maxImages})
      </label>

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      {/* Current Images Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((url, index) => (
            <div key={`${url}-${index}`} className="relative">
              <img
                src={url}
                alt={`Gallery image ${index + 1}`}
                className="h-24 w-full rounded-lg object-cover border border-neutral-700"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Button */}
      {images.length < maxImages && (
        <CloudinaryUpload
          onUploadSuccess={handleUploadSuccess}
          onUploadError={handleUploadError}
          multiple
          maxFiles={maxImages - images.length}
          folder={folder}
          label="Add More Images"
        />
      )}
    </div>
  );
}