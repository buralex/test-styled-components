import React from 'react';
import {compose} from "redux";
import {withSignal} from "redux-signal";

import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import SearchForm from 'components/SearchForm';
import Logo from 'images/logo-img.svg';
import avatarDefault from './images/avatar-user-default.png';

import {
    Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Tooltip, UncontrolledTooltip
} from 'reactstrap';

import withData from "hocs/withData";
import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";

import './style.scss';



import {makeSelectIsLoggedIn, makeSelectLoading, makeSelectLocation, makeSelectUser} from "containers/App/selectors";


import {makeSelectEnquiryTypes} from "./selectors";



import * as actions from "./actions";
import * as appActions from "../../containers/App/actions";

import reducer from './reducer';
import saga from './saga';
import * as modalNames from "../../components/modals/names";

const aaa = (values) => {
    console.log(values);
}

/* eslint-disable react/prefer-stateless-function */
class NavBar extends React.PureComponent {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            tooltipOpen: false,
        };
    }
    toggle() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }
    render() {

        const {user} = this.props;

        const avatar = user && user.image || avatarDefault;
        console.log(user);
        console.log(avatar);
        return (
            <div className="navbar-component outline-danger">
                <div className="max-width outline-danger d-flex justify-content-between">

                    <section className="logo outline-danger">
                        <a href="/"> <img src={Logo} alt="Denteez logo" /> </a>
                    </section>

                    <section className="search outline-danger w-100">
                        <SearchForm
                            form="header_search_form"
                            onSubmit={aaa}
                            placeholder="Company Name"
                        />
                    </section>

                    <section className="navigation d-flex justify-content-end outline-danger ">
                        <div className="msg outline-danger">

                            <button className="msg-btn" id="msgBtn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="22" viewBox="0 0 26 22">
                                    <path
                                        id="Chat"
                                        d="M855,43s-2.7.01-5.014,0.01c0.011,0.959.008,2.472-.013,2.61a0.734,0.734,0,0,1-.959.291A11.147,11.147,0,0,1,846.938,43H842c-0.827,0-.985-0.321-0.985-1.153V40.984c0.242,0.009,1.033.028,1.033,0.028l-0.034.977L847.937,42,849,44V42.006h6V33.019h-6.02V32.035H854.5A1.245,1.245,0,0,1,856,33.2v8.654C856,42.683,855.827,43,855,43Zm-13.985-2.025h-1.609c-0.692.61-1.972,1.731-2.669,2.308A0.7,0.7,0,0,1,835.81,43c-0.021-.138-0.024-1.058-0.013-2.017h-4.672A0.942,0.942,0,0,1,830,39.847V25.1c0-.832.14-1.1,0.967-1.1h16.983c0.826,0,1.028.237,1.028,1.069V39.223a1.817,1.817,0,0,1-1.591,1.756h-6.374v0.005C840.932,40.981,840.912,40.979,841.015,40.979Zm6.941-1,0.034-14.954L831,25.035V39.979h5.945l0.012,1.961,2.02-1.961h8.976Zm-13.3-4.4V35.54a0.54,0.54,0,0,1,.511-0.545h9.065a0.557,0.557,0,0,1,.511.563v0.026a0.456,0.456,0,0,1-.511.443h-9.065A0.456,0.456,0,0,1,834.657,35.583Zm7.33-5.55h-6.819a0.456,0.456,0,0,1-.511-0.443V29.546A0.54,0.54,0,0,1,835.168,29h6.819a0.557,0.557,0,0,1,.511.563V29.59A0.457,0.457,0,0,1,841.987,30.033Zm-6.819,1.981h4.573a0.528,0.528,0,0,1,.511.532v0.025a0.456,0.456,0,0,1-.511.443h-4.573a0.456,0.456,0,0,1-.511-0.443V32.527A0.512,0.512,0,0,1,835.168,32.013Z"
                                        transform="translate(-830 -24)"
                                    />
                                </svg>
                            </button>
                            <UncontrolledTooltip
                                className="navbar-tooltip"
                                placement="bottom"
                                target="msgBtn"
                            >
                                No new messages

                            </UncontrolledTooltip>
                        </div>

                        <div className="notif outline-danger">
                            <button className="notif-btn" id="notifBtn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path
                                        id="Notifications"
                                        d="M899.924,42.677a0.7,0.7,0,0,1-.642.375H876.738a0.7,0.7,0,0,1-.642-0.375,1.283,1.283,0,0,1-.091-0.493,0.706,0.706,0,0,1,.144-0.4,16.377,16.377,0,0,0,2.108-4.369A31.868,31.868,0,0,0,880,31c0.222-1.694.469-3.386,1.241-4.3a7.437,7.437,0,0,1,1.336-1.241,8.252,8.252,0,0,1,2.762-1.332,2.6,2.6,0,0,1,.943-1.512A2.669,2.669,0,0,1,888,22a2.7,2.7,0,0,1,1.728.608,2.576,2.576,0,0,1,.956,1.512,8.244,8.244,0,0,1,2.749,1.332,7.342,7.342,0,0,1,1.335,1.241,8,8,0,0,1,1.7,4.047,42.515,42.515,0,0,0,1.284,6.67,17.086,17.086,0,0,0,2.12,4.527,0.665,0.665,0,0,1,.131.388A0.85,0.85,0,0,1,899.924,42.677Zm-3.758-5.587a52.606,52.606,0,0,1-1.152-6.166,6.667,6.667,0,0,0-1.44-3.413,6,6,0,0,0-1.165-1.021,7.232,7.232,0,0,0-2.566-1.1,0.717,0.717,0,0,1-.563-0.685V24.68A1.256,1.256,0,0,0,888,23.439a1.271,1.271,0,0,0-1.283,1.241v0.026a0.691,0.691,0,0,1-.537.685,7.318,7.318,0,0,0-2.579,1.1,6.02,6.02,0,0,0-2.6,4.434,57.621,57.621,0,0,1-1.152,6.179A21.267,21.267,0,0,1,878,42h20A21.842,21.842,0,0,1,896.166,37.09Zm-6.657,8.285a2.016,2.016,0,0,1-1.5.631,2.075,2.075,0,0,1-1.516-.631,2.011,2.011,0,0,1-.626-1.483h4.269A2.052,2.052,0,0,1,889.509,45.375Z"
                                        transform="translate(-876 -22)"
                                    />
                                </svg>
                            </button>
                            <UncontrolledTooltip
                                className="navbar-tooltip"
                                placement="bottom"
                                target="notifBtn"
                            >
                                No new notifications

                            </UncontrolledTooltip>
                        </div>
                        <div id="avatarArea" className="avatar outline-danger text-nowrap text-truncate" >
                            <button className="avatar-btn">
                                <img src={avatar} width="32" height="32" alt="user avatar" />
                            </button>

                            {user &&
                                <span className="">
                                    {user.first_name} {user.last_name}
                                </span>
                            }

                            <Tooltip
                                className="top-navbar-menu"
                                isOpen={this.state.tooltipOpen}
                                toggle={this.toggle}
                                autohide={false}
                                placement="bottom"
                                target="avatarArea"
                            >
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Link 1</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Link 2</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Link 3</a>
                                    </li>
                                </ul>

                            </Tooltip>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export const mapDispatchToProps = (dispatch) => ({
    postEnquiry: (values) => dispatch(actions.postEnquiry(values)),
    login: (values) => dispatch(appActions.login(values)),
    showAlert: (modalName, data) => dispatch(appActions.showAlert(modalName, data)),

    /* -------------------- withData hoc ---------------------------------- */
    getData: () => {
        dispatch(actions.loadEnquiryTypes());
    },
    // clearState: () => dispatch(actions.clearClientState()),
    /* -------------------- withData hoc ---------------------------------- */
});


const mapStateToProps = createStructuredSelector({
    enquiryTypes: makeSelectEnquiryTypes(),
    user: makeSelectUser(),
    loading: makeSelectLoading(),
    isLoggedIn: makeSelectIsLoggedIn(),
    location: makeSelectLocation(),
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

const withReducer = injectReducer({key: 'navbar', reducer});
const withSaga = injectSaga({key: 'navbar', saga});

export default compose(
    withReducer,
    withSaga,
    withSignal,
    withConnect,
)(withData(NavBar));
