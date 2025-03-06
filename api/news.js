import axios from 'axios';

export default async function handler(req, res) {
    try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
            params: {
                q: 'all',
                apiKey: `${process.env.REACT_APP_NEWS_API_KEY}`
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
}