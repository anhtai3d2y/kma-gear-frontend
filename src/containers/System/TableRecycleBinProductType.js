import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageProduct.scss';
import { ToastContainer, toast } from 'react-toastify';
import *  as actions from "../../store/actions";


class TableRecycleBinProductType extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        this.props.fetchProducttypeDeletedRedux()
    }

    componentDidUpdate(prevState, prevProps) {

    }

    handleRecoverProducttype = async (producttype) => {
        await this.props.recoverProducttype(producttype.id)
        await this.props.fetchProducttypeDeletedRedux()
    }

    render() {
        let arrProducttypes = this.props.typesDeleted
        return (
            < div className="product-container" >
                <table className="table table-hover table table-bordered table-striped mb-0">
                    <thead className="">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Thời gian xóa</th>
                            <th scope="col">Loại sản phẩm</th>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProducttypeDeletedRedux: () => dispatch(actions.fetchProducttypeDeletedStart()),
        recoverProducttype: (id) => dispatch(actions.recoverProducttype(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableRecycleBinProductType);
