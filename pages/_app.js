import "@/styles/globals.css";
import Link from "next/link";
import { useRouter } from "next/router";

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
    // <div style={{ maxWidth: "48rem", margin: "auto", padding: "1rem" }}>
    <div className="lg:max-w-7xl m-auto px-8 py-4">{props.children}</div>
  );
};

const LayoutPatternLanguage = (props) => {
  return (
    <div style={{ maxWidth: "48rem", margin: "auto", padding: "1rem" }}>
      <div className="pb-4">
        <Link href="/">⇠ back</Link>
      </div>
      {/* <div></div> */}
      {props.children}
    </div>
  );
};
