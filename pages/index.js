import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
// import HeroCard from "../components/heroCard";
import HeroList from "../components/heroList";
import { useState, useRef } from "react";
const encryption = require("md5");

export default function Home() {
  // Local State
  //
  const [heroes, setHeroes] = useState([]);
  const [comics, setComics] = useState([]);
  const input = useRef("");
  // Api Calls
  //
  async function getHeroData() {
    const heroName = "Punisher";
    //
    const MarvelCharacterApiCall = `https://gateway.marvel.com:443/v1/public/characters?name=${
      input.current.length > 0 ? input.current : heroName
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
        res.data
      );
      await setHeroes(res.data.results);
    } catch (err) {
      console.log("Error: ", err);
      await setHeroes(null);
    }
  }
  // 
  async function getComicsData() {
    const heroId = 1009262;
    // Daredevil Id accesible
    // with res.data.results[0].id
    //
    const MarvelComicsApiCall = `https://gateway.marvel.com:443/v1/public/characters/${
      id > 0 ? id : heroId
    }/comics?&ts=${1}&apikey=${
      process.env.NEXT_PUBLIC_MARVEL_PUBLIC
    }&hash=${encryption(
      1 +
        process.env.NEXT_PUBLIC_MARVEL_PRIVATE +
        process.env.NEXT_PUBLIC_MARVEL_PUBLIC
    )}`;
    //
    try {
      const req = await fetch(MarvelComicsApiCall);
      const res = await req.json();
      console.log(
        MarvelComicsApiCall,
        "Marvel Comics Resulst ---> ",
        res.data.results
      );
      await setComics(res.data.results);
    } catch (err) {
      console.log("Error: ", err);
    }
  }
  //
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Super Directory!</h1>

        <p className={styles.description}>
          Get started by searching
          <code className={styles.code}>Heroes</code>!
        </p>

        <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form class="space-y-6" action="#">
            <div>
              <label
                for="input"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Start Typing !
              </label>
              <input
                name="input"
                id="search"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Spider-man, Daredevil, Punisher..."
                required
                onChange={(e) => {
                  input.current = e.target.value;
                }}
              />
            </div>
            <button
              onClick={getHeroData}
              // type="submit"
              class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
            <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
              Not sure what to look for?{" "}
              <a
                href="#"
                class="text-blue-700 hover:underline dark:text-blue-500"
              >
                Randomize
              </a>
            </div>
          </form>
        </div>

        <div className={styles.grid}>
          {/* <div className={styles.card} onClick={getComicsData}>
            <h2>Get Comics Data &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </div>

          <div className={styles.card}>
            <h2>Get Hero Data &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </div> */}
          {/* {hero !== null ? (
            <HeroCard
              name={hero.name}
              details={hero.description}
              url={hero.resourceUri}
              img={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
            />
          ) : null} */}

          {heroes.length !== undefined && heroes.length > 0 ? (
            <div class='m-2 p-2'>

            <HeroList items={heroes} />
            </div>
          ) : (
            <div class="m-4">Could not find anything yet. </div>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <div
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </div>
      </footer>
    </div>
  );
}
