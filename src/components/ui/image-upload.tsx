"use client";

import { useState } from "react";
import Image from "next/image";
import { useUploadThing } from "@/utils/uploadthing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, X, Image as ImageIcon, Link as LinkIcon } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { startUpload } = useUploadThing("imageUploader");

  const handleFileUpload = async (files: FileList | null) => {
    if (!files?.[0]) return;

    setIsUploading(true);
    try {
      const result = await startUpload(Array.from(files));
      const url = result?.[0]?.url;

      if (url) onChange(url);
    } catch (err) {
      console.error("Erro no upload de imagem:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const showPreview =
    value && (value.startsWith("http") || value.startsWith("/"));

  return (
    <div className="space-y-2">
      <Label className="text-stone-700 dark:text-stone-300">
        <ImageIcon className="mr-2 inline h-4 w-4 text-amber-500 dark:text-amber-300" />
        Imagem *
      </Label>

      {/* preview */}
      {showPreview && (
        <div className="relative">
          <Image
            src={value}
            alt="Preview"
            width={200}
            height={128}
            className="h-32 w-full rounded-md border border-stone-200 object-cover dark:border-stone-700"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => onChange("")}
            className="absolute top-2 right-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* manual input */}
      <div className="flex items-center gap-2">
        <LinkIcon className="h-4 w-4 text-stone-500" />
        <Input
          placeholder="Digite ou cole uma URL..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="border-stone-300 bg-stone-50 dark:border-stone-600 dark:bg-stone-700"
        />
      </div>

      {/* upload */}
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => handleFileUpload(e.target.files)}
        disabled={isUploading || disabled}
        className="border-stone-200 bg-stone-50 dark:border-stone-600 dark:bg-stone-700"
      />

      {isUploading && (
        <div className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400">
          <Loader2 className="h-4 w-4 animate-spin" />
          Enviando imagem...
        </div>
      )}
    </div>
  );
}
