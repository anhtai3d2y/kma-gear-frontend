import React, { Component } from 'react';
import { connect } from 'react-redux';
// import {
//     Chart as ChartJS,
//     ArcElement,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend,
// } from 'chart.js';
import { Chart, registerables } from 'chart.js'

import { Bar, Pie, Line } from 'react-chartjs-2';
// import faker from 'faker';
// import * as faker from 'faker';
// ChartJS.register(
//     ArcElement,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend
// );

class BillPaymentStatisticsChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    async componentDidMount() {
    }

    componentDidUpdate() {
    }

    render() {
        Chart.register(...registerables)
        let options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Tỉ lệ phương thức thanh toán',
                },
                datalabels: {
                    formatter: (value, ctx) => {

                        let sum = 0;
                        let dataArr = ctx.chart.data.datasets[0].data;
                        dataArr.map(data => {
                            sum += data;
                        });
                        let percentage = 50 + "%";
                        return percentage;


                    },
                    color: '#fff',
                }
            },
            animations: {
                tension: {
                    duration: 1000,
                    easing: 'linear',
                    from: 1,
                    to: 0,
                    loop: true
                }
            },
            tooltips: {
                mode: 'label',
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
        };
        let labels = ['Thanh toán khi nhận', 'Thanh toán trực tuyến'];
        let data = {
            labels,
            datasets: [
                {
                    data: this.props.data,
                    backgroundColor:
                        [
                            `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.8)`,
                            `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.8)`,
                        ],
                    hoverOffset: 4
                }
            ],
        };


        return (
            <div className="" >
                <Pie
                    options={options}
                    data={data}
                />
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BillPaymentStatisticsChart);
