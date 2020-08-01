import { useWindowScroll } from "react-use";
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
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    ></meta>
    <meta name="og:title" content={TITLE} />
    <meta name="twitter:card" content="summary_large_image" />
  </Head>
);

export default function Home({ allPostsData }) {
  const imageRef = React.useRef(null);
  const { x, y } = useWindowScroll();
  console.log("x", x, "y", y);
  const scrollRef = React.useRef(null);
  const fazbem =
    (scrollRef.current && scrollRef.current.getBoundingClientRect()) || {};
  console.log("fazbem ", fazbem.y);
  const shouldBeFixed = fazbem.y && fazbem.y <= 10;
  const isImageOut =
    imageRef.current && imageRef.current.getBoundingClientRect().y < -600;
  return (
    <>
      <HomeHead />
      <header className={styles.header}>
        {/* <div className={styles.banner}>
          <img ref={imageRef} src="/images/panqueca-lowcarb.jpg" />
        </div> */}
        <div className={styles.logo}>
          <img src="/images/logo.png" />
        </div>
        <div ref={scrollRef} className={styles.fazbem}>
          Faz Bem
        </div>
      </header>
      <main className={styles.content}>Main</main>
    </>
  );
}
