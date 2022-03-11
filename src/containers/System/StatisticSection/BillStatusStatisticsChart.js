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

class BillStatusStatisticsChart extends Component {

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
                    text: 'Tỉ lệ trạng thái đơn hàng',
                },
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
        let labels = ['Chưa xác nhận', 'Đã xác nhận', 'Đang vận chuyển', 'Đã thanh toán', 'Hoàn', 'Đã hủy'];
        let data = {
            labels,
            datasets: [
                {
                    data: this.props.data,
                    backgroundColor:
                        [
                            '#f9495f',
                            '#339af0',
                            '#ffc107',
                            '#28a745',
                            '#8028a7',
                            '#adb5bd',
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

export default connect(mapStateToProps, mapDispatchToProps)(BillStatusStatisticsChart);
