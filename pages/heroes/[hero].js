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
      <div>Hello from HeroList</div>
      <div>
        <ComicsList items={res} />
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const heroId = 1009262; // Default to Daredevil
  //
  const MarvelComicsApiCall = `https://gateway.marvel.com:443/v1/public/characters/${
    params.id > 0 ? params.id : heroId
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
  return {
    props: { res: data.data.results },
  };
}
