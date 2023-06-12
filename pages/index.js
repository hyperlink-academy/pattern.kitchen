import fs from "fs/promises";
import Link from "next/link";

export default function Home(props) {
  return (
    <>
      <h1>Pattern Kitchen</h1>
      <p>Welcome! This is a place for pattern languages…</p>
      <WIPBanner />
      <PatternLanguageList patterns={props.patterns} />
    </>
  );
}

const WIPBanner = () => (
  <div className="p-4 bg-yellow-400 rounded-md m-auto">
    <p>⚠️ this website is a work in progress</p>
    <p>〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️</p>
    <p>🔜 stay tuned for detailed pattern pages!</p>
  </div>
);

const PatternLanguageList = (props) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {/* <div className="grid grid-cols-3 gap-4"> */}
    {props.patterns.map((p, index) => (
      <Link
        href={`/p/${p.path.slice(0, -4)}`}
        key={p.path}
        // className="bg-green-100 hover:bg-green-300 p-4 w-1/3 border rounded-md transition-all"
        className="bg-white hover:bg-black hover:text-white p-1 border border-black rounded-md transition-all min-h-[256px]"
      >
        <div className="border p-1 border-black rounded-md h-full hover:border-white">
          <div className="border p-1 border-black rounded-md h-full hover:border-white">
            <div className="border p-1 border-black rounded-md h-full hover:border-white">
              <div className="border p-1 border-black rounded-md h-full hover:border-white">
                <div className="border p-1 border-black rounded-md h-full hover:border-white">
                  <div className="border p-1 border-black rounded-md h-full hover:border-white">
                    <div className="border p-1 border-black rounded-md h-full hover:border-white">
                      <div className="border p-1 border-black rounded-md h-full hover:border-white">
                        <div className="border p-1 border-black rounded-md h-full hover:border-white">
                          <div className="border p-1 border-black rounded-md h-full hover:border-white">
                            <div className="h-full flex flex-col p-2 justify-between gap-4">
                              <div className="flex flex-col gap-2">
                                <h2 className="text-lg">
                                  {p.meta?.title || p.path}
                                </h2>
                                <p className="text-sm italic">
                                  {p.meta?.description}
                                </p>
                              </div>
                              {p.meta?.tags ? (
                                <div className="flex gap-2">
                                  {p.meta?.tags.map((tag, index) => (
                                    <span
                                      className="p-1 text-sm border rounded-md w-fit"
                                      key={tag}
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
