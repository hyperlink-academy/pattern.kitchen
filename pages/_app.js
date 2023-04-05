import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

const Layout = (props) => {
  return (
    <div style={{ maxWidth: "48rem", margin: "auto", padding: "1rem" }}>
      {props.children}
    </div>
  );
};
