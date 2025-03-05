import React, { useState } from "react";
import millify from "millify";
import { useParams } from "react-router-dom";
import { useGetCryptoDetailsQuery } from "../services/cryptoApi";
import { useGetCryptoHistoryQuery } from "../services/cryptoHistoryApi";
import LineChart from "./LineChart";
import { Typography, Row, Col, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  CheckOutlined,
  StopOutlined,
  FundOutlined,
  NumberOutlined,
  ExclamationCircleOutlined,
  TrophyOutlined,
} from "@ant-design/icons";

const CryptoDetail = () => {
  const { coinId } = useParams();
  const [timePeriod, setPeriod] = useState("24h");

  const { data } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod,
  });
  const coinDetails = data?.data?.coin;

  const handleChangePeriod = (val) => {
    setPeriod(val);
  };

  const timeStamps = ["3h", "24h", "7d", "30d", "1y", "2y", "3y", "5y"];

  const coinStats = [
    {
      title: "Price to USD",
      value: `$ ${coinDetails?.price && millify(coinDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "Rank",
      value: coinDetails?.rank && coinDetails?.rank,
      icon: <NumberOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${coinDetails?.marketCap && millify(coinDetails?.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "ATH",
      value: `$ ${
        coinDetails?.allTimeHigh?.price &&
        millify(coinDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];
  const coinOtherStats = [
    {
      title: "Number of Markets",
      value: coinDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number of Exchange",
      value: coinDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Approved Supply",
      value: coinDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        coinDetails?.supply?.total && millify(coinDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        coinDetails?.supply?.circulating &&
        millify(coinDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];
  const { Title, Text } = Typography;

  const infoHeadings = [
    {
      heading: `${coinDetails?.name} value statistics`,
      info: `An ovedasdrview showing the statistic of ${coinDetails?.name} such as the base , the rank and trading volume`,
      stats: coinStats,
    },
    {
      heading: `${coinDetails?.name} other value statistics`,
      info: `An overview showing the statistic of ${coinDetails?.name} such as the base , the rank and trading volume`,
      stats: coinOtherStats,
    },
    {
      heading: `What is ${coinDetails?.name}?`,
      info: `${coinDetails?.description}`,
    },
    {
      heading: `${coinDetails?.name} links`,
      info: `${coinDetails?.links}`,
    },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {coinDetails?.name}
        </Title>
        <Text>
          {coinDetails?.name} live price in US Dollar (USD). View value
          statistics, market cap and supply
        </Text>
      </Col>
      <Select
        className="select-timeperiod"
        aria-label="Select time-period"
        placeholder="Choose time period"
        onChange={(value) => handleChangePeriod(value)}
      >
        {timeStamps?.map((date, i) => (
          <Select.Option key={i} value={date}>
            {date}
          </Select.Option>
        ))}
      </Select>
      <LineChart
        coinName={coinDetails?.name}
        coinHistory={coinHistory?.data}
        coinCurrentPrice={coinDetails?.price}
      />
      <Col className="stats-container">
        {infoHeadings.map(({ heading, info, stats }, i) => (
          <Col className="coin-value-statistics" key={heading}>
            <Col className="coin-value-statistics-heading">
              <Title
                level={3}
                className="coin-details-heading"
                style={{ color: "var(--pink)" }}
              >
                {heading}
              </Title>
              {i === infoHeadings.length - 1 ? (
                <Col className="coin-links">
                  {coinDetails?.links?.map((link, index) => (
                    <Row key={index}>
                      <Title level={5}>
                        <a href={link.url}>{link.name}</a>
                      </Title>
                    </Row>
                  ))}
                </Col>
              ) : (
                <Text>{info}</Text>
              )}
            </Col>
            {stats &&
              stats.map(({ icon, title, value }) => (
                <Col className="coin-stats" key={title}>
                  <Col className="coin-stats-name">
                    <Text>{icon}</Text>
                    <Text>{title}</Text>
                  </Col>
                  <Text className="stats">{value}</Text>
                </Col>
              ))}
          </Col>
        ))}
      </Col>
    </Col>
  );
};

export default CryptoDetail;
