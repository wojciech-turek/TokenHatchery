import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const TokenCard = () => {
  return (
    <motion.div
      className="overflow-hidden rounded-lg bg-white shadow hover:shadow-lg cursor-pointer"
      whileHover={{ scale: 1.02 }}
    >
      <div className="w-full">
        <Image
          src={"https://neonrain.io/static/media/landing-chimpers.baaab0e9.png"}
          alt="nft"
          width={300}
          height={300}
          className="rounded-lg inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="bg-gray-50 px-4 py-4 sm:px-6">
        <div className="text-lg leading-6 font-medium text-gray-900">
          Punks #1
        </div>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>
            The original 10,000 CryptoPunks are 24x24 pixel art pieces on the
            Ethereum blockchain.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TokenCard;
