import React from 'react';
import {compose} from "redux";
import {withSignal} from "redux-signal";

import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import SearchForm from 'components/SearchForm';
import Logo from 'images/logo-img.svg';

import {
    Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Tooltip, UncontrolledTooltip
} from 'reactstrap';

import './style.scss';



import {makeSelectIsLoggedIn, makeSelectLoading, makeSelectLocation} from "../../containers/App/selectors";
import injectReducer from "../../utils/injectReducer";

import {makeSelectCurrentEnqType, makeSelectEnquiryTypes} from "../../containers/Login/selectors";
import withData from "../../hocs/withData";
import injectSaga from "../../utils/injectSaga";


import * as actions from "./actions";
import * as appActions from "../../containers/App/actions";

import reducer from './reducer';
import saga from './saga';

const aaa = (values) => {
    console.log(values);
}

/* eslint-disable react/prefer-stateless-function */
class NavBar extends React.PureComponent {
    render() {
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

                    <section className="navigation d-flex outline-danger ">
                        <div className="msg outline-danger">
                            <button className="msg-btn"></button>
                        </div>
                        <div className="notif outline-danger">
                            <button className="notif-btn"></button>
                        </div>
                        <div className="avatar outline-danger">
                            <button className="avatar-btn"></button>
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
    currentEnqType: makeSelectCurrentEnqType(),
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
