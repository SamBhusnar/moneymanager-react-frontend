import { Image, X } from "lucide-react";
import React from "react";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";

function EmojiPickerPopUp({ icon, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleEmojiClick = (emoji) => {
    onSelect(emoji?.imageUrl||"");
    setIsOpen(false);
  };
  return (
    <div className="flex flex-col items-start   gap-5 mb-6">
      <div
        classname="flex items-center gap-4 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-12 h-12  rounded-lg flex items-center justify-center text-2xl text-purple-500 bg-purple-50 ">
          {icon ? (
            <>
              <img src={icon} alt="Icon" className="w-12 h-12" />
            </>
          ) : (
            <>
              <Image />
            </>
          )}
        </div>
        <p>{icon ? "change Icon" : "Pick Icon"}</p>
      </div>

      {isOpen ? (
        <div className="relative">
          <button
            className="w-7 h-7 rounded-full flex items-center justify-center text-2xl text-purple-500 bg-white border border-gray-200 absolute -top-2 -right-2 z-10 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <X />
          </button>
          <EmojiPicker
            open={isOpen}
            onEmojiClick={(emoji) => handleEmojiClick(emoji)}
          />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default EmojiPickerPopUp;
