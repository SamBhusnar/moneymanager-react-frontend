import { LoaderCircle } from "lucide-react";
import React from "react";

function DeleteAlert({ content, onDelete, loading }) {
  return (
    <div>
      <p className="text-sm">{content}</p>
      <div className="flex justify-end  mt-6">
        <button
          type="button"
          className="bg-red-600 text-white px-3 py-2 rounded-md"
          onClick={onDelete}
          disabled={loading}
        >
          {loading ? (
            <>
              <span
              
              className="flex gap-2 items-center justify-between"
              >

                <LoaderCircle className="animate-spin" />
                <span className="ml-2">Deleting...</span>
              </span>
            </>
          ) : (
            "Delete"
          )}
        </button>
      </div>
    </div>
  );
}

export default DeleteAlert;
