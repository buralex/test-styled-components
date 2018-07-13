/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
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


import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
    makeSelectRepos,
    makeSelectLoading,
    makeSelectError,
} from 'containers/App/selectors';

import * as appActions from 'containers/App/actions';

import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';

import {changeUsername} from './actions';
import {makeSelectUsername} from './selectors';
import reducer from './reducer';
import saga from './saga';

import LoginForm from "./components/LoginForm";


/* eslint-disable react/prefer-stateless-function */
export class Login extends React.PureComponent {

    render() {
        //const {loading, error, repos} = this.props;

        console.log('RENDER LOGIN PAGE',this.props);

        return (
            <article>
                <Helmet>
                    <title>Login Page</title>
                    <meta
                        name="description"
                        content="Denteez"
                    />
                </Helmet>
                <div>
                    <CenteredSection>
                        <Button size="sm"
                            color="success" onClick={async () => {
                            // const aaa = await fetchCategories().then(res => res.data).catch(e => e.response.data);
                            // const aaa = await fetchCategory(1).then(res => res.data).catch(e => e.response.data);
                                const aaa = await fetchFriends({
                                    per_page: 10,
                                }).then(res => res.data).catch(e => e.response.data);

                                console.log(aaa);

                            }}>Add New Service</Button>

                        <Button color="primary" tag={Link} to="/enquiry">enquiry</Button>
                        <div className="col-2 text-truncate">
                            Praeterea iter est quasdam res quas ex communi.
                        </div>

                        <p>Somewhere in here is a <a href="#" id="UncontrolledTooltipExample">tooltip</a>.</p>
                        <UncontrolledTooltip placement="right" target="UncontrolledTooltipExample">
                            Hello world!
                        </UncontrolledTooltip>

                    </CenteredSection>

                    <LoginForm onSubmit={this.props.onSubmitForm} />

                </div>
            </article>
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
    // repos: makeSelectRepos(),
    // username: makeSelectUsername(),
    // loading: makeSelectLoading(),
    // error: makeSelectError(),
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);


//const withReducer = injectReducer({key: 'login', reducer});
// const withSaga = injectSaga({key: 'login', saga});

export default compose(
    //withReducer,
    // withSaga,
    withConnect,
)(Login);
