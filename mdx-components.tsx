import Head from "next/head";

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
  return { PLHead, PLMeta, PLLinks, PLLink, ...components };
}
