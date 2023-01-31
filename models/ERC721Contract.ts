import { Schema, model, models } from "mongoose";

const Erc721ContractSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  baseURI: {
    type: String,
  },
  contractId: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    default: "ERC721",
  },
  verificationGuid: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  networkName: {
    type: String,
    required: true,
  },
  networkChainId: {
    type: Number,
    required: true,
  },
  showInSearch: {
    type: Boolean,
    default: true,
  },
  options: {
    individualTokens: {
      type: Boolean,
      default: false,
    },
    publicMinting: {
      type: Boolean,
      default: false,
    },
    customPaymentToken: {
      type: Boolean,
      default: false,
    },
    customPaymentTokenData: {
      address: {
        type: String,
      },
      decimals: {
        type: String,
      },
      symbol: {
        type: String,
      },
    },
    mintFee: {
      type: String,
    },
    maxSupply: {
      type: String,
    },
    walletLimit: {
      type: String,
    },
  },
});

Erc721ContractSchema.index({ contractId: 1 }, { unique: true });
Erc721ContractSchema.index({ creator: 1 });
Erc721ContractSchema.index({ address: 1 });

export default models.ERC721 || model("ERC721", Erc721ContractSchema);
