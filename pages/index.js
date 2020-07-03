import Head from "next/head";
import useSWR from "swr";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Home({ allPostsData }) {
  const { data, error } = useSWR("/api/hello", fetcher);
  return (
    <Layout home>
      <Head>…</Head>
      <section className={utilStyles.headingMd}>
        {data?.name || "...loading"}
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
