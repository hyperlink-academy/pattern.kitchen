import fs from "fs/promises";
import Link from "next/link";
import { useState } from "react";

export default function Home(props) {
  let [filter, setFilter] = useState(null);

  return (
    <>
      <div className="text-center flex flex-col gap-2">
        <h1>Pattern Kitchen</h1>
        <p>Welcome! This is a place for pattern languages…</p>
      </div>
      <PatternLanguageFilter
        patterns={props.patterns}
        filter={filter}
        setFilter={setFilter}
      />
      <PatternLanguageList patterns={props.patterns} filter={filter} />
    </>
  );
}

const PatternLanguageList = (props) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {props.patterns.map((p, index) =>
      props.filter == null || p.meta?.tags.includes(props.filter) ? (
        <Link
          href={`/p/${p.path.slice(0, -4)}`}
          key={p.path}
          className="bg-white text-black hover:bg-black hover:text-white p-1 border border-black rounded-md transition-all duration-300 min-h-[256px] hover:no-underline"
        >
          <div className="border p-1 border-black rounded-md h-full hover:border-white transition-[border-color] duration-500">
            <div className="border p-1 border-black rounded-md h-full hover:border-white transition-[border-color] duration-500">
              <div className="border p-1 border-black rounded-md h-full hover:border-white transition-[border-color] duration-500">
                <div className="border p-1 border-black rounded-md h-full hover:border-white transition-[border-color] duration-500">
                  <div className="border p-1 border-black rounded-md h-full hover:border-white transition-[border-color] duration-500">
                    <div className="border p-1 border-black rounded-md h-full hover:border-white transition-[border-color] duration-500">
                      <div className="border p-1 border-black rounded-md h-full hover:border-white transition-[border-color] duration-500">
                        <div className="border p-1 border-black rounded-md h-full hover:border-white transition-[border-color] duration-500">
                          <div className="border p-1 border-black rounded-md h-full hover:border-white transition-[border-color] duration-500">
                            <div className="border p-1 border-black rounded-md h-full hover:border-white transition-[border-color] duration-500">
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
      ) : null
    )}
  </div>
);

function PatternLanguageFilter(props) {
  let tags = [];
  props.patterns.forEach((p) => {
    p.meta?.tags.forEach((t) => {
      if (!tags.includes(t)) tags.push(t);
    });
  });

  let filter = props.filter;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((t, index) => (
        <button
          className=""
          key={t}
          onClick={() => {
            filter !== t ? props.setFilter(t) : props.setFilter(null);
          }}
        >
          <span
            className={`hover:bg-black hover:text-white p-1 text-sm border rounded-md w-fit ${
              filter == t ? "bg-blue-700 text-white" : ""
            }`}
            key={t}
          >
            {t}
          </span>
        </button>
      ))}
    </div>
  );
}

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
