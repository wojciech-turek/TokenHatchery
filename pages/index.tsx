import Features from "components/LandingPage/Features";
import NFTCollections from "components/LandingPage/NFTCollections";
import SecuredBy from "components/LandingPage/SecuredBy";
import { TokensCreated } from "components/LandingPage/TokensCreated";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
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
        <div className="flex gap-4 py-4 items-center justify-center mt-16 sm:mt-32 border-2 border-gray-50 bg-gray-50">
          <div className="text-gray-800 text-3xl font-bold">Member of </div>
          <Image
            src="/imgs/sagaInnovator.png"
            alt="Saga Innovators"
            width={200}
            height={50}
          />
        </div>
        <div className="mt-20 sm:mt-32">
          <SecuredBy />
        </div>
        <Features />
        <TokensCreated />
        <NFTCollections />
      </div>
    </>
  );
}
