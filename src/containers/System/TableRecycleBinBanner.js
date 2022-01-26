import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageProduct.scss';
import { ToastContainer, toast } from 'react-toastify';
import *  as actions from "../../store/actions";


class TableRecycleBinBanner extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        this.props.fetchBannerDeletedRedux()
    }

    componentDidUpdate(prevState, prevProps) {

    }

    handleRecoverBanner = async (banner) => {
        await this.props.recoverBanner(banner.id)
        await this.props.fetchBannerDeletedRedux()
    }

    render() {
        let arrBanners = this.props.bannersDeleted
        console.log(arrBanners)
        return (
            < div className="product-container" >
                <table className="table table-hover table table-bordered table-striped mb-0">
                    <thead className="">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Thời gian xóa</th>
                            <th scope="col">Link</th>
                            <th scope="col">Hình ảnh</th>
                            <th scope="col">Loại</th>
                            <th scope="col" colspan="2">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {arrBanners && arrBanners.length > 0 &&
                            arrBanners.map((banner, index) => {
                                return (
                                    <tr >
                                        <th scope="row">{banner.id}</th>
                                        <td>{banner.updatedAt}</td>
                                        <td>{banner.link}</td>
                                        <td>
                                            <div className="banner-image">
                                                <img src={banner.image} />
                                            </div>
                                        </td>
                                        <td>{banner.type && banner.type ? 'Biển nhỏ' : 'Biển lớn'}</td>
                                        <td>
                                            <div className="btn-restore"
                                                onClick={() => this.handleRecoverBanner(banner)}
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
        bannersDeleted: state.banner.bannersDeleted,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchBannerDeletedRedux: () => dispatch(actions.fetchBannerDeletedStart()),
        recoverBanner: (id) => dispatch(actions.recoverBanner(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableRecycleBinBanner);
