import React, { Component } from 'react';
import { connect } from 'react-redux';
import BlockHeaderTitle from "../../HomePage/Section/BlockHeaderTitle.js"
import *  as actions from "../../../store/actions";

import './DetailProduct.scss'


class PolicyBlock extends Component {

    constructor(props) {
        super(props)
        this.scrollTop = React.createRef()
    }

    componentDidMount() {
        // this.handleScroll()
    }

    componentDidUpdate() {
        // this.handleScroll()
    }

    handleScroll = () => {
        const { index, selected } = this.props
        if (index === selected) {
            setTimeout(() => {
                this.scrollTop.current.scrollIntoView({ behavior: 'smooth' })
            }, 100)
        }
    }

    render() {
        return (
            <div className="product-policy-block">
                <div class="policy-item">
                    <svg width="64" height="39" viewBox="0 0 64 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.73752e-06 38.9324H53.1079L64 0H10.8921L9.73752e-06 38.9324ZM13.808 3.84369H58.9334L58.1253 6.5H12.9999L13.808 3.84369ZM57.4999 9L56.6253 12H11.4999L12.3746 9H57.4999ZM50.192 35.0887H5.06664L10.8746 14.5H55.9999L50.192 35.0887Z" fill="#29324E"></path>
                        <path d="M14.9249 28.0364H10.9336L9.85825 31.8801H13.8495L14.9249 28.0364Z" fill="#29324E"></path></svg>
                    <div class="policy-item-text">
                        Hỗ trợ trả góp 0%,
                        trả trước 0đ
                    </div>
                </div>
                <div class="policy-item"><svg width="55" height="32" viewBox="0 0 55 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.500153 26H5.00014L3.1826 31.7219H46.6621L54.2567 4.80592H48.0731L49.4084 0.5L45.3493 0.5H7.91538L0.500153 26ZM4.5351 21.9159L5.03735 20.1207L5.53959 18.3255L9.69671 3.46644H40.6606H42.5248H44.3889H45.7241L45.3493 4.80592H44.0142H42.15H40.2859H10.7129L6.93056 18.3256L6.42831 20.1208L5.92607 21.916L5.56637 23.2017H4.17539L4.5351 21.9159ZM43.9469 28.1315H7.91538L8.29013 26.792L8.79237 24.9968L9.29461 23.2016L9.65431 21.9159L10.1566 20.1207L10.6588 18.3255L13.4367 8.39634H39.2814H41.1455H43.0097H44.3449H46.209H48.0731H49.5155L43.9469 28.1315Z" fill="#29324E"></path>
                    <path d="M31.5353 14.3047H35.3325L36.2926 10.8727H32.4954L32.8417 9.63525H29.2778L28.9316 10.8727H24.3721L22.287 18.3254L21.8455 19.9035H26.4051L26.3443 20.1206L25.8421 21.9158L25.7989 22.0701H21.931L21.6145 23.2015L21.1122 24.9967L20.9708 25.5022H24.8387L24.4779 26.7919H28.0417L28.4025 25.5022H32.8379L32.9793 24.9967L33.4816 23.2015L33.8413 21.9158L34.3435 20.1206L34.8457 18.3254L35.3644 16.4715H30.9291L31.5353 14.3047ZM30.2774 21.9158L30.2342 22.0701H29.3627L29.4059 21.9158L29.9081 20.1206L29.9689 19.9035H30.8404L30.7796 20.1206L30.2774 21.9158ZM26.3695 16.4715L26.9757 14.3048H27.9714L27.3653 16.4715H26.3695Z" fill="#29324E"></path>
                </svg>
                    <div class="policy-item-text">
                        Hoàn tiền 200%
                        nếu có hàng giả
                    </div>
                </div>
                <div class="policy-item"><svg width="72" height="39" viewBox="0 0 72 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M48.9844 3.80453H20.6917L21.7561 0H53.9512L52 6.5L51 8L49.2289 13.7914L49.2289 15.1261H58.5L63.2257 13.7914L66.4656 19.7821L62.6866 33.2896H12.4427L13.5071 29.4851H59.8485L62.1898 21.1166L60.2857 17.596H45.126L48.9844 3.80453Z" fill="#29324E"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M48.8514 4.28027H59.6664L64.8191 17.5961H45.126L48.8514 4.28027ZM51 8.0848L49.5 14.5H58.9079L56.4842 8.0848H51Z" fill="#29324E"></path>
                    <path d="M57.986 30.9118C56.8103 35.1142 52.3628 38.5209 48.0523 38.5209C43.7418 38.5209 41.2005 35.1142 42.3762 30.9118C43.5519 26.7094 47.9994 23.3027 52.3099 23.3027C56.6204 23.3027 59.1617 26.7094 57.986 30.9118Z" fill="#F0F3FC"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M49.1167 34.7163C51.272 34.7163 53.4957 33.013 54.0835 30.9118C54.6714 28.8106 53.4008 27.1073 51.2455 27.1073C49.0902 27.1073 46.8665 28.8106 46.2787 30.9118C45.6908 33.013 46.9615 34.7163 49.1167 34.7163ZM48.0523 38.5209C52.3628 38.5209 56.8103 35.1142 57.986 30.9118C59.1617 26.7094 56.6204 23.3027 52.3099 23.3027C47.9994 23.3027 43.5519 26.7094 42.3762 30.9118C41.2005 35.1142 43.7418 38.5209 48.0523 38.5209Z" fill="#29324E"></path>
                    <path d="M32.62 30.9118C31.4443 35.1142 26.9969 38.5209 22.6864 38.5209C18.3759 38.5209 15.8346 35.1142 17.0103 30.9118C18.186 26.7094 22.6334 23.3027 26.9439 23.3027C31.2544 23.3027 33.7957 26.7094 32.62 30.9118Z" fill="#F0F3FC"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M23.7508 34.7163C25.906 34.7163 28.1297 33.013 28.7176 30.9118C29.3054 28.8106 28.0348 27.1073 25.8795 27.1073C23.7243 27.1073 21.5006 28.8106 20.9127 30.9118C20.3249 33.013 21.5955 34.7163 23.7508 34.7163ZM22.6864 38.5209C26.9969 38.5209 31.4443 35.1142 32.62 30.9118C33.7957 26.7094 31.2544 23.3027 26.9439 23.3027C22.6334 23.3027 18.186 26.7094 17.0103 30.9118C15.8346 35.1142 18.3759 38.5209 22.6864 38.5209Z" fill="#29324E"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.1241 6.18213L30.2876 6.18213L29.2233 9.98666L15.0597 9.98666L16.1241 6.18213Z" fill="#29324E"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.14159 13.7915L25.7875 13.7915L24.6459 16.5L7 16.5L8.14159 13.7915Z" fill="#29324E"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.93956 21.4004L18.6957 21.4004L17.7561 24L8 24L8.93956 21.4004Z" fill="#29324E"></path></svg> <div class="policy-item-text">
                        Giao hàng nhanh trên toàn quốc
                    </div></div>
                <div class="policy-item"><svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M50.6538 44.9597H22.4736L11.7289 52.3122L6.8905 55.6231L8.18165 50.5243L8.60884 48.8373L9.59075 44.9597H6.65381H5.59075H2.65381L3.63571 41.0821L10.0181 15.8776L11 12H15H59H63L62.0181 15.8776L55.6357 41.0821L54.6538 44.9597H50.6538ZM20.623 42.0108L13.02 47.2134L13.5907 44.9597L14.5727 41.0821H10.5727H7.63571L14.0181 15.8776H58.0181L51.6357 41.0821H23.4555H21.9802L20.623 42.0108ZM24.5632 25.5718H18.5632L17.0904 31.3882H23.0904L24.5632 25.5718ZM30.5632 25.5718H36.5632L35.0904 31.3882H29.0904L30.5632 25.5718ZM48.5632 25.5718H42.5632L41.0904 31.3882H47.0904L48.5632 25.5718Z" fill="#29324E"></path>
                </svg>
                    <div class="policy-item-text">
                        Hỗ trợ kĩ thuật
                        online 7/7
                    </div>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(PolicyBlock);
