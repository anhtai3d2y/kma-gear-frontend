import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CRUDActions } from "../../utils";
import './CategoryManage.scss';
import TableManageCategory from "./TableManageCategory";
import TableRecycleBinCategory from "./TableRecycleBinCategory";
import { debounce } from 'lodash';

import { ToastContainer, toast } from 'react-toastify';

import *  as actions from "../../store/actions";

class CategoryManage extends Component {

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
        this.props.fetchCategorysRedux()
        // this.handleScroll()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // this.handleScroll()

        if (prevProps.categorysRedux !== this.props.categorysRedux) {
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

    handleSaveCategory = async () => {
        let isValid = this.checkValidateInput()
        if (isValid) {
            let { action } = this.state

            if (action === CRUDActions.CREATE) {
                //create category
                console.log('create')
                let newCategory = {
                    name: this.state.name,
                    image: this.state.image,
                }
                await this.props.createNewCategory(newCategory)
                toast(`Thêm danh mục ${newCategory.name} thành công`)
            }
            if (action === CRUDActions.EDIT) {
                //edit category
                await this.props.editCategory({
                    id: this.state.id,
                    name: this.state.name,
                    image: this.state.image,
                })
            }
            await this.props.fetchCategorysRedux()
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

    handleEditCategoryFromParent = (category) => {
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
            this.handleSearchCategorys(value)
        } else {
            this.props.fetchCategorysRedux()
        }
    }

    handleSearchCategorys = debounce((value) => {
        this.props.fetchSearchCategoryRedux(value)
    }, 100)

    render() {
        let { name, image } = this.state
        return (
            <div className="category-manage-container" >
                <div className="title">
                    Quản lý danh mục
                </div>
                <div className="category-manage-body " ref={this.scrollTop}>

                    <div className="container">
                        <div className="row">
                            <div className="col-12 mb-3 btn-show-form"
                                onClick={() => this.handleShowForm()}
                            >
                                <b>{this.state.action === CRUDActions.EDIT ? "Sửa danh mục" : "Thêm danh mục"} {this.state.isShowForm ? (<i class="fas fa-caret-up"></i>) : (<i class="fas fa-caret-down"></i>)}</b>
                            </div>
                        </div>
                        {this.state.isShowForm ? (
                            <div>
                                <div className="row">
                                    <div className="col-12">
                                        <label className="mt-1">Tên danh mục </label>
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
                                            placeholder="Chọn hình ảnh cho danh mục"
                                            onChange={(event) => this.uploadImage(event)}
                                        />
                                        {this.loadingImage ? (
                                            <label>Đang tải hình ảnh</label>
                                        ) : (<div className="category-image mt-4 mb-4">
                                            <img src={image} />
                                        </div>)}

                                    </div>
                                    <div className="col-12 my-3">
                                        <button type="button" class={this.state.action === CRUDActions.EDIT ? "btn btn-primary" : "btn btn-success"}
                                            onClick={() => { this.handleSaveCategory() }}
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
                    <input type="text" className="mb-4 ml-4 col-6" name="search" autocomplete="off" placeholder="Nhập thông tin cần tìm ..."
                        value={this.state.searchInfo}
                        onChange={(e) => this.handleChangeSearchBox(e.target.value)}
                    />
                    {this.state.isOpenRecycleBin ?
                        (<TableRecycleBinCategory
                            action={this.state.action}
                        />) :
                        (<TableManageCategory
                            handleEditCategoryFromParent={this.handleEditCategoryFromParent}
                            action={this.state.action}
                        />)}
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        categorysRedux: state.category.categorys
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchCategorysRedux: () => dispatch(actions.fetchCategoryStart()),
        createNewCategory: (data) => dispatch(actions.createNewCategory(data)),
        editCategory: (data) => dispatch(actions.editCategory(data)),
        fetchSearchCategoryRedux: (key) => dispatch(actions.fetchSearchCategoryStart(key)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryManage);
