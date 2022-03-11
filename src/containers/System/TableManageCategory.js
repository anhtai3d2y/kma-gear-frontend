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
    sortByNameASC,
    sortByNameDESC,
} from '../../utils/SortUtils.js';

class TableManageCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categorys: [],
            sortBy: 1,

        }
    }

    componentDidMount() {
        this.props.fetchCategorysRedux()
    }

    componentDidUpdate(prevState, prevProps) {
        // if (prevProps.categorysRedux !== this.props.categorysRedux) {
        //     this.setState({
        //         categorys: this.props.categorysRedux
        //     })
        // }
    }

    handleEditCategory = (category) => {
        this.props.handleEditCategoryFromParent(category)
    }

    handleDeleteCategory = async (category) => {
        await this.props.deleteCategoryRedux(category.id)
        await this.props.fetchCategorysRedux()
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
            case 1:
                arr.sort(sortByCreateDateDESC)
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
        let arrCategorys = this.props.categorysRedux
        arrCategorys = this.sort(arrCategorys)

        return (
            < div className="category-container" >
                <table className="table table-hover table table-bordered table-striped mb-0">
                    <thead className="">
                        <tr>
                            <th scope="col"
                                style={{ cursor: "pointer", color: (this.state.sortBy === 2 || this.state.sortBy === 3 ? ("#339af0") : ("black")) }}
                                onClick={() => this.handleSortBy('id')}
                            >ID <i className="fas fa-sort"></i></th>
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
                                        <td>{category.name}</td>
                                        <td>
                                            <div className="category-image">
                                                <img src={category.image} />
                                            </div>
                                        </td>
                                        <td>
                                            <button className="btn-edit"
                                                onClick={() => this.handleEditCategory(category)}
                                            ><i className="fas fa-pencil-alt"></i></button>
                                            <button className="btn-delete"
                                                onClick={() => this.handleDeleteCategory(category)}
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
        categorysRedux: state.category.categorys
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchCategorysRedux: () => dispatch(actions.fetchCategoryStart()),
        deleteCategoryRedux: (id) => dispatch(actions.deleteCategory(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageCategory);
