import Head from "next/head";
import Link from "next/link";
import React from "react";

// Head element for PL page
function PLHead(props: { title: string; description: string }) {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

function PLNav(props: { patterns: Array<any>; currentTitle: string }) {
  let currentTitle = props.currentTitle;
  let length = props.patterns.length;
  let titles = props.patterns.map((p, index) => p.meta.title);
  let currentIndex = titles.indexOf(currentTitle);
  let prevPattern =
    currentIndex > 0 && currentIndex <= length
      ? props.patterns[currentIndex - 1]
      : null;
  let nextPattern =
    currentIndex >= 0 && currentIndex < length
      ? props.patterns[currentIndex + 1]
      : null;
  const [rand, setRand] = React.useState(null);
  React.useEffect(() => {
    setRand(Math.floor(Math.random() * (length + 1)));
  }, [length]);
  let randomPattern = props.patterns[Math.floor(Math.random() * (length + 1))];

  return (
    <div className="flex justify-between">
      {prevPattern ? (
        <div>
          {/* <span>prev: </span> */}
          <Link
            href={`/p/${prevPattern.path.slice(0, -4)}`}
            key={prevPattern.path}
            className="bg-white hover:bg-black hover:text-white p-1 border border-black rounded-md transition-all min-h-[256px]"
          >
            ← prev
          </Link>
        </div>
      ) : (
        <div>
          <a className="bg-white p-1 border border-gray-400 text-gray-400 rounded-md">
            ← prev
          </a>
        </div>
      )}
      <div>
        <Link
          href={`/p/${randomPattern.path.slice(0, -4)}`}
          key={randomPattern.path}
          className="bg-white hover:bg-black hover:text-white p-1 border border-black rounded-md transition-all min-h-[256px]"
        >
          random 🎲
        </Link>
      </div>
      {nextPattern ? (
        <div>
          {/* <span>next: </span> */}
          <Link
            href={`/p/${nextPattern.path.slice(0, -4)}`}
            key={nextPattern.path}
            className="bg-white hover:bg-black hover:text-white p-1 border border-black rounded-md transition-all min-h-[256px]"
          >
            next →
          </Link>
        </div>
      ) : (
        <div>
          <a className="bg-white p-1 border border-gray-400 text-gray-400 rounded-md">
            next →
          </a>
        </div>
      )}
    </div>
  );
}

// Intro section with meta info for PL page
function PLMeta(props: {
  title: string;
  description: string;
  author: string;
  tags: [];
}) {
  return (
    <div className="flex flex-col gap-2">
      {/* <div className="flex flex-col gap-2 p-4 border border-black rounded-md"> */}
      <h1>{props.title}</h1>
      {/* <p>{props.description}</p> */}
      <p>{props.author}</p>
      {props?.tags ? (
        <div className="flex gap-2">
          {props?.tags.map((tag, index) => (
            <span className="p-1 text-sm border rounded-md w-fit" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

// Links to learn more for PL page
function PLLinks(props) {
  return (
    // <div className="p-4 rounded-md border border-black flex flex-col gap-4">
    <div className="p-4 rounded-md bg-yellow-400 flex flex-col gap-4">
      <h2 className="text-center">Learn More</h2>
      {props.children}
    </div>
  );
}

// Link button for <PLLinks> section
function PLLink(props: { title: string; url: string }) {
  return (
    <button className="p-4 rounded-md bg-white text-black hover:bg-black hover:text-white transition-all shadow-md">
      <a className="" href={props.url}>
        {props.title}
      </a>
    </button>
  );
}

export function useMDXComponents(components: { [k: string]: React.Component }) {
  return {
    PLHead,
    PLNav,
    PLMeta,
    PLLinks,
    PLLink,
    ...components,
  };
}
