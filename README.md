# Crypto Service Stats

## Project Description

This project is a server-side application built using Node.js and MongoDB. It monitors the price, market cap, and 24-hour price change of three cryptocurrencies: Bitcoin, Ethereum, and Matic. The data is fetched from the CoinGecko API every 2 hours and stored in a MongoDB database. The project also includes two APIs: one to fetch the latest data for a requested cryptocurrency, and another to calculate the standard deviation of its price over the last 100 records.

## Features

1. **Background Job (Task 1)**
   - A scheduled background job fetches the current price, market cap, and 24-hour change in USD for Bitcoin, Ethereum, and Matic.
   - This job runs once every 2 hours using `node-cron`.
   - Data is fetched from the CoinGecko API and stored in a MongoDB database.

2. **API to Fetch Latest Data (Task 2)**
   - API Endpoint: `/api/crypto/stats`
   - Query Parameter: `coin`
   - Example:
     ```bash
     https://crypto-stats-service-backend.onrender.com/api/crypto/stats?coin=bitcoin
     ```
   - The API returns the latest price, market cap, and 24-hour change for the requested cryptocurrency.
   - Example Response:
     ```json
     {
       "price": 40000,
       "marketCap": 800000000,
       "24hChange": 3.4
     }
     ```

3. **API to Calculate Standard Deviation (Task 3)**
   - API Endpoint: `/api/crypto/deviation`
   - Query Parameter: `coin`
   - Example:
     ```bash
     https://crypto-stats-service-backend.onrender.com/api/crypto/deviation?coin=bitcoin
     ```
   - The API calculates the standard deviation of the price of the requested cryptocurrency based on the last 100 records stored in the database.
   - Example Response:
     ```json
     {
       "deviation": 4082.48
     }
     ```

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/jeevan-2005/crypto-stats-service-backend.git
   ```
2. Install the dependencies:
    ```bash
    npm install
    ```
3. Create a .env file in the root directory and configure the following environment variables:
    ```bash
    PORT=your_port_number
    MONGO_URI=your_mongo_uri
    ```
4. Start the development server:
    ```bash
    npm run dev
    ```

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** (for database management)
- **Axios** (for API requests)
- **Node-cron** (for scheduling jobs)

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.
