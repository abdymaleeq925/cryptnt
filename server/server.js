const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5001;

// Настройка CORS
app.use(cors({
    origin: 'http://localhost:3000', // Разрешаем запросы только с этого домена
    credentials: true, // Разрешаем передачу кук и заголовков авторизации
}));

// Middleware
app.use(express.json());

// Прокси-эндпоинт
app.get('/api/news', async (req, res) => {
    const { q } = req.query;

    try {
        console.log('News API Key:', process.env.REACT_APP_CRYPTO_NEWS_API_KEY);
        const response = await axios.get('https://newsapi.org/v2/everything', {
            params: {
                q: q || 'bitcoin',
                apiKey: process.env.REACT_APP_CRYPTO_NEWS_API_KEY,
            },
        });
        console.log('Response from NewsAPI:', response.data);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching news:', error.response?.data || error.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});