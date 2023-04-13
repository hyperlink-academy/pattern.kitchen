import Head from "next/head";

import fs from "fs/promises";
import Link from "next/link";

export default function Home(props) {
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

      <main className="flex flex-col gap-4">
        <h1>Pattern Kitchen</h1>
        <p>Welcome! This is a place for pattern languages…</p>
        <PatternLanguageList patterns={props.patterns} />
      </main>
    </>
  );
}

const PatternLanguageList = (props) => (
  <div className="flex gap-4">
    {props.patterns.map((p, index) => (
      <Link
        href={`/p/${p.path.slice(0, -4)}`}
        key={p.path}
        className="bg-green-100 hover:bg-green-300 p-4 w-1/3 border rounded-md transition-all"
      >
        {p.meta?.title || p.path}
      </Link>
    ))}
  </div>
);

export const getStaticProps = async () => {
  let patternFilenames = await fs.readdir("./pages/p");

  const patterns = await Promise.all(
    patternFilenames.map(async (p) => {
      let patternModule = await import(`pages/p/${p}`);
      let patternMeta = patternModule.meta ? patternModule.meta : null;
      return { meta: patternMeta, path: p };
    })
  );

  return {
    props: {
      patterns: patterns,
    },
  };
};
