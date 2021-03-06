import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CRUDActions } from "../../utils";
import './BannerManage.scss';
import TableManageBanner from "./TableManageBanner";
import TableRecycleBinBanner from "./TableRecycleBinBanner";
import { debounce } from 'lodash';

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
            isOpenRecycleBin: false,
            searchInfo: '',


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
                toast(`Th??m bi???n qu???ng c??o th??nh c??ng`)
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
        let arrMessage = ['T??n danh m???c', 'H??nh ???nh']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false
                toast.error(`B???n ??ang ????? tr???ng ${arrMessage[i]}`)
                return isValid
            }
        }
        // toast('L??u s???n ph???m th??nh c??ng')
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

    handleChangeSearchBox = (value) => {
        this.setState({
            searchInfo: value
        })
        if (value !== "") {
            this.handleSearchBanners(value)
        } else {
            this.props.fetchBannersRedux()
        }
    }

    handleSearchBanners = debounce((value) => {
        this.props.fetchSearchBannerRedux(value)
    }, 100)


    render() {
        let { link, image, type } = this.state
        console.log(this.props.bannersRedux)
        return (
            <div className="banner-manage-container" >
                <div className="title">
                    Qu???n l?? bi???n qu???ng c??o
                </div>
                <div className="banner-manage-body " ref={this.scrollTop}>

                    <div className="container">
                        <div className="row">
                            <div className="col-12 mb-3 btn-show-form"
                                onClick={() => this.handleShowForm()}
                            >
                                <b>{this.state.action === CRUDActions.EDIT ? "S???a bi???n qu???ng c??o" : "Th??m bi???n qu???ng c??o"} {this.state.isShowForm ? (<i class="fas fa-caret-up"></i>) : (<i class="fas fa-caret-down"></i>)}</b>
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
                                        <label className="mt-1">H??nh ???nh</label>
                                        <input className="form-control" type="text"
                                            value={image}
                                            onChange={(event) => { this.onChangeInput(event, 'image') }}
                                        />
                                        <input type="file"
                                            name="file"
                                            placeholder="Ch???n h??nh ???nh cho nh??n h??ng"
                                            onChange={(event) => this.uploadImage(event)}
                                        />
                                        {this.loadingImage ? (
                                            <label>??ang t???i h??nh ???nh</label>
                                        ) : (<div className="banner-image mt-4 mb-4">
                                            <img src={image} />
                                        </div>)}
                                    </div>
                                    <div className="col-12">
                                        <label className="mt-1">Lo???i</label>
                                        <select id="" class="form-control"
                                            onChange={(event) => { this.onChangeInput(event, 'type') }}
                                            value={type}
                                        >
                                            <option key={0} value={0}>Bi???n l???n</option>
                                            <option key={1} value={1}>Bi???n nh???</option>
                                        </select>
                                    </div>
                                    <div className="col-12 my-3">
                                        <button type="button" class={this.state.action === CRUDActions.EDIT ? "btn btn-primary" : "btn btn-success"}
                                            onClick={() => { this.handleSaveBanner() }}
                                        >{this.state.action === CRUDActions.EDIT ? "L??u" : "Th??m"}</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                    <div className="mb-4 ml-4 btn-go-recyclebin"
                        onClick={() => { this.handleOpenRecycleBin() }}>{this.state.isOpenRecycleBin ? (<div><i i className="fas fa-caret-left"></i> Quay l???i</div>) : (<div><i className="fas fa-trash"></i> Th??ng r??c</div>)}
                    </div>
                    <input type="text" className="mb-4 ml-4 col-6" name="search" autocomplete="off" placeholder="Nh???p th??ng tin c???n t??m ..."
                        value={this.state.searchInfo}
                        onChange={(e) => this.handleChangeSearchBox(e.target.value)}
                    />
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
        fetchSearchBannerRedux: (key) => dispatch(actions.fetchSearchBannerStart(key)),
        createNewBanner: (data) => dispatch(actions.createNewBanner(data)),
        editBanner: (data) => dispatch(actions.editBanner(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BannerManage);
