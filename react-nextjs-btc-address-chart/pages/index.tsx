import Head from "next/head";
import Layout from "../components/layout";
import { GetStaticProps } from "next";
import { Suspense } from "react";
import { ThreeDots } from "react-loader-spinner";
import { RowData } from "./api/btc-addresses";
import LineChart from "../components/LineChart";

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
          <LineChart data={data} />
        </Suspense>
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
