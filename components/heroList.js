import React from "react";
import { useRouter } from "next/router";

export default function HeroList({ items }) {
  console.log(items, "ksdjnglksdfgn");
  const router = useRouter();
  //
  return (
    <>
      <div class="w-full p-4 bg-white rounded-lg hover:shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Click the card to view comics
          </h5>
          <a
            href="#"
            class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            Character Details
          </a>
        </div>
        <div class="flow-root">
          <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
            {items.length > 0 &&
              items.map((currentItem) => {
                return (
                  <>
                    <li class="py-3 sm:py-4 cursor-pointer"  onClick={() => {
                      router.push(`/heroes/${currentItem.id}`);
                    }}>
                      <div class="flex items-center space-x-4">
                        <div class="flex-shrink-0">
                          <img
                            class="w-8 h-8 rounded-full"
                            src={`${currentItem.thumbnail.path}.${currentItem.thumbnail.extension}`}
                            alt="Neil image"
                          />
                        </div>
                        <div class="flex-1 min-w-0">
                          <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {currentItem.name.substring(0, 32)}
                          </p>
                          <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            {currentItem.comics.available} Comics Available
                          </p>
                        </div>
                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          {currentItem.events.available} Crossover Events
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
