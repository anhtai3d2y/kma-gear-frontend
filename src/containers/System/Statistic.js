import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Statistic.scss';
import BillStatusStatisticsChart from './StatisticSection/BillStatusStatisticsChart';
import BillPaymentStatisticsChart from './StatisticSection/BillPaymentStatisticsChart';
import LineChart from './StatisticSection/LineChart';
import TableTopProduct from './StatisticSection/TableTopProduct';
import { ToastContainer, toast } from 'react-toastify';
import {
    sortByCreateDateASC,
    sortByTotalDESC,
} from '../../utils/SortUtils.js';
import *  as actions from "../../store/actions";
import { DatePicker, message } from 'antd';
import 'antd/dist/antd.css';
var XLSX = require("xlsx");

class BannerManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: 'None',
            endDate: 'None',
        }
        this.scrollTop = React.createRef()
    }

    async componentDidMount() {
        // this.handleScroll()
        this.props.fetchBillsRedux()
        this.props.fetchInvoicedetailsRedux()
        this.props.fetchAllUsersRedux()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // this.handleScroll()

        // if (prevProps.bannersRedux !== this.props.bannersRedux) {
        //     this.setState({
        //         link: '',
        //         image: '',
        //         type: 0,

        //         action: CRUDActions.CREATE,

        //         isShowForm: false
        //     })
        // }
    }

    handleScroll = () => {
        const { index, selected } = this.props
        if (index === selected) {
            setTimeout(() => {
                this.scrollTop.current.scrollIntoView({ behavior: 'smooth' })
            }, 200)
        }
    }

    calculateBillState = (arr) => {
        let countBillState = [0, 0, 0, 0, 0, 0]
        arr.forEach(element => {
            countBillState[element.StateId - 1]++
        })
        return countBillState
    }

    calculateBillPayment = (arr) => {
        let countBillPayment = [0, 0]
        arr.forEach(element => {
            countBillPayment[element.PaymenttypeId - 1]++
        })
        return countBillPayment
    }

    contains = (arr, element) => {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].date === element) return true;
        }
        return false;
    };

    containsName = (arr, element) => {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].name === element) return true;
        }
        return false;
    };

    uniqueArr = (arr) => {
        var arrResult = [];
        for (var i = 0; i < arr.length; i++) {
            if (!this.contains(arrResult, arr[i])) {
                arrResult.push({
                    date: arr[i],
                    total: 0
                });
            }
        }
        return (arrResult);
    }

    uniqueArrProducts = (arr) => {
        var arrResult = [];
        for (var i = 0; i < arr.length; i++) {
            if (!this.containsName(arrResult, arr[i])) {
                arrResult.push({
                    name: arr[i],
                    total: 0,
                    totalRevenue: 0

                });
            }
        }
        return (arrResult);
    }

    calculateInvoicedetail = (arr) => {
        let arrDate = []
        arr.forEach((invoicedetail, index) => {
            const dateNow = new Date(invoicedetail.createdAt)
            let date = dateNow.getFullYear() + '/' + Number(dateNow.getMonth() + 1) + '/' + dateNow.getDate()
            arrDate.push(date)
        })
        arrDate = this.uniqueArr(arrDate)
        arr.forEach((invoicedetail, index) => {
            const dateNow = new Date(invoicedetail.createdAt)
            let date = dateNow.getFullYear() + '/' + Number(dateNow.getMonth() + 1) + '/' + dateNow.getDate()
            for (let i = 0; i < arrDate.length; i++) {
                if (arrDate[i].date === date) {
                    arrDate[i].total += invoicedetail.price * (1 - invoicedetail.discount / 100) * invoicedetail.amount
                }
            }
        })
        return arrDate
    }

    calculateUser = (arr) => {
        let arrDate = []
        arr.forEach((user, index) => {
            const dateNow = new Date(user.createdAt)
            let date = dateNow.getFullYear() + '/' + Number(dateNow.getMonth() + 1) + '/' + dateNow.getDate()
            arrDate.push(date)
        })
        arrDate = this.uniqueArr(arrDate)
        arr.forEach((user, index) => {
            const dateNow = new Date(user.createdAt)
            let date = dateNow.getFullYear() + '/' + Number(dateNow.getMonth() + 1) + '/' + dateNow.getDate()
            for (let i = 0; i < arrDate.length; i++) {
                if (arrDate[i].date === date) {
                    arrDate[i].total += 1
                }
            }
        })
        return arrDate
    }

    calculateCountProduct = (arr) => {
        let arrProducts = []
        arr.forEach((invoicedetail, index) => {
            const productName = invoicedetail.Product.name
            arrProducts.push(productName)
        })
        arrProducts = this.uniqueArrProducts(arrProducts)
        arr.forEach((invoicedetail, index) => {
            const productName = invoicedetail.Product.name
            for (let i = 0; i < arrProducts.length; i++) {
                if (arrProducts[i].name === productName) {
                    arrProducts[i].total += 1
                }
            }
        })
        return arrProducts
    }

    calculateRevenueProduct = (arr) => {
        let arrProducts = []
        arr.forEach((invoicedetail, index) => {
            const productName = invoicedetail.Product.name
            arrProducts.push(productName)
        })
        arrProducts = this.uniqueArrProducts(arrProducts)
        arr.forEach((invoicedetail, index) => {
            const productName = invoicedetail.Product.name
            for (let i = 0; i < arrProducts.length; i++) {
                if (arrProducts[i].name === productName) {
                    arrProducts[i].total += invoicedetail.price * (1 - invoicedetail.discount / 100) * invoicedetail.amount
                }
            }
        })
        return arrProducts
    }

    calculateBothProduct = (arr) => {
        let arrProducts = []
        arr.forEach((invoicedetail, index) => {
            const productName = invoicedetail.Product.name
            arrProducts.push(productName)
        })
        arrProducts = this.uniqueArrProducts(arrProducts)
        arr.forEach((invoicedetail, index) => {
            const productName = invoicedetail.Product.name
            for (let i = 0; i < arrProducts.length; i++) {
                if (arrProducts[i].name === productName) {
                    arrProducts[i].total += 1
                    arrProducts[i].totalRevenue += invoicedetail.price * (1 - invoicedetail.discount / 100) * invoicedetail.amount
                }
            }
        })
        return arrProducts
    }

    calculateCountBill = (arr) => {
        let arrDate = []
        arr.forEach((bill, index) => {
            const dateNow = new Date(bill.createdAt)
            let date = dateNow.getFullYear() + '/' + Number(dateNow.getMonth() + 1) + '/' + dateNow.getDate()
            arrDate.push(date)
        })
        arrDate = this.uniqueArr(arrDate)
        arr.forEach((bill, index) => {
            const dateNow = new Date(bill.createdAt)
            let date = dateNow.getFullYear() + '/' + Number(dateNow.getMonth() + 1) + '/' + dateNow.getDate()
            for (let i = 0; i < arrDate.length; i++) {
                if (arrDate[i].date === date) {
                    arrDate[i].total += 1
                }
            }
        })
        return arrDate
    }

    getDataByDate = (arr) => {
        let newArr = []
        if (this.state.startDate !== 'None') {
            for (let i = 0; i < arr.length; i++) {
                const element = arr[i];
                if (element.createdAt >= this.state.startDate) {
                    newArr.push(element)
                }
            }
            arr = newArr
            newArr = []
        }
        if (this.state.endDate !== 'None') {
            for (let i = 0; i < arr.length; i++) {
                const element = arr[i];
                if (element.createdAt <= this.state.endDate) {
                    newArr.push(element)
                }
            }
            arr = newArr
            newArr = []
        }
        return arr
    }

    handleChangeStartDate = (value) => {
        message.info(`Selected Date: ${value ? value.format('YYYY-MM-DD') : 'None'}`);
        let date = value ? value.format('YYYY-MM-DD') : 'None'
        this.setState({
            startDate: date
        })
    };
    handleChangeEndDate = (value) => {
        message.info(`Selected Date: ${value ? value.format('YYYY-MM-DD') : 'None'}`);
        let date = value ? value.format('YYYY-MM-DD') : 'None'
        this.setState({
            endDate: date
        })
    };

    numberWithCommas = (x) => {
        let result = Math.round(x)
        return result.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
    }

    downloadExcel = (
        statisticUser,
        statisticInvoicedetail,
        statisticCountProduct,
        statisticRevenueProduct,
        statisticBothProduct,
        statisticCountBill,
        billsStateData,
        billsPaymentData
    ) => {
        let fileName = "Báo cáo KMA Gear.xlsx"
        let startDate = this.state.startDate
        let endDate = this.state.endDate
        if (startDate !== 'None' && endDate !== 'None') {
            fileName = `Báo cáo KMA Gear từ ${startDate} đến ${endDate} .xlsx`
        } else {
            if (startDate !== 'None') {
                fileName = `Báo cáo KMA Gear từ ${startDate}.xlsx`
            } else if (endDate !== 'None') {
                fileName = `Báo cáo KMA Gear trước ${endDate}.xlsx`
            }
        }

        const workBook = XLSX.utils.book_new()

        // user
        let users = statisticUser.map(user => {
            return ({
                'Ngày': user.date,
                'Tổng': user.total
            })
        })
        let totalUsers = statisticUser.reduce(
            (previousValue, currentValue) => previousValue + currentValue.total,
            0
        )
        users.push({
            'Ngày': 'Tổng',
            'Tổng': totalUsers
        })

        const workSheetUser = XLSX.utils.json_to_sheet(users)
        XLSX.utils.book_append_sheet(workBook, workSheetUser, "Người dùng")
        //renevue
        let renevue = statisticInvoicedetail.map(element => {
            return ({
                'Ngày': element.date,
                'Tổng': element.total
            })
        })
        let totalRevenue = statisticInvoicedetail.reduce(
            (previousValue, currentValue) => previousValue + currentValue.total,
            0
        )
        renevue.push({
            'Ngày': 'Tổng',
            'Tổng': totalRevenue
        })
        const workSheetRenevue = XLSX.utils.json_to_sheet(renevue)
        XLSX.utils.book_append_sheet(workBook, workSheetRenevue, "Doanh thu")
        //bill
        let bill = statisticCountBill.map(element => {
            return ({
                'Ngày': element.date,
                'Tổng': element.total
            })
        })
        let totalBill = statisticCountBill.reduce(
            (previousValue, currentValue) => previousValue + currentValue.total,
            0
        )
        bill.push({
            'Ngày': 'Tổng',
            'Tổng': totalBill
        })
        bill.push({
            'Ngày': '',
            'Tổng': ''
        })
        let arrState = ['Chưa xác nhận', 'Đã xác nhận', 'Đang vận chuyển', 'Đã thanh toán', 'Hoàn', 'Đã hủy']
        for (let i = 0; i < billsStateData.length; i++) {
            bill.push({
                'Ngày': arrState[i],
                'Tổng': billsStateData[i]
            })
        }
        bill.push({
            'Ngày': '',
            'Tổng': ''
        })
        let arrPaymenttype = ['Thanh toán khi nhận', 'Thanh toán trực tuyến']
        for (let i = 0; i < billsStateData.length; i++) {
            bill.push({
                'Ngày': arrPaymenttype[i],
                'Tổng': billsPaymentData[i]
            })
        }
        const workSheetBill = XLSX.utils.json_to_sheet(bill)
        XLSX.utils.book_append_sheet(workBook, workSheetBill, "Hóa đơn")
        //product
        let products = statisticBothProduct.map(element => {
            return ({
                'Tên': element.name,
                'Tổng': this.numberWithCommas(element.total),
                'Tổng doanh thu': this.numberWithCommas(element.totalRevenue) + " đ",
            })
        })
        let totalProduct = statisticBothProduct.reduce(
            (previousValue, currentValue) => previousValue + currentValue.total,
            0
        )
        let totalProductRevenue = statisticBothProduct.reduce(
            (previousValue, currentValue) => previousValue + currentValue.totalRevenue,
            0
        )
        products.push({
            'Tên': 'Tổng',
            'Tổng': this.numberWithCommas(totalProduct),
            'Tổng doanh thu': this.numberWithCommas(totalProductRevenue) + " đ",
        })
        const workSheetProduct = XLSX.utils.json_to_sheet(products)
        XLSX.utils.book_append_sheet(workBook, workSheetProduct, "Sản phẩm")


        //Buffer
        let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" })
        //Binary string
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
        //Download
        XLSX.writeFile(workBook, fileName)
    }

    handleExportData = (
        e,
        statisticUser,
        statisticInvoicedetail,
        statisticCountProduct,
        statisticRevenueProduct,
        statisticBothProduct,
        statisticCountBill,
        billsStateData,
        billsPaymentData
    ) => {
        e.preventDefault()
        this.downloadExcel(
            statisticUser,
            statisticInvoicedetail,
            statisticCountProduct,
            statisticRevenueProduct,
            statisticBothProduct,
            statisticCountBill,
            billsStateData,
            billsPaymentData
        )
    }


    render() {
        // get data
        let bills = this.props.billsRedux
        let invoicedetails = this.props.invoicedetailsRedux
        let users = this.props.users

        //get data by date
        bills = this.getDataByDate(bills)
        invoicedetails = this.getDataByDate(invoicedetails)
        users = this.getDataByDate(users)

        // sort data
        invoicedetails.sort(sortByCreateDateASC)
        users.sort(sortByCreateDateASC)

        //handle data

        let statisticUser = this.calculateUser(users)
        let statisticInvoicedetail = this.calculateInvoicedetail(invoicedetails)
        let statisticCountProduct = this.calculateCountProduct(invoicedetails).sort(sortByTotalDESC)
        let statisticRevenueProduct = this.calculateRevenueProduct(invoicedetails).sort(sortByTotalDESC)
        let statisticBothProduct = this.calculateBothProduct(invoicedetails).sort(sortByTotalDESC)
        let statisticCountBill = this.calculateCountBill(bills)
        let billsStateData = this.calculateBillState(bills)
        let billsPaymentData = this.calculateBillPayment(bills)
        return (
            <div className="statistic-container" >
                <div className="container">
                    <div className="title">
                        Thống kê
                    </div>
                    <div className='date-picker'>
                        <div >
                            <DatePicker onChange={this.handleChangeStartDate} />
                            <div >
                                Ngày bắt đầu: {this.state.startDate ? this.state.startDate : 'None'}
                            </div>
                        </div>
                        <div >
                            <DatePicker onChange={this.handleChangeEndDate} />
                            <div >
                                Ngày kết thúc: {this.state.endDate ? this.state.endDate : 'None'}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="statistic-row m-4">
                    <div className="statistic-col">
                        <div className="card" style={{ backgroundColor: "rgba(23, 162, 184, 0.8)" }}>
                            <h1>{users.length}</h1>
                            <h2>Người dùng</h2>
                        </div>
                    </div>
                    <div className="statistic-col" >
                        <div className="card" style={{ backgroundColor: "rgba(40, 167, 69,  0.8)" }}>
                            <h1>{bills.length}</h1>
                            <h2>Đơn hàng</h2>
                        </div>
                    </div>
                    <div className="statistic-col">
                        <div className="card" style={{ backgroundColor: "rgba(128, 47, 155, 0.8)" }}>
                            <h1>{this.numberWithCommas(statisticInvoicedetail.reduce(
                                (previousValue, currentValue) => previousValue + Math.round(currentValue.total),
                                0
                            ))} đ</h1>
                            <h2>Doanh thu</h2>
                        </div>
                    </div>
                    <div className="statistic-col">
                        <div className="card" style={{ backgroundColor: "rgba(220, 53, 69, 0.8)" }}>
                            <h1>{this.numberWithCommas(statisticCountProduct.reduce(
                                (previousValue, currentValue) => previousValue + Math.round(currentValue.total),
                                0
                            ))}</h1>
                            <h2>Sản phẩm đã bán</h2>
                        </div>
                    </div>
                </div>

                <div className="content-chart">
                    <div className="pie-chart border-shadow">
                        <BillStatusStatisticsChart data={billsStateData} />
                    </div>
                    <div className="pie-chart border-shadow">
                        <BillPaymentStatisticsChart data={billsPaymentData} />
                    </div>
                    <div className="line-chart border-shadow">
                        <LineChart data={{
                            label: 'Đơn hàng',
                            data: statisticCountBill
                        }} />
                    </div>
                    <div className="line-chart border-shadow">
                        <LineChart data={{
                            label: 'Doanh thu',
                            data: statisticInvoicedetail,

                        }} />
                    </div>
                    <div className="line-chart border-shadow">
                        <LineChart data={{
                            label: 'Người dùng mới',
                            data: statisticUser
                        }} />
                    </div>
                    <div className="line-chart border-shadow">
                        <TableTopProduct data={{
                            label: 'Top 10 sản phẩm bán chạy',
                            data: statisticCountProduct.slice(0, 10),
                            type: 0
                        }} />
                    </div>
                    <div className="line-chart border-shadow">
                        <TableTopProduct data={{
                            label: 'Top 10 sản phẩm doanh thu cao',
                            data: statisticRevenueProduct.slice(0, 10),
                            type: 1
                        }} />
                    </div>

                </div>
                <div className="block-export-data"><a href=""
                    onClick={(e) => this.handleExportData(
                        e,
                        statisticUser,
                        statisticInvoicedetail,
                        statisticCountProduct,
                        statisticRevenueProduct,
                        statisticBothProduct,
                        statisticCountBill,
                        billsStateData,
                        billsPaymentData
                    )}
                >Tạo bản báo cáo</a></div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        billsRedux: state.bill.bills,
        invoicedetailsRedux: state.invoicedetail.invoicedetails,
        users: state.user.users,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchBillsRedux: () => dispatch(actions.fetchBillStart()),
        fetchInvoicedetailsRedux: () => dispatch(actions.fetchInvoicedetailStart()),
        fetchAllUsersRedux: () => dispatch(actions.fetchAllUsersStart()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BannerManage);
