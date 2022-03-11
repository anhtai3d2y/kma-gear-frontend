import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageBanner.scss';
import { ToastContainer, toast } from 'react-toastify';
import *  as actions from "../../store/actions";
import {
    sortByCreateDateDESC,
    sortByIdASC,
    sortByIdDESC,
    sortByTypeASC,
    sortByTypeDESC,
} from '../../utils/SortUtils.js';

class TableManageBanner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            banners: [],
            selectedType: -1,
            sortBy: 1,

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
            case 'type':
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
                arr.sort(sortByTypeASC)
                break;
            case 5:
                arr.sort(sortByTypeDESC)
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

    selectedType = (arr) => {
        if (this.state.selectedType !== -1) {
            let newArr = []
            arr.forEach(value => {
                if (value.type === this.state.selectedType) {
                    newArr.push(value)
                }
            })
            arr = newArr
        }
        return arr
    }


    render() {
        let arrBanners = this.props.bannersRedux
        arrBanners = this.selectedType(arrBanners)
        arrBanners = this.sort(arrBanners)
        return (
            < div className="banner-container" >
                <select id="input-sort" className="mb-4 ml-4 col-2"
                    onChange={(e) => this.handleChangeSelectedType(e)}
                >

                    <option value="-1">Loại biển (Tất cả)</option>
                    <option value="0">Biển lớn (Tất cả)</option>
                    <option value="1">Biển nhỏ (Tất cả)</option>

                </select>
                <table className="table table-hover table table-bordered table-striped mb-0">
                    <thead className="">
                        <tr>
                            <th scope="col"
                                style={{ cursor: "pointer", color: (this.state.sortBy === 2 || this.state.sortBy === 3 ? ("#339af0") : ("black")) }}
                                onClick={() => this.handleSortBy('id')}
                            >ID <i className="fas fa-sort"></i></th>
                            <th scope="col">Link</th>
                            <th scope="col">Hình ảnh</th>
                            <th scope="col"
                                style={{ cursor: "pointer", color: (this.state.sortBy === 4 || this.state.sortBy === 5 ? ("#339af0") : ("black")) }}
                                onClick={() => this.handleSortBy('type')}
                            >Loại <i className="fas fa-sort"></i></th>
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
                                        <td>{banner.type && banner.type ? 'Biển nhỏ' : 'Biển lớn'}</td>
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
