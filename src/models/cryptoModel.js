import mongoose from "mongoose";

const cryptoSchema = new mongoose.Schema({
  coin: {
    type: String,
    required: true,
    enum: ["bitcoin", "ethereum", "matic-network"],
  },
  price: {
    type: Number,
    required: true,
  },
  marketCap: {
    type: Number,
    required: true,
  },
  change24h: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export const CryptoModel = mongoose.model("Crypto", cryptoSchema);
