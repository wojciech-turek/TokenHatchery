import Features from "components/LandingPage/Features";
import NFTCollections from "components/LandingPage/NFTCollections";
import SecuredBy from "components/LandingPage/SecuredBy";
import { TokensCreated } from "components/LandingPage/TokensCreated";
import clientPromise from "lib/mongodb";
import Link from "next/link";

export default function Home({
  tokenCount,
}: {
  tokenCount: {
    erc20: number;
  };
}) {
  return (
    <>
      <div>
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-4xl pt-20 pb-32 sm:pt-48 sm:pb-40">
            <div>
              <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
              <div>
                <h1 className="text-6xl font-bold tracking-tight sm:text-center sm:text-7xl">
                  Deploy, verify and manage your tokens
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-center">
                  TokenHatchery is a free and open source tool to deploy your
                  own tokens on the EVM based blockchains. It requires no coding
                  knowledge. Chose from a variety of token types like ERC20,
                  ERC721, ERC1155 and select your desired extensions.
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-center">
                  Easily manage your tokens with the TokenHatchery dashboard.
                </p>
                <div className="mt-8 flex gap-x-4 sm:justify-center">
                  <Link
                    href="/create"
                    className="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"
                  >
                    Deploy
                    <span className="text-indigo-200" aria-hidden="true">
                      &rarr;
                    </span>
                  </Link>
                  <Link
                    href="/manage"
                    className="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                  >
                    Manage tokens
                    <span className="text-gray-400" aria-hidden="true">
                      &rarr;
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 sm:mt-32">
          <SecuredBy />
        </div>
        <Features />
        <TokensCreated tokenCount={tokenCount} />
        <NFTCollections />
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const client = await clientPromise;
  const db = client.db("Deployments");
  const collection = db.collection(`ERC20`);
  const count = await collection.countDocuments();
  return {
    props: {
      tokenCount: {
        erc20: count,
      },
      revalidate: 3600,
    },
  };
};
