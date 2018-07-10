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
import {Link} from "react-router-dom";
import uuidv5 from "uuid/v5";
import Demo from "components/componentsSignal/Demo";


import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
    makeSelectRepos,
    makeSelectLoading,
    makeSelectError,
} from 'containers/App/selectors';

import {
    withSignal,
    // withSignalPropTypes,
    SignalTypes,
    eventHandler,
} from 'reduxSignal'

import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import {loadRepos} from '../App/actions';
import {changeUsername} from './actions';
import {makeSelectUsername} from './selectors';
import reducer from './reducer';
import saga from './saga';



const ServerErrorEvent = eventHandler();

const onYes = () => {
    console.log('pressed yes')
}

const onNo = () => {
    console.log('pressed no')
}


import EnquiryForm from "./components/EnquiryForm";


const login = (values) => alert(`It's a map thanks to immutables with redux-form: ${values}`);

/* eslint-disable react/prefer-stateless-function */
export class Enquiry extends React.PureComponent {

    /**
     * when initial state username is not null, submit the form to load repos
     */
    componentDidMount() {
        if (this.props.username && this.props.username.trim().length > 0) {
            this.props.onSubmitForm();
        }
    }

    onBtnErrorClick = () => {
        console.log(this.props);
        this.props.createSignal({
            type: SignalTypes.YES_NO,
            title: 'Are you sure?',
            message: 'You are about to do something, are you sure?',
            labels: {
                yes: 'Yes!',
                no: 'No',
            },
            eventHandler: ServerErrorEvent,
            className: 'modal-danger',
        })
    }

    render() {
        const {loading, error, repos} = this.props;
        const reposListProps = {
            loading,
            error,
            repos,
        };

        console.log(this.props);

        return (
            <article>
                <Helmet>
                    <title>Enquiry Page</title>
                    <meta
                        name="description"
                        content="Denteez"
                    />
                </Helmet>
                <div>
                    <CenteredSection>
                        <H2>
                            <FormattedMessage {...messages.startProjectHeader} />
                        </H2>
                        <p>
                            <FormattedMessage {...messages.startProjectMessage} />
                        </p>

                        <Demo />

                        <Button
                            onClick={this.onBtnErrorClick}>
                            show modal
                        </Button>

                        <ServerErrorEvent
                            onNo={onNo}
                            onYes={onYes}
                        />

                        <Button color="primary" tag={Link} to="/login">login</Button>

                        <Link to={`/login`}>llllllll</Link>

                        <Button size="sm"
                            color="success" onClick={async () => {
                            // const aaa = await fetchCategories().then(res => res.data).catch(e => e.response.data);
                            // const aaa = await fetchCategory(1).then(res => res.data).catch(e => e.response.data);
                                const aaa = await fetchFriends({
                                    per_page: 10,
                                }).then(res => res.data).catch(e => e.response.data);

                                console.log(aaa);

                            }}>Add New Service</Button>

                        <Button size="sm" color="primary" onClick={async () => {

                            console.log(uuidv5('aaaaa', uuidv5.DNS));

                        }}>test uuid</Button>

                        <div className="p-3 mb-3 swatch-indigo">Indigo</div>

                        <div className="col-2 text-truncate">
                            Praeterea iter est quasdam res quas ex communi.
                        </div>

                        <p>Somewhere in here is a <a href="#" id="UncontrolledTooltipExample">tooltip</a>.</p>
                        <UncontrolledTooltip placement="right" target="UncontrolledTooltipExample">
                            Hello world!
                        </UncontrolledTooltip>

                    </CenteredSection>
                    <Section>
                        <H2>
                            <FormattedMessage {...messages.trymeHeader} />
                        </H2>
                        <Form onSubmit={this.props.onSubmitForm}>
                            <label htmlFor="username">
                                <FormattedMessage {...messages.trymeMessage} />
                                <AtPrefix>
                                    <FormattedMessage {...messages.trymeAtPrefix} />
                                </AtPrefix>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="mxstbr"
                                    value={this.props.username}
                                    onChange={this.props.onChangeUsername}
                                />
                            </label>
                        </Form>
                        <ReposList {...reposListProps} />
                    </Section>

                    <EnquiryForm onSubmit={login} />
                    {/*<ImmutableForm onSubmit={login} />*/}
                    {/*<LoginForm onSubmit={login} />*/}
                    {/*<SimpleForm onSubmit={showResults} />*/}
                </div>
            </article>
        );
    }
}

Enquiry.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
    onSubmitForm: PropTypes.func,
    username: PropTypes.string,
    onChangeUsername: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
    return {
        onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
        onSubmitForm: evt => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(loadRepos());
        },
    };
}

const mapStateToProps = createStructuredSelector({
    repos: makeSelectRepos(),
    username: makeSelectUsername(),
    loading: makeSelectLoading(),
    error: makeSelectError(),
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

const withReducer = injectReducer({key: 'enquiry', reducer});
const withSaga = injectSaga({key: 'enquiry', saga});

export default compose(
    withReducer,
    withSaga,
    withConnect,
    withSignal,
)(Enquiry);
