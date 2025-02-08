"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface JsonUploadProps {
  onUpload: (file: File) => void;
  isUploading?: boolean;
  children?: React.ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export function JsonUpload({ onUpload, isUploading, children, variant = "ghost" }: JsonUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file);
      event.target.value = '';
    }
  };

  return (
    <>
      <input
        type="file"
        ref={inputRef}
        onChange={handleChange}
        accept="application/json"
        className="hidden"
      />
      <Button
        onClick={handleClick}
        disabled={isUploading}
        variant={variant}
        size={children ? "default" : "icon"}
        className={cn(
          "relative",
          variant === "link" && "hover:bg-gray-100"
        )}
      >
        {isUploading ? (
          <Loader2 className={cn(
            "h-4 w-4 animate-spin",
            children && "mr-2"
          )} />
        ) : children || <Upload className="h-4 w-4" />}
    
      </Button>
    </>
  );
}