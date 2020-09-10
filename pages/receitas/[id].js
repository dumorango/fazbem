import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getContentfulClient } from "../../lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default ({ preview, ...props }) =>
  preview ? <RecipeWithPreview {...props} /> : <Recipe {...props} />;

function RecipeWithPreview(props) {
  const { data = {} } = useSWR(`/api/receitas/${props.id}`, fetcher, {
    refreshInterval: 100,
  });
  return <Recipe {...props} {...data} />;
}

function Recipe(props) {
  const {
    id,
    entry: { fields = {} },
  } = props;

  const TITLE = `Faz Bem - ${fields.nome}`;
  const fotoGrande = fields.fotoGrande?.fields?.file;

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
              <div className="flex flex-col font-sans text-5xl justify-start my-8">
                <div>{fields.nome}</div>
              </div>
              {fotoGrande ? (
                <div className="flex flex-grow my-8">
                  <img title={fotoGrande.title} src={fotoGrande.url} />
                </div>
              ) : null}
              <div className="flex flex-row">
                <div className="flex flex-col w-1/4">
                  <div className="text-4xl font-display my-8 text-center">
                    Ingredientes
                  </div>
                  {fields.ingredientes?.map((ingrediente, i) => (
                    <div key={i} className="text-xl my-4 text-center">
                      {ingrediente}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col flex-1 mx-8">
                  <div className="text-4xl font-display text-center my-8">
                    Modo de Preparo
                  </div>
                  <div className="text-xl">
                    {documentToReactComponents(fields.modoDePreparo)}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const entries = await getContentfulClient().getEntries();
  const paths = entries.items.map(({ sys: { id } }) => `/receitas/${id}`);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params, preview = false }) {
  const entry = await getContentfulClient(preview).getEntry(params.id);
  return {
    props: {
      id: params.id,
      entry,
      preview,
    },
  };
}
