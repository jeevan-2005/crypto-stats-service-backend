import axios from "axios";
import cron from "node-cron";
import catchAsyncError from "../middlewares/catchAsyncError.middleware.js";
import { CryptoModel } from "../models/cryptoModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";

const getCryptoById = catchAsyncError(async (req, res, next) => {
  try {
    const coin = req.query.coin;

    const latestData = await CryptoModel.findOne({ coin }).sort({
      timestamp: -1,
    });

    if (latestData) {
      return res.status(200).json({
        success: true,
        coinData: {
          price: latestData.price,
          marketCap: latestData.marketCap,
          "24hChange": latestData.change24h,
        },
      });
    } else {
      return next(new ErrorHandler("Data not found", 404));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const calculateStandardDeviation = catchAsyncError(async (req, res, next) => {
  try {
    const coin = req.query.coin;

    const lastest100Records = await Crypto.find({ coin })
      .sort({ timestamp: -1 })
      .limit(100);

    const prices = lastest100Records.map((record) => record.price);
    const totalPrice = prices.reduce((acc, price) => acc + price, 0);
    const mean = totalPrice / prices.length;
    const variance =
      prices.reduce((acc, price) => acc + (price - mean) ** 2, 0) /
      prices.length;
    const stdDeviation = variance ** 0.5;

    return res.status(200).json({
      success: true,
      deviation: stdDeviation,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

cron.schedule("0 */2 * * *", async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: "bitcoin,ethereum,matic-network",
          vs_currencies: "usd",
          include_market_cap: true,
          include_24hr_change: true,
        },
      }
    );

    const coinData = response.data;

    await CryptoModel.create({
      coin: "bitcoin",
      price: coinData.bitcoin.usd,
      marketCap: coinData.bitcoin.usd_market_cap,
      change24h: coinData.bitcoin.usd_24h_change,
    });

    await CryptoModel.create({
      coin: "ethereum",
      price: coinData.ethereum.usd,
      marketCap: coinData.ethereum.usd_market_cap,
      change24h: coinData.ethereum.usd_24h_change,
    });

    await CryptoModel.create({
      coin: "matic-network",
      price: coinData["matic-network"].usd,
      marketCap: coinData["matic-network"].usd_market_cap,
      change24h: coinData["matic-network"].usd_24h_change,
    });
  } catch (error) {
    console.error("Error occured while fetching crypto-data : ", error);
  }
});

export { getCryptoById, calculateStandardDeviation };
