import express from "express";
import {
  calculateStandardDeviation,
  getCryptoById,
} from "../controllers/crypto.controllers.js";

const cryptoRouter = express.Router();

cryptoRouter.get("/stats", getCryptoById);
cryptoRouter.get("/deviation", calculateStandardDeviation);

export default cryptoRouter;
