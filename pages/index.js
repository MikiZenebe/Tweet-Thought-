import Message from "@/components/Message";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Devs Thought</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-[100vh] justify-center max-w-[400px] mx-auto rounded-2xl py-4 ">
        <h2 className="text-center">See other dev's thought</h2>

        <Message />
      </div>
    </>
  );
}
