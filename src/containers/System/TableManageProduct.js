import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
    sortByAmountASC,
    sortByAmountDESC,
    sortByPriceASC,
    sortByPriceDESC,
    sortByDiscountASC,
    sortByDiscountDESC,
} from '../../utils/SortUtils.js';


class TableManageProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            selectedType: -1,
            selectedBrand: -1,
            sortBy: 1,
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

    numberWithCommas = (x) => {
        let result = Math.round(x)
        return result.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
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
            case 'amount':
                if (this.state.sortBy === 6) {
                    keyId = 7
                } else {
                    keyId = 6
                }
                break;
            case 'price':
                if (this.state.sortBy === 8) {
                    keyId = 9
                } else {
                    keyId = 8
                }
                break;
            case 'discount':
                if (this.state.sortBy === 10) {
                    keyId = 11
                } else {
                    keyId = 10
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
            case 6:
                arr.sort(sortByAmountASC)
                break;
            case 7:
                arr.sort(sortByAmountDESC)
                break;
            case 8:
                arr.sort(sortByPriceASC)
                break;
            case 9:
                arr.sort(sortByPriceDESC)
                break;
            case 10:
                arr.sort(sortByDiscountASC)
                break;
            case 11:
                arr.sort(sortByDiscountDESC)
                break;

            default:
                break;
        }
        return arr
    }

    handleChangeSelectedType = (e) => {
        this.setState({
            selectedType: Number(e.target.value)
        })
    }

    handleChangeSelectedBrand = (e) => {
        this.setState({
            selectedBrand: Number(e.target.value)
        })
    }

    selectedType = (arr) => {
        if (this.state.selectedType !== -1) {
            let newArr = []
            arr.forEach(value => {
                if (value.TypeId === this.state.selectedType) {
                    newArr.push(value)
                }
            })
            arr = newArr
        }
        return arr
    }

    selectedBrand = (arr) => {
        if (this.state.selectedBrand !== -1) {
            let newArr = []
            arr.forEach(value => {
                if (value.BrandId === this.state.selectedBrand) {
                    newArr.push(value)
                }
            })
            arr = newArr
        }
        return arr
    }

    render() {
        let arrProducts = this.state.products
        let types = this.props.types
        let brands = this.props.brands
        arrProducts = this.selectedType(arrProducts)
        arrProducts = this.selectedBrand(arrProducts)
        arrProducts = this.sort(arrProducts)
        return (
            < div className="product-container" ref={this.scrollTop}>
                <select id="input-sort" className="mb-4 ml-4 col-2"
                    onChange={(e) => this.handleChangeSelectedType(e)}
                >

                    <option value="-1">Loại sản phẩm (Tất cả)</option>
                    {types && types.length > 0 &&
                        types.map((type, index) => {
                            return (<option value={type.id}>{type.typeName}</option>)
                        })
                    }
                </select>
                <select id="input-sort" className="mb-4 ml-2 col-2"
                    onChange={(e) => this.handleChangeSelectedBrand(e)}
                >

                    <option value="-1">Thương hiệu (Tất cả)</option>
                    {brands && brands.length > 0 &&
                        brands.map((brand, index) => {
                            return (<option value={brand.id}>{brand.name}</option>)
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
                                onClick={() => this.handleSortBy('name')}
                            >Tên sản phẩm <i className="fas fa-sort"></i></th>
                            <th scope="col">Hình ảnh</th>
                            <th scope="col">Loại sản phẩm</th>
                            <th scope="col">Thương hiệu</th>
                            <th scope="col"
                                style={{ cursor: "pointer", color: (this.state.sortBy === 6 || this.state.sortBy === 7 ? ("#339af0") : ("black")) }}
                                onClick={() => this.handleSortBy('amount')}
                            >Số lượng <i className="fas fa-sort"></i></th>
                            <th scope="col"
                                style={{ cursor: "pointer", color: (this.state.sortBy === 8 || this.state.sortBy === 9 ? ("#339af0") : ("black")) }}
                                onClick={() => this.handleSortBy('price')}
                            >Giá <i className="fas fa-sort"></i></th>
                            <th scope="col"
                                style={{ cursor: "pointer", color: (this.state.sortBy === 10 || this.state.sortBy === 11 ? ("#339af0") : ("black")) }}
                                onClick={() => this.handleSortBy('discount')}
                            >Chiết khấu (%) <i className="fas fa-sort"></i></th>
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
                                                    return (type.id === product.TypeId) ? (type.typeName) : (<div></div>)
                                                })
                                            }
                                        </td>
                                        <td>
                                            {
                                                brands.map((brand, index) => {
                                                    return (brand.id === product.BrandId) ? (brand.name) : (<div></div>)
                                                })
                                            }
                                        </td>
                                        <td>{product.amount}</td>
                                        <td>{this.numberWithCommas(product.price)} đ</td>
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
            </ div >
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
