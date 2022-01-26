import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageProduct.scss';
import { ToastContainer, toast } from 'react-toastify';
import *  as actions from "../../store/actions";


class TableRecycleBinBrand extends Component {

    constructor(props) {
        super(props);
        this.state = {
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

    render() {
        let arrBrands = this.props.brandsDeleted
        console.log(arrBrands)
        return (
            < div className="product-container" >
                <table className="table table-hover table table-bordered table-striped mb-0">
                    <thead className="">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Thời gian xóa</th>
                            <th scope="col">Tên nhãn hàng</th>
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
