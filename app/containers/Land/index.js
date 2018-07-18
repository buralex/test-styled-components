
import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Tooltip, UncontrolledTooltip} from 'reactstrap';
import restApi, {fetchCategories, fetchCategory, fetchFriends, fetchEnquiryTypes} from 'services/api';
import {Link} from "react-router-dom";

import uuidv5 from "uuid/v5";
import withData from "hocs/withData";
import { history } from 'app';


import {makeSelectIsLoggedIn, makeSelectLoading, makeSelectLocation} from 'containers/App/selectors';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
    withSignal,
    // withSignalPropTypes,
    SignalTypes,
    eventHandler,
} from 'redux-signal'


import * as appActions from "containers/App/actions";
import * as actions from './actions';
import {makeSelectEnquiryTypes, makeSelectCurrentEnqType} from './selectors';

import reducer from './reducer';
import saga from './saga';

import AboutForm from "./components/AboutForm";
import LandBottom from "./components/LandBottom";

import LoginForm from "./components/LoginForm";


import "./style.scss";

class Land extends React.PureComponent {
    constructor(props) {
        super(props);

        this.initValues = {
            department: 1,
            enquiry_type: 'Other',
        };

        if (!props.location.pathname.includes('login')) {
            history.push('/about');
        }
    }

    render() {
        const {enquiryTypes, currentEnqType, loading, isLoggedIn, location: {pathname}} = this.props;
        //
        // if (!enquiryTypes.length) {
        //     return null;
        // }

        console.log('RENDER ABOUT >>>');
        console.log(pathname);
        // console.log(enquiryTypes);
        //
        // console.log(this.props);

        return (
            <div className="land-container outline-danger">

                <section className="land-top">
                    <Button color="success" size="sm" tag={Link} to="/about">about</Button>
                    {!isLoggedIn &&
                    <Button color="success" tag={Link} to="/login">login</Button>
                    }
                </section>

                <section className="land-middle">

                    {pathname.includes('about') &&
                        <AboutForm
                            loading={loading}
                            initialValues={this.initValues}
                            onSubmit={this.props.postEnquiry}
                            enquiryTypes={enquiryTypes}
                            isEnqTypeOther={currentEnqType === 'Other'}
                        />
                    }

                    {pathname.includes('login') &&
                        <LoginForm loading={loading} onSubmit={this.props.login} />
                    }

                </section>

                <section className="land-bottom text-center">
                    <LandBottom />
                </section>

            </div>
        );
    }
}

Land.propTypes = {
    // loading: PropTypes.bool,
    // error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    // repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
    // onSubmitForm: PropTypes.func,
    // username: PropTypes.string,
};


export const mapDispatchToProps = (dispatch) => ({
    postEnquiry: (values) => dispatch(actions.postEnquiry(values)),
    login: (values) => dispatch(appActions.login(values)),

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

const withReducer = injectReducer({key: 'land', reducer});
const withSaga = injectSaga({key: 'land', saga});

export default compose(
    withReducer,
    withSaga,
    withSignal,
    withConnect,
)(withData(Land));
