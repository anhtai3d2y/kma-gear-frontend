import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CRUDActions } from "../../utils";
import './ProductTypeManage.scss';
import TableManageProductType from "./TableManageProductType";
import TableRecycleBinProductType from "./TableRecycleBinProductType";
import { debounce } from 'lodash';

import { ToastContainer, toast } from 'react-toastify';

import *  as actions from "../../store/actions";

class ProductTypeManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categoryArr: [],

            id: '',
            typeName: '',
            CategoryId: 0,

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
            let arrCategorys = this.props.categorysRedux
            this.setState({
                categoryArr: arrCategorys,
                CategoryId: arrCategorys && arrCategorys.length > 0 ? arrCategorys[0].id : ''
            })
        }

        if (prevProps.producttypesRedux !== this.props.producttypesRedux) {
            let arrCategorys = this.props.categorysRedux

            this.setState({
                typeName: '',
                CategoryId: arrCategorys && arrCategorys.length > 0 ? arrCategorys[0].id : '',

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
                    CategoryId: this.state.CategoryId
                }
                await this.props.createNewProducttype(newProducttype)
                toast(`Th??m lo???i s???n ph???m ${newProducttype.typeName} th??nh c??ng`)
            }
            if (action === CRUDActions.EDIT) {
                //edit producttype
                await this.props.editProducttypeRedux({
                    id: this.state.id,
                    typeName: this.state.typeName,
                    CategoryId: this.state.CategoryId
                })
            }

            await this.props.fetchProducttypeRedux()
        }
    }

    checkValidateInput = () => {
        let isValid = true
        let arrCheck = ['typeName']
        let arrMessage = ['Lo???i s???n ph???m']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false
                toast.error(`B???n ??ang ????? tr???ng ${arrMessage[i]}`)
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
            CategoryId: producttype.CategoryId,

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
            this.handleSearchProducttypes(value)
        } else {
            this.props.fetchProducttypeRedux()
        }
    }

    handleSearchProducttypes = debounce((value) => {
        this.props.fetchSearchProducttypeRedux(value)
    }, 100)

    render() {

        let { typeName, CategoryId } = this.state
        let categorys = this.state.categoryArr

        return (
            <div className="producttype-manage-container" >
                <div className="title">
                    Qu???n lo???i l?? s???n ph???m
                </div>
                <div className="producttype-manage-body " ref={this.scrollTop}>

                    <div className="container">
                        <div className="row">
                            <div className="col-12 mb-3 btn-show-form"
                                onClick={() => this.handleShowForm()}
                            >
                                <b>Th??m lo???i s???n ph???m {this.state.isShowForm ? (<i class="fas fa-caret-up"></i>) : (<i class="fas fa-caret-down"></i>)}</b>
                            </div>
                        </div>
                        {this.state.isShowForm ? (
                            <div>
                                <div className="row">
                                    <div className="col-12">
                                        <label className="mt-1">Lo???i s???n ph???m</label>
                                        <input className="form-control" type="text"
                                            value={typeName}
                                            onChange={(event) => { this.onChangeInput(event, 'typeName') }}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className="mt-1">Danh m???c</label>
                                        <select id="" class="form-control"
                                            onChange={(event) => { this.onChangeInput(event, 'CategoryId') }}
                                            value={CategoryId}
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
                                        >{this.state.action === CRUDActions.EDIT ? "L??u" : "Th??m"}</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                    <div className="mb-4 ml-4 btn-go-recyclebin col-6"
                        onClick={() => { this.handleOpenRecycleBin() }}>{this.state.isOpenRecycleBin ? (<div><i i className="fas fa-caret-left"></i> Quay l???i</div>) : (<div><i className="fas fa-trash"></i> Th??ng r??c</div>)}
                    </div>
                    <input type="text" className="mb-4 ml-4 col-6" name="search" autocomplete="off" placeholder="Nh???p th??ng tin c???n t??m ..."
                        value={this.state.searchInfo}
                        onChange={(e) => this.handleChangeSearchBox(e.target.value)}
                    />
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
        fetchProducttypeRedux: () => dispatch(actions.fetchProducttypeStart()),
        fetchCategorysRedux: () => dispatch(actions.fetchCategoryStart()),
        createNewProducttype: (data) => dispatch(actions.createNewProducttype(data)),
        editProducttypeRedux: (data) => dispatch(actions.editProducttype(data)),
        fetchSearchProducttypeRedux: (key) => dispatch(actions.fetchSearchProducttypeStart(key)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductTypeManage);
