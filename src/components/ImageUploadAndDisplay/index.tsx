"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";

import { supabase } from "@/supabaseClient";
import { configs } from "@/utils";

const bucketName = configs.supabase.bucket;
const filePath = configs.supabase.filePath;

const supabaseStorage = supabase.storage.from(bucketName);

export default function ImageUploadAndDisplay() {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchImage();
  }, []);

  const fetchImage = async () => {
    // * Use getPublicUrl to directly get the public URL
    const { data } = supabaseStorage.getPublicUrl(filePath);

    if (data?.publicUrl) {
      setUrl(data.publicUrl);
    } else {
      console.error("Failed to fetch image URL.");
    }

    // * Use download to download the file and create a URL
    // const { data, error } = await supabaseStorage.download(filePath);
    //
    // if (error) {
    //   console.error(error);
    // } else {
    //   const url = URL.createObjectURL(data);
    //   setUrl(url);
    // }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setFile(event.target.files[0]);
  };

  const handleErrorImage = () => {
    setUrl(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    const timestamp = Date.now().toString();

    setLoading(true);

    // * Remove the existing image if it exists
    await supabaseStorage.remove([filePath]);

    const { data, error } = await supabaseStorage.upload(filePath, file, {
      contentType: "image/png" // * Setting the content type to 'image/png'
    });
    if (error) {
      console.error(error);
    } else {
      fetchImage();
    }
    setLoading(false);
  };

  const handleRemove = async () => {
    setLoading(true);

    await supabaseStorage.remove([filePath]);

    setUrl(null);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <input
        type="file"
        className="border border-neutral-300 rounded p-2"
        onChange={handleFileChange}
      />
      <section className="flex gap-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-4 py-2 rounded shadow-xl"
          onClick={handleUpload}
        >
          Upload
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-4 py-2 rounded shadow-xl"
          onClick={handleRemove}
        >
          Remove
        </button>
      </section>
      {loading && <p>Uploading...</p>}
      <div>
        {url ? (
          <Image
            src={`${url}?t=${Date.now().toString()}`}
            alt="Uploaded"
            width={300}
            height={300}
            onError={handleErrorImage}
            priority
          />
        ) : (
          <p>No image uploaded yet</p>
        )}
      </div>
    </div>
  );
}
