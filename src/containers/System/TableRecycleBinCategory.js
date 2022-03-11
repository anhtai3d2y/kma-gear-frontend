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
    sortByNameASC,
    sortByNameDESC,
} from '../../utils/SortUtils.js';

class TableRecycleBinCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sortBy: 1,

        }
    }

    componentDidMount() {
        this.props.fetchCategoryDeletedRedux()
    }

    componentDidUpdate(prevState, prevProps) {

    }

    handleRecoverCategory = async (category) => {
        await this.props.recoverCategory(category.id)
        await this.props.fetchCategoryDeletedRedux()
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
            case 'name':
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
                arr.sort(sortByNameASC)
                break;
            case 5:
                arr.sort(sortByNameDESC)
                break;

            default:
                break;
        }
        return arr
    }

    render() {
        let arrCategorys = this.props.categorysDeleted
        arrCategorys = this.sort(arrCategorys)
        return (
            < div className="product-container" >
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
                                onClick={() => this.handleSortBy('name')}
                            >Danh mục <i className="fas fa-sort"></i></th>
                            <th scope="col">Hình ảnh</th>
                            <th scope="col" colspan="2">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {arrCategorys && arrCategorys.length > 0 &&
                            arrCategorys.map((category, index) => {
                                return (
                                    <tr >
                                        <th scope="row">{category.id}</th>
                                        <td>{category.updatedAt}</td>
                                        <td>{category.name}</td>
                                        <td>
                                            <div className="category-image">
                                                <img src={category.image} />
                                            </div>
                                        </td>

                                        <td>
                                            <div className="btn-restore"
                                                onClick={() => this.handleRecoverCategory(category)}
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
        categorysDeleted: state.category.categorysDeleted,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchCategoryDeletedRedux: () => dispatch(actions.fetchCategoryDeletedStart()),
        recoverCategory: (id) => dispatch(actions.recoverCategory(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableRecycleBinCategory);
