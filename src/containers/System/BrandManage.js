import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
class BrandManage extends Component {

    state = {

    }

    componentDidMount() {
    }


    render() {
        return (
            <div className="text-center" >Manage brands</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(BrandManage);
