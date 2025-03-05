import React from "react";
import { Typography, Row, Col, Statistic } from "antd";

import Cryptocurrencies from "./Cryptocurrencies";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";

import { Link } from "react-router-dom";

const Homepage = () => {
  const { isFetching } = useGetCryptosQuery(10);

  if (isFetching) return <Loader />;
  return (
    <>
      {isFetching ? (
        <Loader />
      ) : (
        <>
          <Typography.Title>Global Crypto Stats</Typography.Title>
          <Row>
            <Col span={12}>
              <Statistic title="Total cyptos" value="30000"></Statistic>
            </Col>
            <Col span={12}>
              <Statistic title="Total exchanges" value="4158"></Statistic>
            </Col>
            <Col span={12}>
              <Statistic title="Total Market Cap" value="414145"></Statistic>
            </Col>
            <Col span={12}>
              <Statistic title="Total 24th volume" value="9372452"></Statistic>
            </Col>
            <Col span={12}>
              <Statistic title="Total Markets" value="43623"></Statistic>
            </Col>
            <Col span={12}>
              <Statistic
                title="Total cyptocurrencies"
                value="321000"
              ></Statistic>
            </Col>
          </Row>
          <div className="home-heading-container">
            <Typography.Title level={1}>Top 10 cryptos</Typography.Title>
            <Typography.Title level={4}>
              <Link to="/cryptocurrencies">Show more</Link>
            </Typography.Title>
          </div>
          <Cryptocurrencies simplified></Cryptocurrencies>
        </>
      )}
    </>
  );
};

export default Homepage;
