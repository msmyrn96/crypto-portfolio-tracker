# Crypto Portfolio Tracker

A modern crypto portfolio tracker built with **React**, **TypeScript**, and **Tailwind CSS**. Users can search for coins, view price data, track their holdings, and manage their portfolio with real-time data from the CoinGecko API.

---

## 🎯 Objective

Build a crypto portfolio tracker where users can:

- Search for coins with autocomplete and debouncing.
- View coin details including:
  - Price history chart.
  - Stats such as market cap, supply, and price change %.
- Buy/Sell coins and add/remove them from the portfolio.
- Persist portfolio in `localStorage`.
- View a dashboard showing:
  - Portfolio total value in USD.
  - Individual coin holdings with amount, current price, value, and % of portfolio.
  - All coins, paginated.

---

## ⚡ Features

- **Coin Search**: Autocomplete search powered by CoinGecko API.
- **Portfolio Management**: Add, remove, and track coins.
- **Price Charts**: Visualize historical price data using Chart.js.
- **Stats & Analytics**: Market cap, supply, price changes, and portfolio distribution.
- **Dashboard**: Overview of portfolio value and holdings.
- **LocalStorage**: Persistent portfolio simulation.

---

## 🛠 Technologies Used

- **Frontend**: React, TypeScript, Shadcn UI, Tailwind CSS  
- **State & Data**: Tanstack Query  
- **Charts & Visualization**: Chart.js, react-chartjs-2  
- **Routing**: react-router, react-router-dom  
- **Notifications**: react-hot-toast  
- **Utilities**: axios, clsx, tailwind-merge  
- **Development Tools**: react-scripts, customize-cra, webpack-bundle-analyzer

---

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/msmyrn96/crypto-portfolio-tracker.git
cd crypto-portfolio-tracker
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

---

## 🧩 Usage

1. **Search for a cryptocurrency** using the search bar.  
2. **Click on a coin** to view detailed statistics and price chart.  
3. **Use the Buy/Sell buttons** to update your portfolio.  
4. **Check your dashboard** for portfolio insights and coin distribution.  

---

## 📊 API

This project uses the [CoinGecko API](https://www.coingecko.com/en/api) to fetch:

- **Coin list and market data**: `GET /coins/markets`  
- **Coin price history**: `GET /coins/{id}/market_chart`

---

📝 License

This project is licensed under the MIT License.
