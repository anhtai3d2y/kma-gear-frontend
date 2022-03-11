import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageBrand.scss';
import { ToastContainer, toast } from 'react-toastify';
import *  as actions from "../../store/actions";
import {
    sortByCreateDateDESC,
    sortByIdASC,
    sortByIdDESC,
    sortByNameASC,
    sortByNameDESC,
} from '../../utils/SortUtils.js';

class TableManageBrand extends Component {

    constructor(props) {
        super(props);
        this.state = {
            brands: [],
            sortBy: 1,

        }
    }

    componentDidMount() {
        this.props.fetchBrandsRedux()
    }

    componentDidUpdate(prevState, prevProps) {
        // if (prevProps.brandsRedux !== this.props.brandsRedux) {
        //     this.setState({
        //         brands: this.props.brandsRedux
        //     })
        // }
    }

    handleEditBrand = (brand) => {
        this.props.handleEditBrandFromParent(brand)
    }

    handleDeleteBrand = async (brand) => {
        await this.props.deleteBrandRedux(brand.id)
        await this.props.fetchBrandsRedux()
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
        let arrBrands = this.props.brandsRedux
        arrBrands = this.sort(arrBrands)

        return (
            < div className="brand-container" >
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
                                        <td>{brand.name}</td>
                                        <td>
                                            <div className="brand-image">
                                                <img src={brand.image} />
                                            </div>
                                        </td>
                                        <td>
                                            <button className="btn-edit"
                                                onClick={() => this.handleEditBrand(brand)}
                                            ><i className="fas fa-pencil-alt"></i></button>
                                            <button className="btn-delete"
                                                onClick={() => this.handleDeleteBrand(brand)}
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
        brandsRedux: state.brand.brands
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchBrandsRedux: () => dispatch(actions.fetchBrandStart()),
        deleteBrandRedux: (id) => dispatch(actions.deleteBrand(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageBrand);
