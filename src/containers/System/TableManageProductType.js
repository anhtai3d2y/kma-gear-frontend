import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageProduct.scss';
import { ToastContainer, toast } from 'react-toastify';
import *  as actions from "../../store/actions";


class TableManageProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            producttypes: [],
        }
    }

    componentDidMount() {
        this.props.fetchProducttypesRedux()
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

    render() {
        let arrProducttypes = this.state.producttypes
        return (
            < div className="producttype-container" >
                <table className="table table-hover table table-bordered table-striped mb-0">
                    <thead className="">
                        <tr>
                            <th scope="col">ID</th>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProducttypesRedux: () => dispatch(actions.fetchProducttypeStart()),
        deleteProducttype: (producttypeId) => dispatch(actions.deleteProducttype(producttypeId)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageProduct);
