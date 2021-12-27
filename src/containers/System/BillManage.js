import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CRUDActions } from "../../utils";
import './BillManage.scss';
import TableManageBill from "./TableManageBill";

import { ToastContainer, toast } from 'react-toastify';
import *  as actions from "../../store/actions";


class BillManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // typeBillArr: [],
            // brandArr: [],

            // id: '',
            // name: '',
            // image: '',
            // descriptionHTML: '',
            // descriptionMarkdown: '',
            // billtype: '',
            // brand: '',
            // amount: 0,
            // price: 0,
            // discount: 0,

            loadingImage: false,

            action: CRUDActions.CREATE,

            isShowForm: false
        }
        this.scrollTop = React.createRef()
    }

    async componentDidMount() {
        this.props.fetchBillsRedux()
        // this.handleScroll()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // this.handleScroll()
        // if (prevProps.typesRedux !== this.props.typesRedux) {
        //     let arrTypes = this.props.typesRedux
        //     this.setState({
        //         typeBillArr: arrTypes,
        //         billtype: arrTypes && arrTypes.length > 0 ? arrTypes[0].id : ''
        //     })
        // }
        // if (prevProps.brandsRedux !== this.props.brandsRedux) {
        //     let arrBrands = this.props.brandsRedux
        //     this.setState({
        //         brandArr: arrBrands,
        //         brand: arrBrands && arrBrands.length > 0 ? arrBrands[0].id : ''
        //     })
        // }

        // if (prevProps.bills !== this.props.bills) {
        //     let arrTypes = this.props.typesRedux
        //     let arrBrands = this.props.brandsRedux

        //     this.setState({
        //         name: '',
        //         image: '',
        //         descriptionHTML: '',
        //         descriptionMarkdown: '',
        //         billtype: arrTypes && arrTypes.length > 0 ? arrTypes[0].id : '',
        //         brand: arrBrands && arrBrands.length > 0 ? arrBrands[0].id : '',
        //         amount: 0,
        //         price: 0,
        //         discount: 0,

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
            }, 500)
        }
    }

    handleSaveBill = async () => {
        // let isValid = this.checkValidateInput()
        // if (isValid) {
        //     let { action } = this.state

        //     if (action === CRUDActions.CREATE) {
        //         //create bill
        //         let newBill = {
        //             name: this.state.name,
        //             image: this.state.image,
        //             descriptionHTML: this.state.descriptionHTML,
        //             descriptionMarkdown: this.state.descriptionMarkdown,
        //             typeId: Number(this.state.billtype),
        //             brandId: Number(this.state.brand),
        //             amount: Number(this.state.amount),
        //             price: Number(this.state.price),
        //             discount: Number(this.state.discount),
        //         }
        //         await this.props.createNewBill(newBill)
        //         toast(`Thêm sản phẩm ${newBill.name} thành công`)
        //     }
        //     if (action === CRUDActions.EDIT) {
        //         //edit bill
        //         await this.props.editBillRedux({
        //             id: this.state.id,
        //             name: this.state.name,
        //             image: this.state.image,
        //             descriptionHTML: this.state.descriptionHTML,
        //             descriptionMarkdown: this.state.descriptionMarkdown,
        //             typeId: Number(this.state.billtype),
        //             brandId: Number(this.state.brand),
        //             amount: Number(this.state.amount),
        //             price: Number(this.state.price),
        //             discount: Number(this.state.discount),
        //         })
        //     }
        //     await this.props.fetchBillsRedux()
        // }
    }

    uploadImage = async (event) => {
        let files = event.target.files
        let data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'kma_gear')
        this.setState({
            loadingImage: true
        })
        let res = await fetch(
            'https://api.cloudinary.com/v1_1/dbammxapd/image/upload',
            {
                method: 'POST',
                body: data
            }
        )
        let file = await res.json()
        this.setState({
            image: file.secure_url,
            loadingImage: false
        })
    }

    checkValidateInput = () => {
        // let isValid = true
        // let arrCheck = ['name', 'image', 'amount', 'price', 'discount']
        // let arrMessage = ['Tên sản phẩm', 'Hình ảnh', 'Số lượng', 'Giá', 'Chiết khấu']
        // for (let i = 0; i < arrCheck.length; i++) {
        //     if (!this.state[arrCheck[i]]) {
        //         if (arrCheck[i] !== 'discount') {
        //             isValid = false
        //             toast.error(`Bạn đang để trống ${arrMessage[i]}`)
        //             return isValid
        //         } else {
        //             if (this.state[arrCheck[i]] === '') {
        //                 isValid = false
        //                 toast.error(`Bạn đang để trống ${arrMessage[i]}`)
        //                 return isValid
        //             }
        //         }
        //     }
        // }
        // // toast('Lưu sản phẩm thành công')
        // return isValid
    }

    handleShowForm = () => {
        this.setState({
            isShowForm: !this.state.isShowForm
        })
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value

        this.setState({
            ...copyState
        })
    }

    handleEditBillFromParent = (bill) => {
        // this.setState({

        //     id: bill.id,
        //     name: bill.name,
        //     image: bill.image,
        //     descriptionHTML: bill.descriptionHTML,
        //     descriptionMarkdown: bill.descriptionMarkdown,
        //     billtype: bill.typeId,
        //     brand: bill.brandId,
        //     amount: bill.amount,
        //     price: bill.price,
        //     discount: bill.discount,

        //     action: CRUDActions.EDIT,

        //     isShowForm: true
        // })
    }

    render() {

        // console.log('fetch bill: ', this.props.billsRedux)
        // let { name, image, billtype, brand, amount, price, discount } = this.state
        return (
            <div className="bill-manage-container" >
                <div className="title">
                    Quản lý đơn hàng
                </div>
                <div className="bill-manage-body " ref={this.scrollTop}>
                    {/* 
                    <div className="container">
                        <div className="row">
                            <div className="col-12 mb-3 btn-show-form"
                                onClick={() => this.handleShowForm()}
                            >
                                <b>{this.state.action === CRUDActions.EDIT ? "Sửa hóa đơn" : "Thêm hóa đơn"} {this.state.isShowForm ? (<i class="fas fa-caret-up"></i>) : (<i class="fas fa-caret-down"></i>)}</b>
                            </div>
                        </div>
                        {this.state.isShowForm ? (
                            <div>
                                <div className="row">
                                    <div className="col-12">
                                        <label className="mt-1">Tên sản phẩm</label>
                                        <input className="form-control" type="text"
                                            value={name}
                                            onChange={(event) => { this.onChangeInput(event, 'name') }}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className="mt-1">Hình ảnh</label>
                                        <input className="form-control" type="text"
                                            value={image}
                                            onChange={(event) => { this.onChangeInput(event, 'image') }}
                                        />
                                        <input type="file"
                                            name="file"
                                            placeholder="Chọn hình ảnh cho sản phẩm"
                                            onChange={(event) => this.uploadImage(event)}
                                        />
                                        {this.loadingImage ? (
                                            <label>Đang tải hình ảnh</label>
                                        ) : (<div className="bill-image mt-4 mb-4">
                                            <img src={image} />
                                        </div>)}

                                    </div>
                                    <div className="col-6">
                                        <label className="mt-1">Loại sản phẩm</label>
                                        <select id="" class="form-control"
                                            onChange={(event) => { this.onChangeInput(event, 'billtype') }}
                                            value={billtype}
                                        >
                                            {types && types.length > 0 &&
                                                types.map((type, index) => {
                                                    return (
                                                        <option key={type.id} value={type.id}>{type.typeName}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-6">
                                        <label className="mt-1">Thương hiệu</label>
                                        <select id="" class="form-control"
                                            onChange={(event) => { this.onChangeInput(event, 'brand') }}
                                            value={brand}
                                        >
                                            {brands && brands.length > 0 &&
                                                brands.map((brand, index) => {
                                                    return (
                                                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-4">
                                        <label className="mt-1">Số lượng</label>
                                        <input className="form-control" type="text"
                                            value={amount}
                                            onChange={(event) => { this.onChangeInput(event, 'amount') }}
                                        />
                                    </div>
                                    <div className="col-4">
                                        <label className="mt-1">Giá</label>
                                        <input className="form-control" type="text"
                                            value={price}
                                            onChange={(event) => { this.onChangeInput(event, 'price') }}
                                        />
                                    </div>
                                    <div className="col-4">
                                        <label className="mt-1">Chiết khấu</label>
                                        <input className="form-control" type="text"
                                            value={discount}
                                            onChange={(event) => { this.onChangeInput(event, 'discount') }}
                                        />
                                    </div>
                                    <div className="col-12 my-3">
                                        <button type="button" class={this.state.action === CRUDActions.EDIT ? "btn btn-primary" : "btn btn-success"}
                                            onClick={() => { this.handleSaveBill() }}
                                        >{this.state.action === CRUDActions.EDIT ? "Lưu" : "Thêm"}</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div> */}
                    <TableManageBill
                        handleEditBillFromParent={this.handleEditBillFromParent}
                        action={this.state.action}
                    />
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        billsRedux: state.bill.bills
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchBillsRedux: () => dispatch(actions.fetchBillStart()),

        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BillManage);
