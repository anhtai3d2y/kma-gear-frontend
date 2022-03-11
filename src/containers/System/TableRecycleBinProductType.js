import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageProduct.scss';
import { ToastContainer, toast } from 'react-toastify';
import *  as actions from "../../store/actions";
import {
    sortByDateASC,
    sortByDateDESC,
    sortByIdASC,
    sortByIdDESC,
    sortByTypenameASC,
    sortByTypenameDESC,
} from '../../utils/SortUtils.js';

class TableRecycleBinProductType extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedCategory: -1,
            sortBy: 1,

        }
    }

    componentDidMount() {
        this.props.fetchProducttypeDeletedRedux()
        this.props.fetchCategorysRedux()

    }

    componentDidUpdate(prevState, prevProps) {

    }

    handleRecoverProducttype = async (producttype) => {
        await this.props.recoverProducttype(producttype.id)
        await this.props.fetchProducttypeDeletedRedux()
    }

    handleSortBy = (key) => {
        let keyId
        switch (key) {
            case 'date':
                if (this.state.sortBy === 0) {
                    keyId = 1
                } else {
                    keyId = 0
                }
                break;
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

    sort = (arr) => {
        switch (this.state.sortBy) {
            case 0:
                arr.sort(sortByDateASC)
                break;
            case 1:
                arr.sort(sortByDateDESC)
                break;
            case 2:
                arr.sort(sortByIdASC)
                break;
            case 3:
                arr.sort(sortByIdDESC)
                break;
            case 4:
                arr.sort(sortByTypenameASC)
                break;
            case 5:
                arr.sort(sortByTypenameDESC)
                break;

            default:
                break;
        }
        return arr
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
        let arrProducttypes = this.props.typesDeleted
        let arrCategorys = this.props.categorysRedux
        arrProducttypes = this.selectedCategory(arrProducttypes)
        arrProducttypes = this.sort(arrProducttypes)

        return (
            < div className="product-container" >
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
                                style={{ cursor: "pointer", color: (this.state.sortBy === 0 || this.state.sortBy === 1 ? ("#339af0") : ("black")) }}
                                onClick={() => this.handleSortBy('date')}
                            >Thời gian xóa <i className="fas fa-sort"></i></th>
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
                                        <td>{producttype.updatedAt}</td>
                                        <td>{producttype.typeName}</td>
                                        <td>{producttype.Category.name}</td>

                                        <td>
                                            <div className="btn-restore"
                                                onClick={() => this.handleRecoverProducttype(producttype)}
                                            ><i className="fab fa-trash"></i>Khôi phục</div>
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
        typesDeleted: state.producttype.typesDeleted,
        categorysRedux: state.category.categorys,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProducttypeDeletedRedux: () => dispatch(actions.fetchProducttypeDeletedStart()),
        fetchCategorysRedux: () => dispatch(actions.fetchCategoryStart()),
        recoverProducttype: (id) => dispatch(actions.recoverProducttype(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableRecycleBinProductType);
