# Crypto Website 🌟

This project is a **cryptocurrency-focused** webpage that provides up-to-date information on top cryptocurrencies, the latest crypto news, and cryptocurrency price trends. The data for news and cryptocurrency prices is fetched via a **REST API** using **Express**. The webpage also includes a news search function and a price chart with period selection.

---

## Features ✨

### Coinranking API 🔐
- Used to get crypo data

### Line Chart 📝
- Line Chart is created by **ant-d** library.
- You can choose time period of price history.

### Modern UI/UX 🎨
- **Responsive Design**: Enjoy a seamless experience on any device.
- **Clean and Intuitive Interface**: Easy navigation and user-friendly design.

---

## Technologies Used 🛠️

- **Frontend**: React, HTML/CSS
- **Backend**: Node.js, Express
- **API**: Coinranking API, newsorg API
- **State Management**: Redux
- **Styling**: CSS, ant-d

---

## How to run 🚀

- Clone the repository
- Install dependencies

  Backend Setup:
    ```bash
    cd blog_backend
    npm install
    cp .env.blog .env
    ```
  Start backend server
    ```bash
    node index.js
    ```
  Frontend Setup:
    ```bash
    cd blog_frontend
    npm install
    cp .env.blog .env
    ```
  Start the development server
    ```bash
    npm start run
    ```
