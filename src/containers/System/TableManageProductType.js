import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageProduct.scss';
import { ToastContainer, toast } from 'react-toastify';
import *  as actions from "../../store/actions";
import {
    sortByCreateDateDESC,
    sortByIdASC,
    sortByIdDESC,
    sortByTypenameASC,
    sortByTypenameDESC,
} from '../../utils/SortUtils.js';

class TableManageProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            producttypes: [],
            selectedCategory: -1,
            sortBy: 1,

        }
    }

    componentDidMount() {
        this.props.fetchProducttypesRedux()
        this.props.fetchCategorysRedux()

    }

    componentDidUpdate(prevState, prevProps) {
        if (prevProps.producttypes !== this.props.producttypes) {
            this.setState({
                producttypes: this.props.producttypes
            })
        }
    }

    handleEditProducttype = (producttype) => {
        this.props.handleEditProductTypeFromParent(producttype)
    }

    handleDeleteProducttype = async (producttype) => {
        await this.props.deleteProducttype(producttype.id)
        await this.props.fetchProducttypesRedux()
    }

    handleSortBy = (key) => {
        let keyId
        switch (key) {
            case 'id':
                if (this.state.sortBy === 2) {
                    keyId = 3
                } else {
                    keyId = 2
                }
                break;
            case 'typeName':
                if (this.state.sortBy === 4) {
                    keyId = 5
                } else {
                    keyId = 4
                }
                break;
            default:
                break;
        }
        this.setState({
            sortBy: keyId
        })
    }

    sort = (arrProducts) => {
        switch (this.state.sortBy) {
            case 1:
                arrProducts.sort(sortByCreateDateDESC)
                break;
            case 2:
                arrProducts.sort(sortByIdASC)
                break;
            case 3:
                arrProducts.sort(sortByIdDESC)
                break;
            case 4:
                arrProducts.sort(sortByTypenameASC)
                break;
            case 5:
                arrProducts.sort(sortByTypenameDESC)
                break;

            default:
                break;
        }
        return arrProducts
    }

    handleChangeSelectedCategory = (e) => {
        this.setState({
            selectedCategory: Number(e.target.value)
        })
    }

    selectedCategory = (arr) => {
        if (this.state.selectedCategory !== -1) {
            let newArr = []
            arr.forEach(value => {
                if (value.CategoryId === this.state.selectedCategory) {
                    newArr.push(value)
                }
            })
            arr = newArr
        }
        return arr
    }

    render() {
        let arrProducttypes = this.state.producttypes
        let arrCategorys = this.props.categorysRedux
        arrProducttypes = this.selectedCategory(arrProducttypes)
        arrProducttypes = this.sort(arrProducttypes)

        return (
            < div className="producttype-container" >
                <select id="input-sort" className="mb-4 ml-4 col-2"
                    onChange={(e) => this.handleChangeSelectedCategory(e)}
                >

                    <option value="-1">Danh mục (Tất cả)</option>
                    {arrCategorys && arrCategorys.length > 0 &&
                        arrCategorys.map((category, index) => {
                            return (<option value={category.id}>{category.name}</option>)
                        })
                    }
                </select>
                <table className="table table-hover table table-bordered table-striped mb-0">
                    <thead className="">
                        <tr>
                            <th scope="col"
                                style={{ cursor: "pointer", color: (this.state.sortBy === 2 || this.state.sortBy === 3 ? ("#339af0") : ("black")) }}
                                onClick={() => this.handleSortBy('id')}
                            >ID <i className="fas fa-sort"></i></th>
                            <th scope="col"
                                style={{ cursor: "pointer", color: (this.state.sortBy === 4 || this.state.sortBy === 5 ? ("#339af0") : ("black")) }}
                                onClick={() => this.handleSortBy('typeName')}
                            >Loại sản phẩm <i className="fas fa-sort"></i></th>
                            <th scope="col">Danh mục</th>
                            <th scope="col" colspan="2">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {arrProducttypes && arrProducttypes.length > 0 &&
                            arrProducttypes.map((producttype, index) => {
                                return (
                                    <tr >
                                        <th scope="row">{producttype.id}</th>
                                        <td>{producttype.typeName}</td>
                                        <td>{producttype.Category.name}</td>
                                        <td>
                                            <button className="btn-edit"
                                                onClick={() => this.handleEditProducttype(producttype)}
                                            ><i className="fas fa-pencil-alt"></i></button>
                                            <button className="btn-delete"
                                                onClick={() => this.handleDeleteProducttype(producttype)}
                                            ><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </ div>
        );
    }

}

const mapStateToProps = state => {
    return {
        producttypes: state.producttype.types,
        categorysRedux: state.category.categorys,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProducttypesRedux: () => dispatch(actions.fetchProducttypeStart()),
        fetchCategorysRedux: () => dispatch(actions.fetchCategoryStart()),
        deleteProducttype: (producttypeId) => dispatch(actions.deleteProducttype(producttypeId)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageProduct);
