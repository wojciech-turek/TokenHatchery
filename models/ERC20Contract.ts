import { Schema, model, models } from "mongoose";

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
});

Erc20ContractSchema.index({ contractId: 1 }, { unique: true });
Erc20ContractSchema.index({ creator: 1 });
Erc20ContractSchema.index({ address: 1 });

export default models.ERC20 || model("ERC20", Erc20ContractSchema);
