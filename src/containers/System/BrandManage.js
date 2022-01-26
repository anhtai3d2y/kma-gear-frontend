import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CRUDActions } from "../../utils";
import './BrandManage.scss';
import TableManageBrand from "./TableManageBrand";
import TableRecycleBinBrand from "./TableRecycleBinBrand";

import { ToastContainer, toast } from 'react-toastify';

import *  as actions from "../../store/actions";

class BrandManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // typeProductArr: [],

            id: '',
            name: '',
            image: '',

            loadingImage: false,

            action: CRUDActions.CREATE,

            isShowForm: false,
            isOpenRecycleBin: false

        }
        this.scrollTop = React.createRef()
    }

    async componentDidMount() {
        this.props.fetchBrandsRedux()
        // this.handleScroll()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.handleScroll()

        if (prevProps.brandsRedux !== this.props.brandsRedux) {
            this.setState({
                name: '',
                image: '',

                action: CRUDActions.CREATE,

                isShowForm: false
            })
        }
    }

    handleScroll = () => {
        const { index, selected } = this.props
        if (index === selected) {
            setTimeout(() => {
                this.scrollTop.current.scrollIntoView({ behavior: 'smooth' })
            }, 200)
        }
    }

    handleSaveBrand = async () => {
        let isValid = this.checkValidateInput()
        if (isValid) {
            let { action } = this.state

            if (action === CRUDActions.CREATE) {
                //create category
                console.log('create')
                let newBrand = {
                    name: this.state.name,
                    image: this.state.image,
                }
                await this.props.createNewBrand(newBrand)
                toast(`Thêm nhãn hàng ${newBrand.name} thành công`)
            }
            if (action === CRUDActions.EDIT) {
                //edit category
                await this.props.editBrand({
                    id: this.state.id,
                    name: this.state.name,
                    image: this.state.image,
                })
            }
            await this.props.fetchBrandsRedux()
        }
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
        let isValid = true
        let arrCheck = ['name', 'image']
        let arrMessage = ['Tên danh mục', 'Hình ảnh']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false
                toast.error(`Bạn đang để trống ${arrMessage[i]}`)
                return isValid
            }
        }
        // toast('Lưu sản phẩm thành công')
        return isValid
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

    handleEditBrandFromParent = (category) => {
        this.setState({

            id: category.id,
            name: category.name,
            image: category.image,

            action: CRUDActions.EDIT,

            isShowForm: true
        })
    }

    handleOpenRecycleBin = () => {
        this.setState({
            isOpenRecycleBin: !this.state.isOpenRecycleBin
        })
    }

    render() {


        let { name, image } = this.state
        return (
            <div className="brand-manage-container" >
                <div className="title">
                    Quản lý nhãn hàng
                </div>
                <div className="brand-manage-body " ref={this.scrollTop}>

                    <div className="container">
                        <div className="row">
                            <div className="col-12 mb-3 btn-show-form"
                                onClick={() => this.handleShowForm()}
                            >
                                <b>{this.state.action === CRUDActions.EDIT ? "Sửa nhãn hàng" : "Thêm nhãn hàng"} {this.state.isShowForm ? (<i class="fas fa-caret-up"></i>) : (<i class="fas fa-caret-down"></i>)}</b>
                            </div>
                        </div>
                        {this.state.isShowForm ? (
                            <div>
                                <div className="row">
                                    <div className="col-12">
                                        <label className="mt-1">Tên nhãn hàng </label>
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
                                            placeholder="Chọn hình ảnh cho nhãn hàng"
                                            onChange={(event) => this.uploadImage(event)}
                                        />
                                        {this.loadingImage ? (
                                            <label>Đang tải hình ảnh</label>
                                        ) : (<div className="brand-image mt-4 mb-4">
                                            <img src={image} />
                                        </div>)}

                                    </div>
                                    <div className="col-12 my-3">
                                        <button type="button" class={this.state.action === CRUDActions.EDIT ? "btn btn-primary" : "btn btn-success"}
                                            onClick={() => { this.handleSaveBrand() }}
                                        >{this.state.action === CRUDActions.EDIT ? "Lưu" : "Thêm"}</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                    <div className="mb-4 ml-4 btn-go-recyclebin"
                        onClick={() => { this.handleOpenRecycleBin() }}>{this.state.isOpenRecycleBin ? (<div><i i className="fas fa-caret-left"></i> Quay lại</div>) : (<div><i className="fas fa-trash"></i> Thùng rác</div>)}
                    </div>
                    {this.state.isOpenRecycleBin ?
                        (<TableRecycleBinBrand
                            action={this.state.action}
                        />) :
                        (<TableManageBrand
                            handleEditBrandFromParent={this.handleEditBrandFromParent}
                            action={this.state.action}
                        />)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        brandsRedux: state.brand.brands
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchBrandsRedux: () => dispatch(actions.fetchBrandStart()),
        createNewBrand: (data) => dispatch(actions.createNewBrand(data)),
        editBrand: (data) => dispatch(actions.editBrand(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandManage);
