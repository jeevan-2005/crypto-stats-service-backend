import catchAsyncError from "../middlewares/catchAsyncError.middleware";
import { CryptoModel } from "../models/cryptoModel";
import ErrorHandler from "../utils/ErrorHandler";

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


