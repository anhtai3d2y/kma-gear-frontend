import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Footer.scss'
import { FormattedMessage } from "react-intl";


class Footer extends Component {

    render() {

        return (
            <div className="footer">
                <div className="footer-top">
                    <div className="container">
                        <div className="footer-links">
                            <div className="footer-links-group">
                                <span className="f-title"><FormattedMessage id="footer.generalinfo" /></span>
                                <p><a href="">Giới thiệu KMA Gear</a></p>
                                <p><a href="">Tuyển dụng</a></p>
                                <p><a href="/tin-tuc">Tin tức</a></p>
                                <p><a href="">Ý kiến khách hàng</a></p>
                                <p><a href="/index.php?route=information/contact">Liện hệ hợp tác</a></p>
                            </div>
                            <div className="footer-links-group">
                                <span className="f-title">Chính sách chung</span>
                                <p><a href="">Quy định chung</a></p>
                                <p><a href="/chinh-sach-van-chuyen-tnc-store.html">Chính sách vận chuyển</a></p>
                                <p><a href="/chinh-sach-va-quy-dinh-bao-hanh-tai-tnc-store.html">Chính sách bảo hành</a></p>
                                <p><a href="/chinh-sach-va-quy-dinh-bao-hanh-tai-tnc-store.html">Chính sách đổi, trả lại hàng</a></p>
                                <p><a href="">Chính sách cho doanh nghiệp</a></p></div>
                            <div className="footer-links-group">
                                <span className="f-title">Thông tin khuyến mãi</span>
                                <p><a href="/san-pham-ban-chay.html">Sản phẩm bán chạy</a></p>
                                <p><a href="/san-pham-giam-gia.html">Sản phẩm khuyến mãi</a></p>
                                <p><a href="">Hàng thanh lý</a></p>
                            </div>
                            <div className="footer-links-group">
                                <span className="f-title">Follow us!</span>
                                <div className="f-links-social">
                                    <a href="https://www.facebook.com/27112k/" target="_blank">
                                        <img src="https://www.tncstore.vn/catalog/view/theme/default/image/facebook.png" /></a>
                                    <a href="https://www.youtube.com/" target="_blank">
                                        <img src="https://www.tncstore.vn/catalog/view/theme/default/image/youtube.png" /></a>
                                    <a href="https://twitter.com/">
                                        <img src="https://www.tncstore.vn/catalog/view/theme/default/image/twitter.png" alt="" /></a>
                                    <a href="https://www.instagram.com/" target="_blank">
                                        <img src="https://www.tncstore.vn/catalog/view/theme/default/image/instagram.png" /></a>
                                </div>
                            </div>
                        </div>
                        <div className="footer-store-info">
                            <div class="f-title">Công ty TNHH Tin học &amp; Thương mại KMA Gear</div>
                            <p>Showroom : 141 Chiến Thắng, Tân Triều, Thanh Trì, Hà Nội / Tel: (093) 206.2682</p>
                            <p>Trung tâm bảo hành : 141 Chiến Thắng, Tân Triều, Thanh Trì, Hà Nội / Tel: (093) 206.2682</p>
                            <p>Trụ sở (Không bán hàng): 141 Chiến Thắng, Tân Triều, Thanh Trì, Hà Nội / Tel: (093) 206.2682</p>
                            <a href="https://www.dmca.com/r/w96pr93" title="DMCA.com Protection Status" class="dmca-badge">
                                <img src="https://images.dmca.com/Badges/_dmca_premi_badge_2.png?ID=4fc14405-0653-4489-bece-2453699c60a7" alt="DMCA.com Protection Status" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div class="container">
                        <div class="f-bottom-copyright">© 2022 - Bản quyền của Công ty TNHH Tin học &amp; Thương mại KMA Gear</div>
                        <div class="f-bottom-icon">
                            <a href=""><img src="https://www.tncstore.vn/catalog/view/theme/default/image/tien-mat.png" alt="" /></a>
                            <a href=""><img src="https://www.tncstore.vn/catalog/view/theme/default/image/internet-bank.png" alt="" /></a>
                            <a href=""><img src="https://www.tncstore.vn/catalog/view/theme/default/image/mastercard.png" alt="" /></a>
                            <a href=""><img src="https://www.tncstore.vn/catalog/view/theme/default/image/visa.png" alt="" /></a>
                            <a href="http://online.gov.vn/Home/WebDetails/63325" target="_blank">
                                <img src="https://www.tncstore.vn/catalog/view/theme/default/image/bo-cong-thuong.png" alt="" /></a>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
