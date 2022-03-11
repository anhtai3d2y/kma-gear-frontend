import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Bar, Pie, Line } from 'react-chartjs-2';
// import faker from 'faker';
// import * as faker from 'faker';


class LineChart extends Component {

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
        ChartJS.register(
            ArcElement,
            CategoryScale,
            LinearScale,
            BarElement,
            Title,
            Tooltip,
            Legend
        );
        let options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Bar chart',
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
            scales: {
                y: { // defining min and max so hiding the dataset does not change scale range
                    min: 0,
                    max: 100
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
        let statistics = this.props.data.data
        let labels = statistics.map(element => element.date);
        let data = {
            labels,
            datasets: [
                {
                    label: this.props.data.label,
                    data: statistics.map(element => element.total),
                    fill: true,
                    borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.8)`,
                    tension: 0.1
                }
            ],
        };


        return (
            <div className="" >
                <h3 className="m-4">{this.props.data.label}</h3>

                <Line
                    option={options}
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

export default connect(mapStateToProps, mapDispatchToProps)(LineChart);
