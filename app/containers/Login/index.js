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

//const login = (values) => console.log(`It's a map thanks to immutables with redux-form: ${values}`);

/* eslint-disable react/prefer-stateless-function */
export class Login extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
        };

        this.toggle = this.toggle.bind(this);
    }

    /**
     * when initial state username is not null, submit the form to load repos
     */
    componentDidMount() {
        if (this.props.username && this.props.username.trim().length > 0) {
            //this.props.onSubmitForm();
        }
    }

    toggle() {
        this.setState({
            modal: !this.state.modal,
        });
    }

    render() {
        const {loading, error, repos} = this.props;
        const reposListProps = {
            loading,
            error,
            repos,
        };

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

                        <div className="p-3 mb-3 swatch-indigo">Indigo</div>

                        <Button color="success" onClick={this.toggle}>mmmmmmm</Button>
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
    loading: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
    onSubmitForm: PropTypes.func,
    username: PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
    return {
        onSubmitForm: values => {
            console.log(values.toJS());
            dispatch(appActions.login(values));
        },
    };
}


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


const withReducer = injectReducer({key: 'login', reducer});
// const withSaga = injectSaga({key: 'login', saga});

export default compose(
    withReducer,
    // withSaga,
    withConnect,
)(Login);
