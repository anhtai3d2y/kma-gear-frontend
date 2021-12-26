import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageProduct.scss';
import { ToastContainer, toast } from 'react-toastify';
import *  as actions from "../../store/actions";


class TableManageCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categorys: [],
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

    render() {
        let arrCategorys = this.props.categorysRedux
        return (
            < div className="category-container" >
                <table className="table table-hover table table-bordered table-striped mb-0">
                    <thead className="">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Danh mục</th>
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
