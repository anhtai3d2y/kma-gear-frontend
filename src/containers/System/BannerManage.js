import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CRUDActions } from "../../utils";
import './BannerManage.scss';
import TableManageBanner from "./TableManageBanner";
import TableRecycleBinBanner from "./TableRecycleBinBanner";

import { ToastContainer, toast } from 'react-toastify';

import *  as actions from "../../store/actions";

class BannerManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // typeProductArr: [],

            id: '',
            link: '',
            image: '',
            type: 1,

            loadingImage: false,

            action: CRUDActions.CREATE,

            isShowForm: false,
            isOpenRecycleBin: false

        }
        this.scrollTop = React.createRef()
    }

    async componentDidMount() {
        this.props.fetchBannersRedux()
        // this.handleScroll()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // this.handleScroll()

        if (prevProps.bannersRedux !== this.props.bannersRedux) {
            this.setState({
                link: '',
                image: '',
                type: 0,

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

    handleSaveBanner = async () => {
        let isValid = this.checkValidateInput()
        if (isValid) {
            let { action } = this.state

            if (action === CRUDActions.CREATE) {
                //create category
                let newBanner = {
                    link: this.state.link,
                    image: this.state.image,
                    type: this.state.type,
                }
                await this.props.createNewBanner(newBanner)
                toast(`Thêm biển quảng cáo thành công`)
            }
            if (action === CRUDActions.EDIT) {
                //edit category
                await this.props.editBanner({
                    id: this.state.id,
                    link: this.state.link,
                    image: this.state.image,
                    type: this.state.type,
                })
            }
            await this.props.fetchBannersRedux()
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
        let arrCheck = ['link', 'image']
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

    handleEditBannerFromParent = (banner) => {
        this.setState({

            id: banner.id,
            link: banner.link,
            image: banner.image,
            type: banner.type,

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
        let { link, image, type } = this.state
        return (
            <div className="banner-manage-container" >
                <div className="title">
                    Quản lý biển quảng cáo
                </div>
                <div className="banner-manage-body " ref={this.scrollTop}>

                    <div className="container">
                        <div className="row">
                            <div className="col-12 mb-3 btn-show-form"
                                onClick={() => this.handleShowForm()}
                            >
                                <b>{this.state.action === CRUDActions.EDIT ? "Sửa biển quảng cáo" : "Thêm biển quảng cáo"} {this.state.isShowForm ? (<i class="fas fa-caret-up"></i>) : (<i class="fas fa-caret-down"></i>)}</b>
                            </div>
                        </div>
                        {this.state.isShowForm ? (
                            <div>
                                <div className="row">
                                    <div className="col-12">
                                        <label className="mt-1">Link </label>
                                        <input className="form-control" type="text"
                                            value={link}
                                            onChange={(event) => { this.onChangeInput(event, 'link') }}
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
                                        ) : (<div className="banner-image mt-4 mb-4">
                                            <img src={image} />
                                        </div>)}
                                    </div>
                                    <div className="col-12">
                                        <label className="mt-1">Loại</label>
                                        <select id="" class="form-control"
                                            onChange={(event) => { this.onChangeInput(event, 'type') }}
                                            value={type}
                                        >
                                            <option key={0} value={0}>Biển lớn</option>
                                            <option key={1} value={1}>Biển nhỏ</option>
                                        </select>
                                    </div>
                                    <div className="col-12 my-3">
                                        <button type="button" class={this.state.action === CRUDActions.EDIT ? "btn btn-primary" : "btn btn-success"}
                                            onClick={() => { this.handleSaveBanner() }}
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
                        (<TableRecycleBinBanner
                            action={this.state.action}
                        />) :
                        (<TableManageBanner
                            handleEditBannerFromParent={this.handleEditBannerFromParent}
                            action={this.state.action}
                        />)}
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        bannersRedux: state.banner.banners
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchBannersRedux: () => dispatch(actions.fetchBannerStart()),
        createNewBanner: (data) => dispatch(actions.createNewBanner(data)),
        editBanner: (data) => dispatch(actions.editBanner(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BannerManage);
