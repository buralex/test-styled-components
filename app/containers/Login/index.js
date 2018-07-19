
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
import Logo from 'images/logo-img.svg';
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

import SupportForm from "./components/SupportForm";

import LoginForm from "./components/LoginForm";


import "./style.scss";

class Login extends React.PureComponent {
    constructor(props) {
        super(props);

        this.initValues = {
            department: 1,
            enquiry_type: 'Other',
        };

        if (props.location.pathname === '/') {
            history.push('/login');
        }
    }

    render() {
        const {enquiryTypes, currentEnqType, loading, isLoggedIn, location: {pathname}} = this.props;
        //
        // if (!enquiryTypes.length) {
        //     return null;
        // }

        console.log('RENDER ABccccccccccccOUT >>>');
        console.log(pathname);
        // console.log(enquiryTypes);
        //
        // console.log(this.props);

        return (
            <div className="login-container">

                <section className="land-top">
                    <a className="logo" href="/"> <img src={Logo} alt="Denteez logo" /> </a>
                    {pathname === '/login/support' ?
                        <Button color="success" size="sm" tag={Link} to="/login">Log In Now</Button>
                        :
                        <Button color="success" size="sm" tag={Link} to="/login">Sign up now</Button>
                    }

                </section>

                <section className="land-middle">

                    {pathname.includes('support') &&
                        <SupportForm
                            loading={loading}
                            initialValues={this.initValues}
                            onSubmit={this.props.postEnquiry}
                            enquiryTypes={enquiryTypes}
                            isEnqTypeOther={currentEnqType === 'Other'}
                        />
                    }

                    {!pathname.includes('support') &&
                        <LoginForm loading={loading} onSubmit={this.props.login} />
                    }

                </section>

                <section className="land-bottom text-center">
                    <h2 className="text-truncate">About Denteez</h2>

                    <div className="d-flex justify-content-between">
                        <p>
                            Why is it always so difficult to find what you are looking for in dentistry? Whether it is
                            the latest advancement in technology or techniques or simply a review or
                            understanding of the vast amount of products? Perhaps finding someone to just fix
                            your broken equipment or simply hiring new staff or looking for that new job?
                        </p>
                        <p>
                            Our mission is to give every dental professional the possibility to discuss and share all
                            aspects of their profession, their practice and their business. We aim to make the world
                            of dentistry easy and accessible, so every dental professional can find what they are
                            looking for quickly and easily all in one place.
                        </p>
                    </div>
                </section>

            </div>
        );
    }
}

Login.propTypes = {
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

const withReducer = injectReducer({key: 'login', reducer});
const withSaga = injectSaga({key: 'login', saga});

export default compose(
    withReducer,
    withSaga,
    withSignal,
    withConnect,
)(withData(Login));
