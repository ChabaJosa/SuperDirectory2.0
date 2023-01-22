import React from "react";
const encryption = require("md5");
import ComicsList from "../../components/comicList";

export default function HeroComics({ res }) {
  console.log("Comics from Hero Data", res);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-l to-red-600 from-stone-800">Comics</span></h1>

      <div class="w-full p-2">
        <ComicsList items={res} />
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const heroId = 1009262; // Default to Daredevil
  //
  const MarvelComicsApiCall = `https://gateway.marvel.com:443/v1/public/characters/${
    params.hero > 0 ? params.hero : heroId
  }/comics?&ts=${1}&apikey=${
    process.env.NEXT_PUBLIC_MARVEL_PUBLIC
  }&hash=${encryption(
    1 +
      process.env.NEXT_PUBLIC_MARVEL_PRIVATE +
      process.env.NEXT_PUBLIC_MARVEL_PUBLIC
  )}`;
  //
  const req = await fetch(MarvelComicsApiCall);
  const data = await req.json();
  console.log(data)
  return {
    props: { res: data.data.results },
  };
}
