/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import {Button} from 'reactstrap';

import {Link} from 'react-router-dom';

import { makeSelectLoading } from 'containers/App/selectors';

import * as appActions from 'containers/App/actions';



import AboutContent from "layout/AboutContent";
import LoginForm from "./components/LoginForm";

import './style.scss';

class Login extends React.PureComponent {

    render() {
        const {loading} = this.props;

        console.log('RENDER LOGIN PAGE ...',this.props);

        return (
            <div className="login-container outline-danger">

                <section className="land-top">
                    <Button color="success" size="sm" tag={Link} to="/about">about</Button>
                </section>

                <section className="land-middle">
                    <LoginForm loading={loading} onSubmit={this.props.onSubmitForm} />
                </section>

                <AboutContent />
            </div>
        );
    }
}

Login.propTypes = {
    onSubmitForm: PropTypes.func,
};

export const mapDispatchToProps = (dispatch) => ({
    onSubmitForm: (values) => dispatch(appActions.login(values)),
});


const mapStateToProps = createStructuredSelector({
    loading: makeSelectLoading(),
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);


export default compose(
    withConnect,
)(Login);
