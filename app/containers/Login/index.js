
import React from 'react';

import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import {Button} from 'reactstrap';

import {Link} from "react-router-dom";
import Logo from 'images/logo-img.svg';

import withData from "hocs/withData";
import { history } from 'app';


import {makeSelectIsLoggedIn, makeSelectLoading, makeSelectLocation} from 'containers/App/selectors';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
    withSignal,
} from 'redux-signal'

import * as modalNames from 'components/modals/names';
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
            enquiry_type: 'Other',
        };

        if (props.location.pathname === '/') {
            history.push('/login');
        }
    }


    render() {
        const {enquiryTypes, currentEnqType, loading, isLoggedIn, location: {pathname}} = this.props;


        const signup = {message:'This page is in development', description:'...'};

        return (
            <div className="login-container">
                <section className="land-top">
                    <div className="max-width">
                        <div className="content navbar">
                            <a className="logo" href="/"> <img src={Logo} alt="Denteez logo" /> </a>
                            {pathname === '/login/support' ?
                                <Button color="success" size="sm" tag={Link} to="/login">Log In Now</Button>
                                :
                                <Button
                                    color="success"
                                    size="sm"
                                    onClick={() => this.props.showAlert(modalNames.INFO_MODAL, signup)}
                                >
                                    Sign up now
                                </Button>
                            }
                        </div>

                        <h1 className="text-truncate">Home of Dentistry</h1>
                        <h6>
                            Denteez was created by dentists for dentistry in order to
                            make the life of everyone involved in dentistry easier.
                        </h6>
                    </div>

                </section>

                <section className="land-middle">
                    <div className="max-width">
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
                    </div>
                </section>

                <section className="land-bottom">
                    <div className="max-width">
                        <h2 className="text-truncate">About Denteez</h2>

                        <div className="row no-gutters text-left">
                            <div className="col-6">
                                <p>
                                    Why is it always so difficult to find what you are looking for in dentistry? Whether it is
                                    the latest advancement in technology or techniques or simply a review or
                                    understanding of the vast amount of products? Perhaps finding someone to just fix
                                    your broken equipment or simply hiring new staff or looking for that new job?
                                </p>
                            </div>
                            <div className="col-6">
                                <p>
                                    Our mission is to give every dental professional the possibility to discuss and share all
                                    aspects of their profession, their practice and their business. We aim to make the world
                                    of dentistry easy and accessible, so every dental professional can find what they are
                                    looking for quickly and easily all in one place.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

Login.propTypes = {

};


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

const withReducer = injectReducer({key: 'login', reducer});
const withSaga = injectSaga({key: 'login', saga});

export default compose(
    withReducer,
    withSaga,
    withSignal,
    withConnect,
)(withData(Login));
