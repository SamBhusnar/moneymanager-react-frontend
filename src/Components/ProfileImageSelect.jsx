import { Trash, Upload, UserIcon } from "lucide-react";
import React, { useRef, useState } from "react";

function ProfileImageSelect({ image, setImage }) {
  const inputRef = useRef(null);
  const [previewurl, setPreviewUrl] = useState(null);

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const prev = window.URL.createObjectURL(file);
      setPreviewUrl(prev);
    }
  };
  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };
  const onChooseFile = () => {
    inputRef.current?.click();
  };
  return (
    <>
      <div className="flex justify-center mb-6">
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleInputChange}
          className="hidden"
        />
        {!image ? (
          <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative">
            <UserIcon className="text-purple-500" size={35} />

            <button
              onClick={onChooseFile}
              className="w-8 h-8 flex items-center justify-center bg-primary rounded-full absolute -bottom-1 -right-1"
              type="button"
            >
              <Upload size={15} />
            </button>
          </div>
        ) : (
          <div className="relative">
            <img
              src={previewurl}
              alt="profileImage"
              className="w-20 h-20 rounded-full object-cover"
            />
            <button
              onClick={handleRemoveImage}
              className="w-8 h-8 flex items-center justify-center bg-red-800 text-white rounded-full absolute -bottom-1 -right-1"
              type="button"
            >
              <Trash size={15} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileImageSelect;
