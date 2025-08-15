import Image from "next/image";

const BACKGROUND_IMAGE_URL =
  "https://images.unsplash.com/photo-1754999961467-0d6e4c2551e3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const TailwindCssInvestigation = () => {
  return (
    <div
      className="flex flex-col gap-4 bg-local bg-no-repeat"
      style={{
        backgroundImage: `url(${BACKGROUND_IMAGE_URL})`,
      }}
    >
      {/* <div className="flex items-center justify-center w-full h-56 gap-4 m-10 mx-auto my-auto">
        <button className="w-40 px-4 py-3 text-white transition duration-200 bg-blue-500 rounded-md hover:bg-blue-300">
          Click 1 test double line editing
        </button>
        <button className="w-40 px-4 py-3 text-white transition duration-200 bg-blue-500 rounded-md hover:bg-blue-300">
          Click 2 test double line editing
        </button>
      </div>
      <div className="container">
        <img
          src="https://images.unsplash.com/photo-1735201334208-bfcda74f1bc0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="image"
          className="mx-auto"
        />
      </div>

      <div className="box-border mx-auto columns-3">
        <div className="w-full">Test 1</div>
        <div className="w-full">Test 2</div>
        <div className="w-full">Test 3</div>
      </div>

      <div>
        <span className="inline">Display: inline</span>
        Test inline
        <span className="inline-block">Inline block</span>
        test inline block
        <span className="block">Block</span>
        Block
      </div>
      <div className="grid grid-cols-3 grid-rows-3 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => {
          return (
            <div
              key={value}
              className="py-8 text-center text-white bg-pink-300 rounded-md"
            >
              {value}
            </div>
          );
        })}
      </div>

      <div className="flex flex-row-reverse gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => {
          return (
            <div
              key={value}
              className="flex-1 py-8 text-center text-white bg-pink-300 rounded-md"
            >
              {value}
            </div>
          );
        })}
        <div className="flex-row-reverse">13</div>
      </div>

      <div>
        <img
          src="https://images.unsplash.com/photo-1750218537952-0ae056c7f53a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Image"
          className="float-right w-full h-full"
        />
        <p>Maybe we can live without libraries, people like you and me. ...</p>
      </div>

      <div className="static w-1/2 p-10 border border-cyan-400 ">
        <p>Static parent</p>
        <div className="absolute bottom-0 left-0">
          <p>Absolute child</p>
        </div>
      </div>

      <div className="relative w-1/2 p-10 border border-cyan-400 ">
        <p>Static parent</p>
        <div className="absolute bottom-0 left-0">
          <p>relative child</p>
        </div>
      </div>

      <div className="z-100">Test</div>
      
      <div className="z-[200]">Test</div> */}
      <div className="flex flex-row gap-4">
        <div className="text-center bg-pink-200 rounded-md basis-1/4">01</div>
        <div className="text-center bg-pink-200 rounded-md basis-1/4">02</div>
        <div className="text-center bg-pink-200 rounded-md basis-1/2">03</div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => {
          return (
            <div
              key={value}
              className="py-8 text-center text-white bg-pink-300 rounded-md "
            >
              {value}
            </div>
          );
        })}
      </div>

      <div className="grid grid-flow-col grid-rows-3 gap-4">
        <div className="row-span-3 text-center bg-pink-200 rounded-sm">01</div>
        <div className="col-span-2 text-center bg-pink-200 rounded-sm">02</div>
        <div className="col-span-2 row-span-2 text-2xl font-extrabold text-center bg-pink-200 rounded-sm">
          03
        </div>
      </div>

      <div className="place-content-center">test</div>
      <p className="slashed-zero">00000.0000000</p>
      <p className="text-sky-400/100">
        The quick brown fox jumps over the lazy dog.
      </p>
      <p className="text-sky-400/75">
        The quick brown fox jumps over the lazy dog.
      </p>
      <p className="text-sky-400/50">
        The quick brown fox jumps over the lazy dog.
      </p>
      <p className="text-sky-400/10">
        The quick brown fox jumps over the lazy dog.
      </p>
      <div>
        <p>
          I’m Derek, an astro-engineer based in Tattooine. I like to build
          X-Wings at
          <a className="underline decoration-sky-300">My Company, Inc</a>.
          Outside of work, I like to{" "}
          <a className="underline decoration-pink-500 decoration-dashed decoration-4 underline-offset-4">
            watch pod-racing
          </a>{" "}
          and have{" "}
          <a className="underline decoration-indigo-500 decoration-wavy decoration-4">
            light-saber
          </a>{" "}
          fights.
        </p>
        <div className="w-3/4 overflow-x-auto ">
          <div className="p-4 whitespace-pre-line border-red-300 ">
            Hey everyone! It's almost 2022 and we still don't know if there is
            aliens living among us, or do we? Maybe the person writing this is
            an alien. You will never know.
          </div>
        </div>

        <div className="w-3/4 bg-sky-300">
          <div className="p-4 whitespace-pre-wrap border border-red-300">
            Hey everyone! It's almost 2022 and we still don't know if there is
            aliens living among us, or do we? Maybe the person writing this is
            an alien. You will never know.
          </div>
        </div>
      </div>
      <div className="h-14 bg-gradient-to-t from-cyan-500 to-blue-500"></div>
      <div className="h-14 bg-gradient-to-b from-sky-500 to-indigo-500"></div>
      <div className="h-14 bg-gradient-to-tl from-violet-500 to-fuchsia-500"></div>
      <div className="h-14 bg-gradient-to-r from-purple-500 to-pink-500"></div>
      <div className="flex flex-col border-4 divide-y-4 divide-slate-200">
        <div>01</div>
        <div>02</div>
        <div>03</div>
      </div>
      <button className="py-4 text-2xl text-white rounded-md shadow-lg bg-cyan-500 shadow-cyan-500/50">
        Subscribe
      </button>
      <div className="w-full max-w-sm p-4 mx-auto border border-blue-300 rounded-md shadow">
        <div className="flex space-x-4 animate-pulse">
          <div className="w-10 h-10 rounded-full bg-slate-700"></div>
          <div className="flex-1 py-1 space-y-6">
            <div className="h-2 rounded bg-slate-700"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 col-span-2 rounded bg-slate-700"></div>
                <div className="h-2 col-span-1 bg-red-700 rounded"></div>
              </div>
              <div className="h-2 rounded bg-slate-700"></div>
            </div>
          </div>
        </div>
      </div>
      <textarea className="h-40 p-4 border border-pink-500 caret-pink-500"></textarea>
    </div>
  );
};

export default TailwindCssInvestigation;
