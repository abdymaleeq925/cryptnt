import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Card, Input, Typography } from 'antd';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import Loader from './Loader';

import Masonry from 'react-masonry-component';


const News = () => {
    const {Title, Text} = Typography;

    const [ newsArr, setNewsArr ] = useState([]);
    const [ searchArticle, setArticle ] = useState('');
    const { data, isFetching } = useGetCryptoNewsQuery('all');
    
    const masonryOptions = {
        transitionDuration: 0
    }

    useEffect(() => {
        const filteredArticles = data?.articles?.filter((article) => {return article.title.toLowerCase().includes(searchArticle)})
    
        setNewsArr(filteredArticles?.length > 0 ? filteredArticles : data?.articles)
    }, [data, searchArticle]);
    
    if(isFetching) return (<Loader/>)

    return (
        <>
        <Title>News</Title>
        {
            <div className="search-crypto">
                <Input placeholder="search" onChange={(e) => setArticle(e.target.value.toLowerCase())}/>
            </div>
        }    
            <Masonry elementType='div' options={masonryOptions} className='masonry-grid'>
            {
              newsArr?.map((news, index) => (
                <Col xs={24} sm={12} lg={8}>
                    <Card className='news-card'>
                    <Link to={`/newsDetail/${index}`}>
                        <Title level={5}>{news?.title}</Title>
                        <p><b>Author:</b> <i>{news?.author}</i></p>
                        <img className='news-image-container' src={news?.urlToImage}/>
                        <p>{news?.description}</p>
                        <Text><b>Published date:</b> <i>{new Date(news?.publishedAt).toLocaleDateString()}</i></Text>
                    </Link>
                    </Card>
                </Col>
              ))
            }
            </Masonry>
        </>
    )
        
}

export default News