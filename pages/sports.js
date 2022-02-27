import Prismic from "prismic-javascript";
import { Client } from "../prismic-configuration";
import { RichText } from "prismic-reactjs";
import Link from "next/link";
import Layout from "../components/Layout";

export default function Sports({ article, trending }) {
  return (
    <div>
      <Layout title="Sports">
        <h1 className="text-2xl uppercase font-bold opacity-50 my-10 ml-24">
          See what's happening around the world of sports
        </h1>
        <div className="flex">
          <div className="flex flex-col w-2/3 ml-24 mr-20">
            {article.results.map((article, index) => (
              <div key={article.uid}>
                <Link href={`article/${article.uid}`}>
                  <h1 className="bold text-3xl text-blue-600 cursor-pointer">
                    {RichText.render(article.data.article_title)}
                  </h1>
                </Link>
                <img
                  className="w-2/3"
                  src={article.data.article_image.url}
                  alt={article.data.article_image.alt}
                />
                <h1>{RichText.render(article.data["preview_text"])}</h1>
              </div>
            ))}
          </div>
          <div className="flex flex-col w-1/3">
            <h1 className="text-xl uppercase font-bold opacity-50 my-10 ml-24">
              See what's trending
            </h1>
            {trending.results.map((article, index) => (
              <div key={article.uid}>
                <Link href={`trending/${article.uid}`}>
                  <h1 className="bold text-xl text-blue-600 cursor-pointer">
                    {RichText.render(article.data.trending_title)}
                  </h1>
                </Link>
                <hr className="mt-5" />
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
}

// this function is called everytimr a request/refresh is made

export async function getServerSideProps() {
  const article = await Client().query(
    Prismic.Predicates.at("document.tags", ["sports"])
  );

  const trending = await Client().query(
    Prismic.Predicates.at("document.type", "trending")
  );

  return {
    props: {
      article,
      trending,
    },
  };
}
