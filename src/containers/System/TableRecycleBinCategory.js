import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageProduct.scss';
import { ToastContainer, toast } from 'react-toastify';
import *  as actions from "../../store/actions";


class TableRecycleBinCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
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

    render() {
        let arrCategorys = this.props.categorysDeleted
        console.log(arrCategorys)
        return (
            < div className="product-container" >
                <table className="table table-hover table table-bordered table-striped mb-0">
                    <thead className="">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Thời gian xóa</th>
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
