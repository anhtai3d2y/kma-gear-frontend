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

class TableRecycleBinBrand extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sortBy: 1,

        }
    }

    componentDidMount() {
        this.props.fetchBrandDeletedRedux()
    }

    componentDidUpdate(prevState, prevProps) {

    }

    handleRecoverBrand = async (brand) => {
        await this.props.recoverBrand(brand.id)
        await this.props.fetchBrandDeletedRedux()
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
        let arrBrands = this.props.brandsDeleted
        arrBrands = this.sort(arrBrands)
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
                            >Tên nhãn hàng <i className="fas fa-sort"></i></th>
                            <th scope="col">Logo</th>
                            <th scope="col" colspan="2">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {arrBrands && arrBrands.length > 0 &&
                            arrBrands.map((brand, index) => {
                                return (
                                    <tr >
                                        <th scope="row">{brand.id}</th>
                                        <td>{brand.updatedAt}</td>
                                        <td>{brand.name}</td>
                                        <td>
                                            <div className="brand-image">
                                                <img src={brand.image} />
                                            </div>
                                        </td>

                                        <td>
                                            <div className="btn-restore"
                                                onClick={() => this.handleRecoverBrand(brand)}
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
        brandsDeleted: state.brand.brandsDeleted,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchBrandDeletedRedux: () => dispatch(actions.fetchBrandDeletedStart()),
        recoverBrand: (id) => dispatch(actions.recoverBrand(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableRecycleBinBrand);
