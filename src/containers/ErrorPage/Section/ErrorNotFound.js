import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ErrorNotFound.scss'
import { FormattedMessage } from "react-intl";


class ErrorNotFound extends Component {

    render() {
        return (
            <div className="error-not-found">
                <div className="container">
                    <div className="content-error">
                        <img src="https://res.cloudinary.com/dbammxapd/image/upload/v1640407616/kma_gear/404-not-found_azw7xh.png" alt="" />
                        <h4>THÔI TOANG RỒI</h4>
                        <h5>Nội dung bạn đang tìm có vẻ như không tồn tại, hoặc đã được chuyển đi nơi khác,
                            bạn có thể tham khảo một số sản phẩm mới của chúng tôi ở phía dưới.</h5>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorNotFound);
