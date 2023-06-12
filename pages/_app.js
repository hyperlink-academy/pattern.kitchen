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
      {/* PAGE WRAPPER */}
      {/* <div className="lg:max-w-7xl m-auto px-8 py-4"> */}
      <div className="lg:max-w-7xl m-auto">
        <Header />
        {/* CONTENT WRAPPER */}
        <div className="px-8 py-4">{props.children}</div>
        <Footer />
      </div>
    </>
  );
};

const LayoutPatternLanguage = (props) => {
  return (
    // PAGE WRAPPER
    <div className="lg:max-w-7xl m-auto">
      <Header />
      {/* <div className="pb-4">
        <Link href="/">⇠ back</Link>
      </div> */}
      {/* CONTENT WRAPPER */}
      <div className="flex flex-col gap-4 max-w-3xl px-8 py-4 m-auto">
        {props.children}
      </div>
      <Footer />
    </div>
  );
};

const Header = (props) => {
  return (
    <div className="sticky top-0 bg-white px-8 py-4 border-b mb-4">
      <Link href="/">pattern.kitchen</Link>
    </div>
  );
};

const Footer = (props) => {
  return (
    <div className="sticky bottom-0 bg-white px-8 py-4 border-t mt-4">
      <div className="flex justify-between">
        <span>
          a project from{" "}
          <a className="text-blue-700" href="https://hyperlink.academy/">
            hyperlink.academy
          </a>
        </span>

        <span>
          <a
            className="text-blue-700"
            href="https://github.com/hyperlink-academy/pattern.kitchen"
          >
            src / contribute
          </a>
        </span>
      </div>
    </div>
  );
};
