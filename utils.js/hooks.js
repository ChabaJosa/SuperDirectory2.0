export default async function getHeroData(input) {
  const backupHero = "Hulk";
  //
  const MarvelCharacterApiCall = `https://gateway.marvel.com:443/v1/public/characters?name=${
    input.length > 0 ? input : backupHero
  }&ts=${1}&apikey=${process.env.NEXT_PUBLIC_MARVEL_PUBLIC}&hash=${encryption(
    1 +
      process.env.NEXT_PUBLIC_MARVEL_PRIVATE +
      process.env.NEXT_PUBLIC_MARVEL_PUBLIC
  )}`;
  //
  try {
    const req = await fetch(MarvelCharacterApiCall);
    const res = await req.json();
    console.log(
      MarvelCharacterApiCall,
      "Marvel Api Character Resulst ---> ",
      res.data,
      process.env.NEXT_PUBLIC_MARVEL_PRIVATE,
      process.env.NEXT_PUBLIC_MARVEL_PUBLIC
    );
    //   await setHeroes(res.data.results);
    return [res.data.results];
  } catch (err) {
    console.log("Error: ", err);
    //   await setHeroes(null);
    return []; // null
  }
}
