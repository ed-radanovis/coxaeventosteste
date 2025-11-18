"use client";

import { useState } from "react";
import { useUploadThing } from "@/utils/uploadthing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, X, Video as VideoIcon, Link as LinkIcon } from "lucide-react";

interface VideoUploadProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function VideoUpload({ value, onChange, disabled }: VideoUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { startUpload } = useUploadThing("videoUploader");

  const handleFileUpload = async (files: FileList | null) => {
    if (!files?.[0]) return;

    setIsUploading(true);
    try {
      const result = await startUpload(Array.from(files));
      const url = result?.[0]?.url;

      if (url) onChange(url);
    } catch (err) {
      console.error("Erro no upload de vídeo:", err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-stone-700 dark:text-stone-300">
        <VideoIcon className="mr-2 inline h-4 w-4 text-blue-700" />
        Vídeo *
      </Label>

      {/* preview */}
      {value && (
        <div className="relative rounded-md border border-stone-200 bg-stone-100 p-4 dark:border-stone-700 dark:bg-stone-800">
          <div className="flex items-center gap-2">
            <VideoIcon className="h-8 w-8 text-blue-700" />
            <div className="flex-1">
              <p className="font-medium">Vídeo carregado</p>
              <p className="truncate text-sm text-stone-500">{value}</p>
            </div>

            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => onChange("")}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* manual input */}
      <div className="flex items-center gap-2">
        <LinkIcon className="h-4 w-4 text-stone-500" />
        <Input
          placeholder="Cole um link do YouTube ou caminho de vídeo..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="border-stone-300 bg-stone-50 dark:border-stone-600 dark:bg-stone-700"
        />
      </div>

      {/* upload */}
      <Input
        type="file"
        accept="video/*"
        onChange={(e) => handleFileUpload(e.target.files)}
        disabled={isUploading || disabled}
        className="border-stone-200 bg-stone-50 dark:border-stone-600 dark:bg-stone-700"
      />

      {isUploading && (
        <div className="flex items-center gap-2 text-sm text-stone-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Enviando vídeo...
        </div>
      )}

      <p className="text-xs text-stone-500 dark:text-stone-400">
        Envie um vídeo até 64MB.
      </p>
    </div>
  );
}
