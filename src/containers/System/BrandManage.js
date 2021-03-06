import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CRUDActions } from "../../utils";
import './BrandManage.scss';
import TableManageBrand from "./TableManageBrand";
import TableRecycleBinBrand from "./TableRecycleBinBrand";
import { debounce } from 'lodash';

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
            isOpenRecycleBin: false,
            searchInfo: '',

        }
        this.scrollTop = React.createRef()
    }

    async componentDidMount() {
        this.props.fetchBrandsRedux()
        // this.handleScroll()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // this.handleScroll()

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
                toast(`Th??m nh??n h??ng ${newBrand.name} th??nh c??ng`)
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

    handleChangeSearchBox = (value) => {
        this.setState({
            searchInfo: value
        })
        if (value !== "") {
            this.handleSearchBrands(value)
        } else {
            this.props.fetchBrandsRedux()
        }
    }

    handleSearchBrands = debounce((value) => {
        this.props.fetchSearchBrandRedux(value)
    }, 100)

    render() {
        let { name, image } = this.state
        return (
            <div className="brand-manage-container" >
                <div className="title">
                    Qu???n l?? nh??n h??ng
                </div>
                <div className="brand-manage-body " ref={this.scrollTop}>

                    <div className="container">
                        <div className="row">
                            <div className="col-12 mb-3 btn-show-form"
                                onClick={() => this.handleShowForm()}
                            >
                                <b>{this.state.action === CRUDActions.EDIT ? "S???a nh??n h??ng" : "Th??m nh??n h??ng"} {this.state.isShowForm ? (<i class="fas fa-caret-up"></i>) : (<i class="fas fa-caret-down"></i>)}</b>
                            </div>
                        </div>
                        {this.state.isShowForm ? (
                            <div>
                                <div className="row">
                                    <div className="col-12">
                                        <label className="mt-1">T??n nh??n h??ng </label>
                                        <input className="form-control" type="text"
                                            value={name}
                                            onChange={(event) => { this.onChangeInput(event, 'name') }}
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
                                        ) : (<div className="brand-image mt-4 mb-4">
                                            <img src={image} />
                                        </div>)}

                                    </div>
                                    <div className="col-12 my-3">
                                        <button type="button" class={this.state.action === CRUDActions.EDIT ? "btn btn-primary" : "btn btn-success"}
                                            onClick={() => { this.handleSaveBrand() }}
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
        fetchSearchBrandRedux: (key) => dispatch(actions.fetchSearchBrandStart(key)),
        createNewBrand: (data) => dispatch(actions.createNewBrand(data)),
        editBrand: (data) => dispatch(actions.editBrand(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandManage);
