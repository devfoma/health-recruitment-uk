"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  FileText,
  X,
  CheckCircle,
  Loader2,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

const documentTypes = [
  { id: "passport", name: "Passport Copy", category: "Personal" },
  { id: "photo", name: "Passport Photo", category: "Personal" },
  { id: "birth-cert", name: "Birth Certificate", category: "Personal" },
  { id: "diploma", name: "Medical Diploma", category: "Education" },
  { id: "transcript", name: "Academic Transcript", category: "Education" },
  { id: "license", name: "Medical License", category: "Education" },
  { id: "income", name: "Proof of Income", category: "Financial" },
  { id: "bank", name: "Bank Statements", category: "Financial" },
  { id: "vaccination", name: "Vaccination Record", category: "Health" },
  { id: "dbs", name: "DBS Check", category: "Health" },
];

export default function DocumentUploadPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !selectedType) return;

    setIsUploading(true);

    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsUploading(false);
    setUploadSuccess(true);

    // Redirect after success
    setTimeout(() => {
      router.push("/dashboard/documents");
    }, 1500);
  };

  if (uploadSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <CheckCircle className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Upload Successful!
        </h1>
        <p className="text-muted-foreground text-center">
          Your document has been submitted for review.
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-foreground mb-2">
        Upload Document
      </h1>
      <p className="text-muted-foreground text-sm mb-6">
        Select the document type and upload a clear, legible copy.
      </p>

      {/* Document Type Selection */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-foreground mb-3">
          Document Type
        </label>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full p-4 bg-white border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground"
        >
          <option value="">Select document type</option>
          {documentTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name} ({type.category})
            </option>
          ))}
        </select>
      </div>

      {/* File Upload Area */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-foreground mb-3">
          Upload File
        </label>
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={cn(
            "relative border-2 border-dashed rounded-xl p-8 text-center transition-colors",
            dragActive
              ? "border-primary bg-primary/5"
              : "border-border bg-muted/50",
            file && "border-primary bg-primary/5"
          )}
        >
          {file ? (
            <div className="flex items-center justify-center gap-3">
              <FileText className="h-8 w-8 text-primary" />
              <div className="text-left">
                <p className="font-semibold text-foreground truncate max-w-[200px]">
                  {file.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                onClick={() => setFile(null)}
                className="p-1 hover:bg-muted rounded-full"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
          ) : (
            <>
              <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-foreground font-semibold mb-1">
                Drag and drop your file here
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                or click to browse
              </p>
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Accepted formats: PDF, JPG, PNG. Max file size: 10MB
        </p>
      </div>

      {/* Security Notice */}
      <div className="bg-primary/5 rounded-xl p-4 mb-6 flex items-start gap-3">
        <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-foreground">
            Your documents are secure
          </p>
          <p className="text-xs text-muted-foreground">
            All uploads are encrypted with 256-bit SSL and stored securely in
            compliance with GDPR.
          </p>
        </div>
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={!file || !selectedType || isUploading}
        className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
      >
        {isUploading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="h-5 w-5" />
            Upload Document
          </>
        )}
      </button>
    </div>
  );
}
