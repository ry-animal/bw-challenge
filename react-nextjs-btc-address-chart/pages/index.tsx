import Head from "next/head";
import Layout from "../components/layout";
import { GetStaticProps } from "next";
import { Suspense } from "react";
import { ThreeDots } from "react-loader-spinner";
import { RowData } from "./api/btc-addresses";
import ChartBuilder from "../components/ChartBuilder";

interface Props {
  data: RowData[];
}

export default function Home({ data }: Props) {
  return (
    <Layout home>
      <Head>
        <title className="max-w-2xl mx-auto text-sm text-center">
          BTC Address Balances over Time
        </title>
      </Head>
      <section>
        <div className="flex justify-center items-center max-w-2xl mx-auto h-3/4">
          <Suspense
            fallback={
              <ThreeDots
                height="120"
                width="120"
                radius="9"
                color="#4fa94d"
                ariaLabel="three-dots-loading"
                visible={true}
              />
            }
          >
            <ChartBuilder data={data} />
          </Suspense>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(`${process.env.BASE_URL}/api/btc-addresses`);
  const data = await response.json();
  return {
    props: {
      data: data,
    },
  };
};
