import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const SemiCircleChart = () => {
    const [series] = useState([76]);
    const [options] = useState({
        chart: {
            type: 'radialBar',
            offsetY: -20,
            sparkline: {
                enabled: true
            }
        },
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                hollow: {
                    margin: 0,
                    size: '80%',
                    background: '#fff',
                    image: undefined,
                    imageOffsetX: 0,
                    imageOffsetY: 0,
                    position: 'front',
                },
                track: {
                    background: '#E0E2E7',
                    strokeWidth: '67%',
                    margin: 0, // margin is in pixels
                },

                dataLabels: {
                    show: true,
                    value: {
                        offsetY: -50,
                        fontSize: '35px'
                    }
                }
            }
        },
        fill: {
            colors: ['#883DCF']
        },
        stroke: {
            lineCap: 'round'
        },
    });

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={options} series={series} type="radialBar" />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

export default SemiCircleChart;
