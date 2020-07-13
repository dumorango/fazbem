import Head from "next/head";
import styles from "../styles/home.module.css";
import { getSortedPostsData } from "../lib/posts";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const TITLE = "Faz Bem - Receitas Low Carb";

const HomeHead = () => (
  <Head>
    <link rel="icon" href="/favicon/favicon.ico" />
    <title>{TITLE}</title>
    <meta name="description" content="Receitas Low Carb e muito mais...." />
    <meta
      property="og:image"
      content={`https://og-image.now.sh/${encodeURI(
        "Faz Bem"
      )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
    />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    ></meta>
    <meta name="og:title" content={TITLE} />
    <meta name="twitter:card" content="summary_large_image" />
  </Head>
);

export default function Home({ allPostsData }) {
  // const { data, error } = useSWR("/api/hello", fetcher);
  return (
    <div className={styles.container}>
      <HomeHead />
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src="/images/logo.png" />
          <div>Faz Bem</div>
        </div>
        <div>Faz Bem</div>
      </header>
      <main className={styles.content}>Main</main>
    </div>
  );
}
