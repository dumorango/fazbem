import { getAllPostIds, getPostData } from "../../lib/posts";

export default function Post({ postData }) {
  return (
    <div />
    // <Layout>
    //   <Head>
    //     <title>{postData.title}</title>
    //   </Head>
    //   <article>
    //     {postData.title}
    //     <br />
    //     {postData.id}
    //     <br />
    //     <Date dateString={postData.date} />
    //     <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    //   </article>
    // </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
