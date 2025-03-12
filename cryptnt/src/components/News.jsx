import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Card, Input, Typography } from "antd";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";

import Loader from "./Loader";

import Masonry from "react-masonry-css";

const News = () => {
  const { Title, Text } = Typography;

  const [newsArr, setNewsArr] = useState([]);
  const [searchArticle, setArticle] = useState("bitcoin");
  const {data, isFetching} = useGetCryptoNewsQuery(searchArticle);

  useEffect(() => {
      const filteredArticles = data?.articles?.filter((article) => {
        return article.title.toLowerCase().includes(searchArticle);
      });

      setNewsArr(filteredArticles?.length > 0 ? filteredArticles : data);
  }, [searchArticle, data]);

  if (isFetching) return <Loader />;

  return (
    <>
      <Title>News</Title>
      <div className="search-crypto">
        <Input
          id="search"
          placeholder="search"
          onChange={(e) => setArticle(e.target.value.toLowerCase())}
        />
      </div>
      <Masonry
        breakpointCols={{default: 3, 480: 2, 375: 1}}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {newsArr?.map((news, index) => (
          <Col key={index} lg={24} className="masonry-item">
            <Card className="news-card">
              <Link to={`/newsDetail/${index}`}>
                <Title level={5}>{news?.title}</Title>
                <p>
                  <b>Author:</b> <i>{news?.author}</i>
                </p>
                <img
                  className="news-image-container"
                  src={news?.urlToImage}
                  alt={news?.title}
                />
                <p>{news?.description}</p>
                <Text>
                  <b>Published date:</b>{" "}
                  <i>{new Date(news?.publishedAt).toLocaleDateString()}</i>
                </Text>
              </Link>
            </Card>
          </Col>
        ))}
      </Masonry>
    </>
  );
};

export default News;