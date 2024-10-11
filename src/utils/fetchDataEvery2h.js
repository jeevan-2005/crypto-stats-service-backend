import axios from 'axios';
import cron from 'node-cron';
import CryptoModel from '../models/cryptoModel.js';

cron.schedule('0 */2 * * *', async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: 'bitcoin,ethereum,matic-network',
        vs_currencies: 'usd',
        include_market_cap: true,
        include_24hr_change: true
      }
    });

    const coinData = response.data;
    console.log(coinData);

    await CryptoModel.create({
      coin: 'bitcoin',
      price: coinData.bitcoin.usd,
      marketCap: coinData.bitcoin.usd_market_cap,
      change24h: coinData.bitcoin.usd_24h_change
    });

    await CryptoModel.create({
      coin: 'ethereum',
      price: coinData.ethereum.usd,
      marketCap: coinData.ethereum.usd_market_cap,
      change24h: coinData.ethereum.usd_24h_change
    });

    await CryptoModel.create({
      coin: 'matic-network',
      price: coinData['matic-network'].usd,
      marketCap: coinData['matic-network'].usd_market_cap,
      change24h: coinData['matic-network'].usd_24h_change
    });

  } catch (error) {
    console.error('Error occured while fetching crypto-data : ', error);
  }
});
