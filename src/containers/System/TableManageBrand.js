import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageBrand.scss';
import { ToastContainer, toast } from 'react-toastify';
import *  as actions from "../../store/actions";


class TableManageBrand extends Component {

    constructor(props) {
        super(props);
        this.state = {
            brands: [],
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

    render() {
        let arrBrands = this.props.brandsRedux
        return (
            < div className="brand-container" >
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
