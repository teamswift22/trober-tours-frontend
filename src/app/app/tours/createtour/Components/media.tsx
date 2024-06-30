"use client";
import React, {
  SetStateAction,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import ImageScrollContainer from "@/components/ImageScrollComponent";
import { useDropzone, Accept } from "react-dropzone";
import { useUploadImagesMutation } from "@/lib/features/tours/toursApiSlice";

const Media = ({
  formId,
  tourDetails,
  getActiveTab,
}: {
  formId: string | null;
  tourDetails: any;
  getActiveTab: (tab: any) => void;
}) => {
  const [activeImage, setActiveImage] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploadError, setUploadError] = useState<string>("");
  const [uploadSuccess, setUploadSuccess] = useState<string>("");
  const [folderName, setFolderName] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [isUploadVisible, setIsUploadVisible] = useState<boolean>(false);

  const [uploadImages] = useUploadImagesMutation();

  useEffect(() => {
    if (tourDetails?.media) {
      setImages(tourDetails.media);
      setActiveImage(tourDetails.media[0]);
    }
  }, [tourDetails]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const maxSize = 50 * 1024 * 1024; // 50MB
    const filteredFiles = acceptedFiles.filter((file) => file.size <= maxSize);

    if (filteredFiles.length !== acceptedFiles.length) {
      setUploadError("Some files are too large and were not added.");
    }

    setFiles(filteredFiles);

    const filePreviews = filteredFiles.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise<string>((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
      });
    });

    Promise.all(filePreviews).then((filePreviews) => {
      setPreviews(filePreviews);
    });
  }, []);

  const accept: Accept = {
    "image/*": [".jpeg", ".jpg", ".png"],
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    multiple: true,
  });

  const handleSubmitFile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (files.length === 0) return;

    try {
      const { urls } = await uploadImages({
        id: formId,
        files,
        folderName,
      }).unwrap();
      console.log(urls);
      setImages([...images, ...urls]);
      setActiveImage(urls[0]);
      setIsUploadVisible(false);
      setUploadSuccess("Images uploaded successfully");
      setUploadError("");
    } catch (error) {
      setUploadError("Error uploading images");
      setUploadSuccess("");
    }
  };

  const setActiveImageFxn = (tour: any) => {
    setActiveImage(tour);
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {images.length > 0 && (
        <button
          onClick={() => {
            setPreviews([]);
            setIsUploadVisible(!isUploadVisible);
          }}
          className=" bg-button-blue-bg text-white py-2 px-4 rounded"
        >
          {isUploadVisible ? "Show Images" : "Upload More"}
        </button>
      )}
      {images.length === 0 || isUploadVisible ? (
        <div className="container mx-auto px-4">
          <form onSubmit={handleSubmitFile}>
            <div
              {...getRootProps()}
              className="border-2 h-[300px] border-dashed border-gray-400 p-6 flex flex-col items-center justify-center cursor-pointer"
            >
              <input {...getInputProps()} />
              <p>Drag and drop some files here, or click to select files</p>
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {previews.map((src, index) => (
                <div key={index} className="border p-2">
                  <img
                    src={src}
                    alt={`preview ${index}`}
                    className="h-32 w-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="flex w-full justify-end">
              <button
                type="submit"
                className="mt-4 bg-button-blue-bg text-white py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </form>
          {uploadSuccess && <p className="text-green-500">{uploadSuccess}</p>}
          {uploadError && <p className="text-red-500">{uploadError}</p>}
        </div>
      ) : (
        <div>
          <img
            src={activeImage}
            className="w-full h-80 md:h-112 object-cover rounded-lg mb-4"
          />
          <ImageScrollContainer
            ImageMap={() =>
              images?.map((tour, index) => (
                <img
                  key={index}
                  src={tour}
                  onClick={() => setActiveImageFxn(tour)}
                  className="object-cover rounded-lg h-20 w-20 md:h-24 md:min-w-24 hover:cursor-pointer"
                />
              ))
            }
          />
        </div>
      )}

      <button
        form="accomodationForm"
        type="submit"
        onClick={() => {
          getActiveTab("Participants");
        }}
        className="bg-[#FA7454] hover:bg-orange-600 text-white font-thin py-3 rounded-lg w-full sm:w-1/3"
      >
        Next
      </button>
    </div>
  );
};

export default Media;
