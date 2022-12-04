import React from "react";

export default function ComicsList({ items }) {
//   console.log("lzisdb ", items.length, items);
  return (
    <>
      <div className="w-full max-w-md p-4 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Here are the comics we found
          </h5>
          <a
            href="#"
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            View all
          </a>
        </div>
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {items.length > 0 && items.map((currentItem) => {
              return (
                <>
                  <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="w-8 h-8 rounded-full"
                          src={`${currentItem.thumbnail.path}.${currentItem.thumbnail.extension}`}
                          alt="Neil image"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {currentItem.title.substring(0,32)}...
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {currentItem.prices[0].price || '$ Not Available'}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        Issue {currentItem.issueNumber || '# Not Available'}
                      </div>
                    </div>
                  </li>
                </>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
