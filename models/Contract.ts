import { Schema, model } from "mongoose";

const Erc20ContractSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  decimals: {
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
  initialSupply: {
    type: String,
    required: true,
  },
  extensions: {
    type: Array,
    required: true,
  },
  managementType: {
    type: String,
    required: true,
  },
  abi: {
    type: String,
    required: true,
  },
  bytecode: {
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
    required: false,
  },
  verificationStatus: {
    type: String,
    required: false,
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
});

Erc20ContractSchema.index({ contractId: 1 }, { unique: true });
Erc20ContractSchema.index({ address: 1 }, { unique: true });

export default model("ERC20", Erc20ContractSchema);
