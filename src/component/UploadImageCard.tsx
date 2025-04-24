import { Modal, Button, ModalBody, ModalHeader } from 'flowbite-react';
import { useState } from 'react';
import axiosInstance from '../utils/auth/axiosInstance';

interface UploadImageModalProps {
  open: boolean;
  onClose: () => void;
  onImageAdded: () => void; // 👈 nouvelle prop
}

export default function UploadImageModal({ open, onClose, onImageAdded }: UploadImageModalProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (
      selectedFile &&
      selectedFile.size <= 999 * 1024 &&
      ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(selectedFile.type)
    ) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      alert('Fichier non valide. Formats acceptés : JPG, PNG, GIF, WEBP et taille max 999Ko.');
    }
  };

  const handleCancel = () => {
    setPreview(null);
    setFile(null);
  };

  const handleValidate = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axiosInstance.post('/images/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Réinitialise et ferme
      setPreview(null);
      setFile(null);
      onClose();

      // 🔁 Déclenche le callback pour refetch
      onImageAdded();

    } catch (error) {
      console.error("Erreur lors de l'upload de l'image :", error);
    }
  };

  return (
    <Modal show={open} onClose={onClose} size="lg">
      <ModalHeader>Ajouter une image</ModalHeader>
      <ModalBody>
        <div className="flex flex-col items-center justify-center w-full gap-4">
          {!preview ? (
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Cliquez pour téléverser</span> ou glissez-déposez
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">JPG, PNG, GIF ou WEBP (MAX. 999Ko)</p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={handleFileChange}
              />
            </label>
          ) : (
            <>
              <img src={preview} alt="Aperçu" className="max-h-48 rounded-lg shadow-md" />
              <div className="flex justify-between w-full pt-4">
                <Button color="red" onClick={handleCancel}>
                  Annuler
                </Button>
                <Button color="blue" onClick={handleValidate}>
                  Valider
                </Button>
              </div>
            </>
          )}
        </div>
      </ModalBody>
    </Modal>
  );
}
