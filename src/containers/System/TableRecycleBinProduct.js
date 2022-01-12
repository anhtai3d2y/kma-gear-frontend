import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageProduct.scss';
import { ToastContainer, toast } from 'react-toastify';
import *  as actions from "../../store/actions";


class TableRecycleBinProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productsDeleted: [],
        }
    }

    componentDidMount() {
        this.props.fetchProductsDeletedRedux()
    }

    componentDidUpdate(prevState, prevProps) {
        if (prevProps.productsDeleted !== this.props.productsDeleted) {
            this.setState({
                productsDeleted: this.props.productsDeleted
            })
        }
    }

    handleRecoverProduct = async (product) => {
        await this.props.recoverProductRedux(product.id)
        await this.props.fetchProductsDeletedRedux()
    }

    render() {
        let arrProducts = this.state.productsDeleted
        console.log('list product: ', arrProducts)
        let types = this.props.types
        let brands = this.props.brands
        return (
            < div className="product-container" >
                <table className="table table-hover table table-bordered table-striped mb-0">
                    <thead className="">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Thời gian xóa</th>
                            <th scope="col">Tên sản phẩm</th>
                            <th scope="col">Hình ảnh</th>
                            <th scope="col">Loại sản phẩm</th>
                            <th scope="col">Thương hiệu</th>
                            <th scope="col">Số lượng</th>
                            <th scope="col">Giá</th>
                            <th scope="col">Chiết khấu (%)</th>
                            <th scope="col" colspan="2">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {arrProducts && arrProducts.length > 0 &&
                            arrProducts.map((product, index) => {
                                return (
                                    <tr >
                                        <th scope="row">{product.id}</th>
                                        <td>{product.updatedAt}</td>
                                        <td>{product.name}</td>
                                        <td>
                                            <div className="product-image">
                                                <img src={product.image} />
                                            </div>
                                        </td>
                                        <td>
                                            {
                                                types.map((type, index) => {
                                                    return (type.id === product.typeId) ? (type.typeName) : (<div></div>)
                                                })
                                            }
                                        </td>
                                        <td>
                                            {
                                                brands.map((brand, index) => {
                                                    return (brand.id === product.brandId) ? (brand.name) : (<div></div>)
                                                })
                                            }
                                        </td>
                                        <td>{product.amount}</td>
                                        <td>{product.price}</td>
                                        <td>{product.discount}</td>
                                        <td>
                                            <div className="btn-restore"
                                                onClick={() => this.handleRecoverProduct(product)}
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
        productsDeleted: state.product.productsDeleted,
        typesRedux: state.producttype.types,
        isLoadingType: state.producttype.isLoadingType,
        brandsRedux: state.brand.brands,
        isLoadingBrand: state.brand.isLoadingBrand,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProductsDeletedRedux: () => dispatch(actions.fetchAllProductsDeletedStart()),
        recoverProductRedux: (id) => dispatch(actions.recoverProduct(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableRecycleBinProduct);
