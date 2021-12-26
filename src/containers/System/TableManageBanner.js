import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageBanner.scss';
import { ToastContainer, toast } from 'react-toastify';
import *  as actions from "../../store/actions";


class TableManageBanner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            banners: [],
        }
    }

    componentDidMount() {
        this.props.fetchBannersRedux()
    }

    componentDidUpdate(prevState, prevProps) {
        // if (prevProps.bannersRedux !== this.props.bannersRedux) {
        //     this.setState({
        //         banners: this.props.bannersRedux
        //     })
        // }
    }

    handleEditBanner = (banner) => {
        this.props.handleEditBannerFromParent(banner)
    }

    handleDeleteBanner = async (banner) => {
        await this.props.deleteBannerRedux(banner.id)
        await this.props.fetchBannersRedux()
    }

    render() {
        let arrBanners = this.props.bannersRedux
        return (
            < div className="banner-container" >
                <table className="table table-hover table table-bordered table-striped mb-0">
                    <thead className="">
                        <tr>
                            <th scope="col">ID</th>
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
                                        <td>{banner.link}</td>
                                        <td>
                                            <div className="banner-image">
                                                <img src={banner.image} />
                                            </div>
                                        </td>
                                        <td>{banner.type ? 'Biển nhỏ' : 'Biển lớn'}</td>
                                        <td>
                                            <button className="btn-edit"
                                                onClick={() => this.handleEditBanner(banner)}
                                            ><i className="fas fa-pencil-alt"></i></button>
                                            <button className="btn-delete"
                                                onClick={() => this.handleDeleteBanner(banner)}
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
        bannersRedux: state.banner.banners
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchBannersRedux: () => dispatch(actions.fetchBannerStart()),
        deleteBannerRedux: (id) => dispatch(actions.deleteBanner(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageBanner);
