import { RichText } from "prismic-reactjs";
import { Client } from "../../prismic-configuration";
import Layout from "../../components/Layout";
import Link from "next/link";

export default function Trending({ article }) {
  // store head title
  let headTitle = "";

  return (
    <div>
      {/* get title */}
      {article.data.trending_title.map((t) => {
        headTitle = t.text;
      })}

      <Layout title={headTitle}>
        <div className="w-2/3 mx-auto">
          <h1 className="text-3xl uppercase font-bold opacity-50 my-10">
            {RichText.render(article.data.trending_title)}
          </h1>
          <img
            src={article.data.trending_image.url}
            alt={article.data.trending_image}
            className="shadow mb-10 w-3/4 mx-auto"
          />
          <article className="text-lg opacity-75">
            {RichText.render(article.data["trending_content"])}
          </article>
          <Link href="/">
            <button className="bg-black text-white py-3 px-10 my-4 text-lg uppercase">
              Back to home &nbsp; 👈
            </button>
          </Link>
        </div>
      </Layout>
    </div>
  );
}

// This gets callaed on each request

export async function getServerSideProps(context) {
  const article = await Client().getByUID("trending", context.query.trending);
  console.log(JSON.stringify(article, null, 2));
  return {
    props: {
      article,
    },
  };
}
