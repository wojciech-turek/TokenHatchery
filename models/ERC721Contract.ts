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
  extensions: {
    type: Array,
    required: true,
  },
  managementType: {
    type: String,
    required: true,
  },
  baseURI: {
    type: String,
    required: true,
  },
  contractId: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
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
  maxSupply: {
    type: Number,
  },
  mintPrice: {
    type: Number,
  },
});

Erc721ContractSchema.index({ contractId: 1 }, { unique: true });
Erc721ContractSchema.index({ creator: 1 });
Erc721ContractSchema.index({ address: 1 });

export default models.ERC721 || model("ERC721", Erc721ContractSchema);
