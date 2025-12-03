import Head from "next/head";

interface SEOProps {
  title: string;
  description: string;
}

const SEO = (props: SEOProps) => {
  const { title, description } = props;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
  );
};

export default SEO;
