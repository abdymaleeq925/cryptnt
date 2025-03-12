//rafce
import React from 'react'
import { Chart as ChartJS, registerables} from "chart.js";
import { Line } from "react-chartjs-2";
import { Row, Col, Typography } from 'antd';

ChartJS.register(...registerables)


const LineChart = ({ coinName, coinHistory, coinCurrentPrice }) => {
    const coinPrice = [], coinTimeStamp = [];
    for(let i = 0 ; i < coinHistory?.history?.length; i++) {
        coinPrice.push(coinHistory?.history[i].price);
        coinTimeStamp.push(`${new Date((coinHistory?.history[i].timestamp)*1000).toLocaleDateString()}`);
    }
    const data = {
        labels: coinTimeStamp.reverse(),
        datasets: [{
            label: 'Price in USD',
            data: coinPrice.reverse(),
            fill: false,
            bordercolor: "#888888",
            backgroundColor: "#0071BD"
        }]
    }
    const options = {
        scales: {
            y: {
                ticks: {
                    beginAtZero: true
                }
            }
        }
    }
    
  return (
    <div>
      <>
        <Row className='chart-header'>
            <Typography.Title level={2}>
                Chart
            </Typography.Title>
            <Col>
            <Typography.Title level={5}>Change: {coinHistory?.change}</Typography.Title>
            <Typography.Title level={5}>Current: {coinName} Price: ${Math.floor(coinCurrentPrice)}</Typography.Title>
            </Col>
            <Line data={data} options={options}/>
        </Row>
      </>
    </div>
  )
}

export default LineChart
