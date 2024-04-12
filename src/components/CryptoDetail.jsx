import React, { useState } from 'react';
import millify from 'millify';
import { useParams } from 'react-router-dom';
import { useGetCryptoDetailsQuery } from '../services/cryptoApi';
import { useGetCryptoHistoryQuery } from '../services/cryptoHistoryApi';
import LineChart from './LineChart';
import { Typography, Row, Col, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, ThunderboltOutlined, CheckOutlined, StopOutlined, FundOutlined, NumberOutlined, ExclamationCircleOutlined, TrophyOutlined } from '@ant-design/icons';

const CryptoDetail = () => {
  const {coinId} = useParams();
  const [timePeriod, setPeriod] = useState('24h');

  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({coinId, timePeriod});
  console.log(data);
  const coinDetails = data?.data?.coin;
  //const volume24h = coinDetails["24hVolume"];

  const handleChangePeriod = (val) => { setPeriod(val) }

  const timeStamps = ['3h', '24h', '7d', '30d', '1y', '2y', '3y', '5y'];

  const coinStats = [
    {title: 'Price to USD', value: `$ ${coinDetails?.price && millify(coinDetails?.price)}`, icon: <DollarCircleOutlined/>},
    {title: 'Rank', value: coinDetails?.rank && coinDetails?.rank, icon: <NumberOutlined/>},
    //{title: '24h volume', value: `$ ${volume24h && millify(volume24h)}`, icon: <ThunderboltOutlined/>},
    {title: 'Market Cap', value: `$ ${coinDetails?.marketCap && millify(coinDetails?.marketCap)}`, icon: <DollarCircleOutlined/>},
    {title: 'ATH', value: `$ ${coinDetails?.allTimeHigh?.price && millify(coinDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined/>},
  ];
  const coinOtherStats = [
    {title: 'Number of Markets', value: coinDetails?.numberOfMarkets, icon: <FundOutlined/>},
    {title: 'Number of Exchange', value: coinDetails?.numberOfExchanges, icon: <MoneyCollectOutlined/>},
    {title: 'Approved Supply', value: coinDetails?.supply?.confirmed ? <CheckOutlined/> : <StopOutlined/>, icon: <ExclamationCircleOutlined/>},
    {title: 'Total Supply', value: `$ ${coinDetails?.supply?.total && millify(coinDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined/>},
    {title: 'Circulating Supply', value: `$ ${coinDetails?.supply?.circulating && millify(coinDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined/>},
  ];
  const { Title, Text } = Typography;
  
  return (
    <Col className='coin-detail-container'>
      <Col className='coin-heading-container'>
        <Title level={2} className='coin-name'>{coinDetails?.name}</Title>
        <Text>{coinDetails?.name} live price in US Dollar (USD). View value statistics, market cap and supply</Text>
      </Col>
      <Select className='select-timeperiod' placeholder="Choose time period" onChange={(value) => handleChangePeriod(value)}>
        {
          timeStamps?.map((date,i) => <Select.Option key={i} value={date}>{date}</Select.Option>)
        }
      </Select>
      <LineChart coinName={coinDetails?.name} coinHistory={coinHistory?.data} coinCurrentPrice={coinDetails?.price}/>
      <Col className='stats-container'>
        <Col className='coin-value-statistics'>
          <Col className='coin-value-statistics-heading'>
            <Title level={4} className='coin-details-heading'>
              {coinDetails?.name} value statistics
            </Title>
            <Text>An overview showing the statistic of {coinDetails?.name} such as the base , the rank and trading volume</Text>
          </Col>
          {
            coinStats.map(({icon, title, value}) => (
              <Col className='coin-stats' key={title}>
                <Col className='coin-stats-name'>
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className='stats'>{value}</Text>
              </Col>
            ))
          }
        </Col>
        <Col className='coin-value-statistics'>
          <Col className='coin-value-statistics-heading'>
            <Title level={4} className='coin-details-heading'>
              {coinDetails?.name} other value statistics
            </Title>
            <Text>An overview showing the statistic of {coinDetails?.name} such as the base , the rank and trading volume</Text>
          </Col>
          {
            coinOtherStats.map(({icon, title, value}) => (
              <Col className='coin-stats' key={title}>
                <Col className='coin-stats-name'>
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className='stats'>{value}</Text>
              </Col>
            ))
          }
        </Col>
        <Col className='coin-desc-link'>
          <Row>
            <Title level={4} className='coin-details-heading'>What is {coinDetails?.name}?</Title>
            <Text>{coinDetails?.description}</Text>
          </Row>
        </Col>
        <Col className='coin-links'>
            <Title level={4} className='coin-details-heading'>{coinDetails?.name} links</Title>
            {coinDetails?.links?.map((link, index) => (
              <Row key={index}>
                <Title level={5}><a href={link.url}>{link.name}</a></Title>
              </Row>
            ))}
          </Col>
      </Col>
    </Col>
  )
}

export default CryptoDetail
