import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>Pattern Kitchen</title>
        <meta
          name="description"
          content="Peruse a panoply of pattern languages"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Pattern Kitchen</h1>
        <p>welcome!</p>
      </main>
    </>
  );
}
