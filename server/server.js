const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5001;

// CORS Settings
app.use(cors({
    origin: 'https://cryptnt.vercel.app',
    credentials: true, 
}));

// Middleware
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
  });

// Prщxy-endpoint
app.get('/api/news', async (req, res) => {
    const { q } = req.query;
    res.json({ message: 'Hello from /api/news', query: q });
    try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
            params: {
                q: q || 'bitcoin',
                apiKey: process.env.REACT_APP_CRYPTO_NEWS_API_KEY,
            },
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching news:', error.response?.data || error.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// Run server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});