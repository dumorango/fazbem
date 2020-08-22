import Head from "next/head";
import { useRouter } from "next/router";
import { getContentfulClient } from "./api/contentful";

export async function getStaticProps({ preview }) {
  const entries = await getContentfulClient(preview).getEntries();
  const recipes = entries.items.map(({ sys: { id }, fields }) => ({
    id,
    name: fields.nome,
    imageUrl: fields.fotoPequena.fields.file.url,
  }));
  return {
    props: {
      recipes,
    },
  };
}

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const TITLE = "Faz Bem - Receitas Low Carb";

export default function Home({ recipes }) {
  const router = useRouter();

  const handleClick = (id) => (e) => {
    e.preventDefault();
    router.push(`/receitas/${id}`);
  };

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon/favicon.ico" />
        <title>{TITLE}</title>
        <meta name="description" content="Receitas Low Carb e muito mais...." />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta name="og:title" content={TITLE} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className="flex justify-center">
        <div className="max-w-screen-lg w-screen mx-8">
          <header className="flex flex-row my-8 align-baseline">
            <div className="flex h-16 w-16 z-10 mt-4">
              <img src="/images/logo.png" />
            </div>
            <div className="font-display text-green text-6xl text-center flex-1">
              Faz Bem
            </div>
          </header>
          <main>
            <div className="flex flex-col">
              <div className="flex flex-row justify-center flex-wrap my-16">
                {recipes.map(({ name, imageUrl, id }) => (
                  <div
                    key={id}
                    className="flex flex-col justify-center m-2 shadow cursor-pointer transform motion-reduce:transform-none hover:-translate-y-1 hover:scale-105 transition ease-in-out duration-300"
                    onClick={handleClick(id)}
                  >
                    <div className="flex w-56 h-64 flex-grow ">
                      <img src={imageUrl} />
                    </div>
                    <div className="flex w-56 h-16 text-center justify-center items-center bg-center font-sans">
                      {name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
