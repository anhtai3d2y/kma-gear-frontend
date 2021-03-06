import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CRUDActions } from "../../utils";
import './BillManage.scss';
import TableManageBill from "./TableManageBill";
import TableRecycleBinBill from "./TableRecycleBinBill";
import { debounce } from 'lodash';


import { ToastContainer, toast } from 'react-toastify';
import *  as actions from "../../store/actions";


class BillManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            states: [],
            bills: [],

            id: '',
            UserId: null,
            fullName: '',
            email: '',
            phoneNumber: '',
            address: '',
            note: '',
            StateId: 0,
            PaymenttypeId: 1,
            createdAt: '',
            updatedAt: '',

            action: CRUDActions.CREATE,

            isShowForm: false,
            isOpenRecycleBin: false,
            searchInfo: '',


        }
        this.scrollTop = React.createRef()
    }

    async componentDidMount() {
        this.props.fetchBillsRedux()
        this.props.fetchStatesRedux()
        // this.handleScroll()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // this.handleScroll()
        if (prevProps.statesRedux !== this.props.statesRedux) {
            let arrStates = this.props.statesRedux
            this.setState({
                states: arrStates,
                StateId: arrStates && arrStates.length > 0 ? arrStates[0].id : '',
            })
        }
        if (prevProps.billsRedux !== this.props.billsRedux) {
            let arrStates = this.props.statesRedux

            this.setState({

                id: '',
                // UserId: null,
                fullName: '',
                email: '',
                phoneNumber: '',
                address: '',
                note: '',
                StateId: arrStates && arrStates.length > 0 ? arrStates[0].id : '',
                PaymenttypeId: 1,
                createdAt: '',
                updatedAt: '',

                action: CRUDActions.CREATE,

                isShowForm: false
            })
        }
    }

    handleScroll = () => {
        const { index, selected } = this.props
        if (index === selected) {
            setTimeout(() => {
                this.scrollTop.current.scrollIntoView({ behavior: 'smooth' })
            }, 200)
        }
    }

    handleSaveBill = async () => {
        let isValid = this.checkValidateInput()
        if (isValid) {
            let { action } = this.state
            if (action === CRUDActions.CREATE) {
                //create bill
                let newBill = {
                    UserId: this.state.UserId,
                    fullName: this.state.fullName,
                    email: this.state.email,
                    phoneNumber: this.state.phoneNumber,
                    address: this.state.address,
                    note: this.state.note,
                    StateId: this.state.StateId,
                    PaymenttypeId: this.state.PaymenttypeId,
                }
                await this.props.createNewBill(newBill)
                toast(`Th??m h??a ????n th??nh c??ng`)
            }
            if (action === CRUDActions.EDIT) {
                //edit bill
                await this.props.editBillRedux({
                    id: this.state.id,
                    UserId: this.state.UserId,
                    fullName: this.state.fullName,
                    email: this.state.email,
                    phoneNumber: this.state.phoneNumber,
                    address: this.state.address,
                    note: this.state.note,
                    StateId: this.state.StateId,
                    PaymenttypeId: this.state.PaymenttypeId,
                })
            }
            await this.props.fetchBillsRedux()
        }
    }

    checkValidateInput = () => {
        let isValid = true
        let arrCheck = ['fullName', 'email', 'phoneNumber', 'address', 'StateId', 'PaymenttypeId']
        let arrMessage = ['Ng?????i nh???n', 'Email', 'S??? ??i???n tho???i', '?????a ch???', 'Tr???ng th??i', 'Ph????ng th???c thanh to??n']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false
                toast.error(`B???n ??ang ????? tr???ng ${arrMessage[i]}`)
                return isValid
            }
        }
        // toast('L??u s???n ph???m th??nh c??ng')
        return isValid
    }

    handleShowForm = () => {
        this.setState({
            isShowForm: !this.state.isShowForm
        })
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value

        this.setState({
            ...copyState
        })
    }

    handleEditBillFromParent = (bill) => {
        this.setState({
            id: bill.id,
            UserId: bill.UserId,
            fullName: bill.fullName,
            email: bill.email,
            phoneNumber: bill.phoneNumber,
            address: bill.address,
            note: bill.note,
            StateId: bill.StateId,
            PaymenttypeId: bill.PaymenttypeId,

            action: CRUDActions.EDIT,

            isShowForm: true
        })
    }

    handleOpenRecycleBin = () => {
        this.setState({
            isOpenRecycleBin: !this.state.isOpenRecycleBin
        })
    }

    handleChangeSearchBox = (value) => {
        this.setState({
            searchInfo: value
        })
        if (value !== "") {
            this.handleSearchBills(value)
        } else {
            this.props.fetchBillsRedux()
        }
    }

    handleSearchBills = debounce((value) => {
        this.props.fetchSearchBillRedux(value)
    }, 100)

    render() {

        // console.log('fetch state: ', this.state)
        let arrStates = this.state.states
        let { fullName, email, phoneNumber, address, note, StateId, PaymenttypeId } = this.state
        return (
            <div className="bill-manage-container" >
                <div className="title">
                    Qu???n l?? ????n h??ng
                </div>
                <div className="bill-manage-body " ref={this.scrollTop}>

                    <div className="container">
                        <div className="row">
                            <div className="col-12 mb-3 btn-show-form"
                                onClick={() => this.handleShowForm()}
                            >
                                <b>{this.state.action === CRUDActions.EDIT ? "S???a h??a ????n" : "Th??m h??a ????n"} {this.state.isShowForm ? (<i class="fas fa-caret-up"></i>) : (<i class="fas fa-caret-down"></i>)}</b>
                            </div>
                        </div>
                        {this.state.isShowForm ? (
                            <div>
                                <div className="row">
                                    <div className="col-12">
                                        <label className="mt-1">Ng?????i nh???n</label>
                                        <input className="form-control" type="text"
                                            value={fullName}
                                            onChange={(event) => { this.onChangeInput(event, 'fullName') }}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className="mt-1">Email</label>
                                        <input className="form-control" type="text"
                                            value={email}
                                            onChange={(event) => { this.onChangeInput(event, 'email') }}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className="mt-1">S??? ??i???n tho???i</label>
                                        <input className="form-control" type="text"
                                            value={phoneNumber}
                                            onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className="mt-1">?????a ch???</label>
                                        <input className="form-control" type="text"
                                            value={address}
                                            onChange={(event) => { this.onChangeInput(event, 'address') }}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className="mt-1">Ghi ch??</label>
                                        <textarea className="form-control" type="textarea"
                                            value={note}
                                            onChange={(event) => { this.onChangeInput(event, 'note') }}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <label className="mt-1">Tr???ng th??i</label>
                                        <select id="" class="form-control"
                                            onChange={(event) => { this.onChangeInput(event, 'StateId') }}
                                            value={StateId}
                                        >
                                            {arrStates && arrStates.length > 0 &&
                                                arrStates.map((state, index) => {
                                                    return (
                                                        <option key={state.id} value={state.id}>{state.content}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-6">
                                        <label className="mt-1">Ph????ng th???c thanh to??n</label>
                                        <select id="" class="form-control"
                                            onChange={(event) => { this.onChangeInput(event, 'PaymenttypeId') }}
                                            value={PaymenttypeId}
                                        >
                                            <option key='1' value='1'>Thanh to??n khi nh???n</option>
                                            <option key='2' value='2'>Thanh to??n tr???c tuy???n</option>
                                        </select>
                                    </div>
                                    <div className="col-12 my-3">
                                        <button type="button" class={this.state.action === CRUDActions.EDIT ? "btn btn-primary" : "btn btn-success"}
                                            onClick={() => { this.handleSaveBill() }}
                                        >{this.state.action === CRUDActions.EDIT ? "L??u" : "Th??m"}</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                    <div className="mb-4 ml-4 btn-go-recyclebin"
                        onClick={() => { this.handleOpenRecycleBin() }}>{this.state.isOpenRecycleBin ? (<div><i i className="fas fa-caret-left"></i> Quay l???i</div>) : (<div><i className="fas fa-trash"></i> Th??ng r??c</div>)}
                    </div>
                    <input type="text" className="mb-4 ml-4 col-6" name="search" autocomplete="off" placeholder="Nh???p th??ng tin ????n h??ng c???n t??m ..."
                        value={this.state.searchInfo}
                        onChange={(e) => this.handleChangeSearchBox(e.target.value)}
                    />
                    {this.state.isOpenRecycleBin ?
                        (<TableRecycleBinBill
                            action={this.state.action}
                        />) :
                        (<TableManageBill
                            handleEditBillFromParent={this.handleEditBillFromParent}
                            action={this.state.action}
                        />)}
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        billsRedux: state.bill.bills,
        statesRedux: state.state.states
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchStatesRedux: () => dispatch(actions.fetchStateStart()),
        fetchBillsRedux: () => dispatch(actions.fetchBillStart()),
        fetchSearchBillRedux: (key) => dispatch(actions.fetchSearchBillStart(key)),
        createNewBill: (data) => dispatch(actions.createNewBill(data)),
        editBillRedux: (data) => dispatch(actions.editBill(data)),

        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BillManage);
