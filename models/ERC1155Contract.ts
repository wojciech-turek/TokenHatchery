import { Schema, model, models } from "mongoose";

const Erc1155ContractSchema = new Schema({
  name: {
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

Erc1155ContractSchema.index({ contractId: 1 }, { unique: true });
Erc1155ContractSchema.index({ creator: 1 });
Erc1155ContractSchema.index({ address: 1 });

export default models.ERC1155 || model("ERC1155", Erc1155ContractSchema);
