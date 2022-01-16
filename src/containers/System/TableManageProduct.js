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
            products: [],
        }
    }

    componentDidMount() {
        this.props.fetchProductsRedux()
    }

    componentDidUpdate(prevState, prevProps) {
        if (prevProps.products !== this.props.products) {
            this.setState({
                products: this.props.products
            })
            this.scrollTop = React.createRef()

        }
    }

    handleEditProduct = (product) => {
        this.props.handleEditProductFromParent(product)
        // this.handleScroll()
    }

    handleDeleteProduct = async (product) => {
        await this.props.deleteProductRedux(product.id)
        await this.props.fetchProductsRedux()
    }

    handleScroll = () => {
        const { index, selected } = this.props
        if (index === selected) {
            setTimeout(() => {
                this.scrollTop.current.scrollIntoView({ behavior: 'smooth' })
            }, 100)
        }
    }

    render() {
        let arrProducts = this.state.products
        let types = this.props.types
        let brands = this.props.brands
        return (
            < div className="product-container" ref={this.scrollTop}>
                <table className="table table-hover table table-bordered table-striped mb-0">
                    <thead className="">
                        <tr>
                            <th scope="col">ID</th>
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
                                            <button className="btn-edit"
                                                onClick={() => this.handleEditProduct(product)}
                                            ><i className="fas fa-pencil-alt"></i></button>
                                            <button className="btn-delete"
                                                onClick={() => this.handleDeleteProduct(product)}
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
        products: state.product.products,
        typesRedux: state.producttype.types,
        isLoadingType: state.producttype.isLoadingType,
        brandsRedux: state.brand.brands,
        isLoadingBrand: state.brand.isLoadingBrand,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProductsRedux: () => dispatch(actions.fetchAllProductsStart()),
        deleteProductRedux: (id) => dispatch(actions.deleteProduct(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageProduct);
