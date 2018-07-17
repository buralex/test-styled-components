/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Tooltip, UncontrolledTooltip} from 'reactstrap';
import restApi, {fetchCategories, fetchCategory, fetchFriends} from 'services/api';
import { push } from 'react-router-redux';
import {Link} from 'react-router-dom';

import { makeSelectLoading } from 'containers/App/selectors';

import * as appActions from 'containers/App/actions';

import LoadingBeat from 'components/LoadingBeat';

import Greetingbackground from "layout/Greetingbackground";

import LoginForm from "./components/LoginForm";


/* eslint-disable react/prefer-stateless-function */
class Login extends React.PureComponent {


    render() {
        const {loading} = this.props;

        console.log('RENDER LOGIN PAGE ...',this.props);

        return (
            <Greetingbackground>
                <div className="col login-container">
                    <Button color="primary" tag={Link} to="/about">about</Button>

                    <LoginForm loading={loading} onSubmit={this.props.onSubmitForm} />
                    <LoadingBeat loading={loading} />
                </div>
            </Greetingbackground>
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
