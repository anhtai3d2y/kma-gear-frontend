import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllTypeproductsService } from "../../services/typeproductService";

class ProductManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            typeProductArr: []
        }
    }

    async componentDidMount() {
        try {
            let res = await getAllTypeproductsService('ALL')
            if (res && res.errCode === 0) {
                this.setState({
                    typeProductArr: res.typeproducts
                })
            }
        } catch (error) {
            console.log(error)
        }
    }


    render() {
        let types = this.state.typeProductArr
        return (
            <div className="product-manage-container" >
                <div className="title">
                    Quản lý sản phẩm
                </div>
                <div className="product-manage-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 mb-3">
                                <b>Thêm sản phẩm</b>
                            </div>
                            <div className="col-6">
                                <label>Tên sản phẩm</label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-6">
                                <label>Hình ảnh</label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-6">
                                <label>Loại sản phẩm</label>
                                <select id="" class="form-control">
                                    <option selected>Chọn loại sản phẩm</option>
                                    {types && types.length > 0 &&
                                        types.map((type, index) => {
                                            return (
                                                <option key={type.id}>{type.typeName}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-6">
                                <label>Thương hiệu</label>
                                <select id="" class="form-control">
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className="col-4">
                                <label>Số lượng</label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-4">
                                <label>Giá</label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-4">
                                <label>Chiết khấu</label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-12 mt-3">
                                <button type="button" class="btn btn-primary">Lưu</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);
