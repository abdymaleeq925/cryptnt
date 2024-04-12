import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { Typography, Col} from 'antd';

const NewsDetail = () => {
  const {articleId} = useParams();
  const { Title, Text } = Typography;

  const [ searchArticle, setArticle ] = useState('all');
  const { data, isFetching } = useGetCryptoNewsQuery(searchArticle);
  return (
    <Col className='article-detail-container'>
      <Col className='article-heading-container'>
        <Title level={2} className='article-name'>{data?.articles[articleId]?.title}</Title>
        <Text><b>{data?.articles[articleId]?.author}</b></Text> <br/>
        <Text><b>Published date:</b> <i>{new Date(data?.articles[articleId]?.publishedAt).toLocaleDateString()}</i></Text> <br/>
      </Col>
      <img src={data?.articles[articleId]?.urlToImage} style={{width: '70%'}}/>
      <Col className='article-container'>
        <Col className='artist-author'>
            <Text>{data?.articles[articleId].content}</Text>
        </Col>
      </Col>
    </Col>
  )
}
export default NewsDetail