import { FileInput, Label } from "flowbite-react";
import React, { ChangeEvent, useState } from "react";

interface FileUploadProps {
  onFileUpload: (dataURI: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleUpload = (file: File | undefined) => {
    console.log("🚀 ~ file: UploadFile.tsx:12 ~ handleUpload ~ file:", file);
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataURI = reader.result as string;
      // Save the file to local storage (you can use other storage options as well)

      // Pass the file and data URI to the parent component for further processing
      onFileUpload(dataURI);
      console.log(
        "🚀 ~ file: UploadFile.tsx:21 ~ handleUpload ~ dataURI:",
        dataURI
      );
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    setSelectedFile(() => file || null);

    handleUpload(file);
  };

  return (
    <div className="flex p-2 items-center gap-4 ring-1">
      <Label htmlFor="upload">
        {selectedFile?.name || "Click to choose a upload a pdf file"}
      </Label>
      <FileInput
        required
        id="upload"
        name="file"
        className="outline-none hidden"
        accept=".pdf"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUpload;
