import { Button, FileInput, Label } from "flowbite-react";
import React, { ChangeEvent, useState } from "react";

interface FileUploadProps {
  onFileUpload: (file: File, dataURI: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataURI = reader.result as string;
        // Save the file to local storage (you can use other storage options as well)

        // Pass the file and data URI to the parent component for further processing
        onFileUpload(selectedFile, dataURI);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className="flex p-2 items-center gap-4 ring-1">
      <Label htmlFor="upload">
        {selectedFile?.name || "Click to choose a upload a pdf file"}
      </Label>
      <FileInput
        id="upload"
        className="outline-none hidden"
        accept=".pdf"
        onChange={handleFileChange}
      />
      <Button
        type="button"
        gradientDuoTone="greenToBlue"
        onClick={handleUpload}
        disabled={!selectedFile}
      >
        Upload
      </Button>
    </div>
  );
};

export default FileUpload;
