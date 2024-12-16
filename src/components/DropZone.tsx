import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileSpreadsheet } from 'lucide-react';
import { cn } from '../utils/styles';

interface DropZoneProps {
  onFilesAccepted: (files: File[]) => void;
  multiple?: boolean;
  accept?: Record<string, string[]>;
}

export function DropZone({ onFilesAccepted, multiple = false, accept }: DropZoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFilesAccepted(acceptedFiles);
    }
  }, [onFilesAccepted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-xl p-12",
        "transition-all duration-200 cursor-pointer",
        "bg-gradient-to-b from-navy-50/50 to-navy-100/50",
        "dark:from-navy-800/30 dark:to-navy-900/30",
        isDragActive 
          ? "border-navy-400 bg-navy-50 dark:border-navy-500 dark:bg-navy-800/50" 
          : "border-navy-200 dark:border-navy-700 hover:border-navy-300 dark:hover:border-navy-600"
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center">
        <div className="p-4 bg-navy-100 dark:bg-navy-800 rounded-full mb-4">
          <FileSpreadsheet className="h-8 w-8 text-navy-600 dark:text-navy-300" />
        </div>
        <p className="text-lg font-medium text-navy-700 dark:text-navy-200">
          {isDragActive
            ? "Déposez les fichiers ici..."
            : "Importez vos fichiers Excel"}
        </p>
        <p className="mt-2 text-sm text-navy-500 dark:text-navy-400">
          Glissez-déposez vos fichiers ou cliquez pour sélectionner
        </p>
        <div className="mt-4 flex items-center gap-2 text-xs text-navy-400 dark:text-navy-500">
          <Upload className="h-4 w-4" />
          <span>analyse_prix.xlsx et liens_shopping.xlsx</span>
        </div>
      </div>
    </div>
  );
}