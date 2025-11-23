import { Layers2, Pencil } from "lucide-react";
import React from "react";

function CategoryList({ categories, onEditCategory }) {
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-4 ">
        <h4 className="text-lg font-semibold  ">Category Sources</h4>
        {/* Category list */}
        {categories?.lenght === 0 ? (
          <p className="text-gray-500">No category found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            {categories?.map((category) => (
              <div
                key={category.id}
                className=" group relative  flex  items-center gap-4 p-3 rounded-lg hover:bg-gray-100/60 
                "
              >
                {/* Icon/Emoji display  */}
                <div className="flex items-center justify-center w-12 h-12 text-xl text-gray-800 rounded-full ">
                  <span className="text-2xl">
                    {category.icon ? (
                      <>
                        <span className="text-2xl">
                          <img
                            className="h-5 w-5"
                            src={category.icon}
                            alt={`category_name_${category.name}_icon${category.icon}`}
                          />
                        </span>
                      </>
                    ) : (
                      <>
                        <Layers2 className="text-purple-800" size={24} />
                      </>
                    )}
                  </span>
                </div>

                {/* Category Details  */}
                <div className="flex-1 flex items-center justify-between  ">
                  {/* category name and type */}
                  <div>
                    <p className="text-sm text-gray-700 font-medium">
                      {category.name}
                    </p>
                    <p className="text-sm text-gray-400 mt-1 capitalize">
                      {category.type}
                    </p>
                  </div>
                  {/* action buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      className="text-gray-500 hover:text-blue-600 opecity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      onClick={() => onEditCategory(category)}
                    >
                      <Pencil size={18} />
                    </button>
                    {/* <button
                    className="text-gray-500 hover:text-gray-600"
                    onClick={() => onDeleteCategory(category.id)}
                  >
                    <Layers2 size={18} />
                  </button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryList;
