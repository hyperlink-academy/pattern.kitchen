import "@/styles/globals.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  let router = useRouter();

  // homepage
  if (router.pathname === "/") {
    return (
      <LayoutHome>
        <Component {...pageProps} />
      </LayoutHome>
    );
  }
  // pattern language page
  if (router.pathname.startsWith("/p/")) {
    return (
      <LayoutPatternLanguage>
        <Component {...pageProps} />
      </LayoutPatternLanguage>
    );
  }
  // default fallback
  // TODO: add more generic fallback, or 404 etc.
  // (OR could e.g. extract layout wrapper)
  return (
    <LayoutHome>
      <Component {...pageProps} />
    </LayoutHome>
  );
}

const LayoutHome = (props) => {
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
      <div className="lg:max-w-7xl m-auto px-8 py-4">{props.children}</div>
    </>
  );
};

const LayoutPatternLanguage = (props) => {
  return (
    <div style={{ maxWidth: "48rem", margin: "auto", padding: "1rem" }}>
      <div className="pb-4">
        <Link href="/">⇠ back</Link>
      </div>
      <div className="flex flex-col gap-4">{props.children}</div>
    </div>
  );
};
