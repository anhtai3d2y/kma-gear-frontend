import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CRUDActions } from "../../utils";
import './ProductTypeManage.scss';
import TableManageProductType from "./TableManageProductType";
import TableRecycleBinProductType from "./TableRecycleBinProductType";

import { ToastContainer, toast } from 'react-toastify';

import *  as actions from "../../store/actions";

class ProductTypeManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categoryArr: [],

            id: '',
            typeName: '',
            categoryId: 0,

            action: CRUDActions.CREATE,

            isShowForm: false,
            isOpenRecycleBin: false

        }
        this.scrollTop = React.createRef()
    }

    async componentDidMount() {
        this.props.fetchCategorysRedux()
        this.handleScroll()

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.handleScroll()
        if (prevProps.categorysRedux !== this.props.categorysRedux) {
            let arrCategorys = this.props.categorysRedux
            this.setState({
                categoryArr: arrCategorys,
                categoryId: arrCategorys && arrCategorys.length > 0 ? arrCategorys[0].id : ''
            })
        }

        if (prevProps.producttypesRedux !== this.props.producttypesRedux) {
            let arrCategorys = this.props.categorysRedux

            this.setState({
                typeName: '',
                categoryId: arrCategorys && arrCategorys.length > 0 ? arrCategorys[0].id : '',

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

    handleSaveProduct = async () => {
        let isValid = this.checkValidateInput()
        if (isValid) {
            let { action } = this.state
            if (action === CRUDActions.CREATE) {
                //create producttype
                let newProducttype = {
                    typeName: this.state.typeName,
                    categoryId: this.state.categoryId
                }
                await this.props.createNewProducttype(newProducttype)
                toast(`Thêm loại sản phẩm ${newProducttype.typeName} thành công`)
            }
            if (action === CRUDActions.EDIT) {
                //edit producttype
                await this.props.editProducttypeRedux({
                    id: this.state.id,
                    typeName: this.state.typeName,
                    categoryId: this.state.categoryId
                })
            }

            await this.props.fetchfetchProducttypeRedux()
        }
    }

    checkValidateInput = () => {
        let isValid = true
        let arrCheck = ['typeName']
        let arrMessage = ['Loại sản phẩm']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false
                toast.error(`Bạn đang để trống ${arrMessage[i]}`)
                return isValid
            }
        }
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

    handleEditProductTypeFromParent = (producttype) => {
        this.setState({

            id: producttype.id,
            typeName: producttype.typeName,
            categoryId: producttype.categoryId,

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

        let { typeName, categoryId } = this.state
        let categorys = this.state.categoryArr

        return (
            <div className="producttype-manage-container" >
                <div className="title">
                    Quản loại lý sản phẩm
                </div>
                <div className="producttype-manage-body " ref={this.scrollTop}>

                    <div className="container">
                        <div className="row">
                            <div className="col-12 mb-3 btn-show-form"
                                onClick={() => this.handleShowForm()}
                            >
                                <b>Thêm loại sản phẩm {this.state.isShowForm ? (<i class="fas fa-caret-up"></i>) : (<i class="fas fa-caret-down"></i>)}</b>
                            </div>
                        </div>
                        {this.state.isShowForm ? (
                            <div>
                                <div className="row">
                                    <div className="col-12">
                                        <label className="mt-1">Loại sản phẩm</label>
                                        <input className="form-control" type="text"
                                            value={typeName}
                                            onChange={(event) => { this.onChangeInput(event, 'typeName') }}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className="mt-1">Danh mục</label>
                                        <select id="" class="form-control"
                                            onChange={(event) => { this.onChangeInput(event, 'categoryId') }}
                                            value={categoryId}
                                        >
                                            {categorys && categorys.length > 0 &&
                                                categorys.map((category, index) => {
                                                    return (
                                                        <option key={category.id} value={category.id}>{category.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-12 my-3">
                                        <button type="button" class={this.state.action === CRUDActions.EDIT ? "btn btn-primary" : "btn btn-success"}
                                            onClick={() => { this.handleSaveProduct() }}
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
                        (<TableRecycleBinProductType
                            action={this.state.action}
                        />) :
                        (<TableManageProductType
                            handleEditProductTypeFromParent={this.handleEditProductTypeFromParent}
                            action={this.state.action}
                        />)}
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        categorysRedux: state.category.categorys,
        producttypesRedux: state.producttype.types
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchfetchProducttypeRedux: () => dispatch(actions.fetchProducttypeStart()),
        fetchCategorysRedux: () => dispatch(actions.fetchCategoryStart()),
        createNewProducttype: (data) => dispatch(actions.createNewProducttype(data)),
        editProducttypeRedux: (data) => dispatch(actions.editProducttype(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductTypeManage);
