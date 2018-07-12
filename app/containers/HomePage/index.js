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

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
    makeSelectRepos,
    makeSelectLoading,
    makeSelectError,
} from 'containers/App/selectors';
import H2 from 'components/H2';

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
import uuidv5 from "uuid/v5";
import {Link} from "react-router-dom";


/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {
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
            this.props.onSubmitForm();
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

        return (
            <article>
                <Helmet>
                    <title>Home Page</title>
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

                        <Button
                            color="success" onClick={async () => {
                            // const aaa = await fetchCategories().then(res => res.data).catch(e => e.response.data);
                            // const aaa = await fetchCategory(1).then(res => res.data).catch(e => e.response.data);
                                const aaa = await fetchFriends({
                                    per_page: 10,
                                }).then(res => res.data).catch(e => e.response.data);

                                console.log(aaa);

                            }}>Add New Service</Button>

                        <div className="p-3 mb-3 swatch-indigo">Indigo</div>

                        <Button color="danger" onClick={this.toggle}>mmmmmmm</Button>
                        <div className="col-2 text-truncate">
                            Praeterea iter est quasdam res quas ex communi.
                        </div>
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                            <ModalBody>
                                Lorem ud exercitation ullamco lab
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                            </ModalFooter>
                        </Modal>

                        <p>Somewhere in here is a <a href="#" id="UncontrolledTooltipExample">tooltip</a>.</p>
                        <UncontrolledTooltip placement="right" target="UncontrolledTooltipExample">
                            Hello world!
                        </UncontrolledTooltip>
                        <CenteredSection>
                            <H2>
                                <FormattedMessage {...messages.startProjectHeader} />
                            </H2>
                            <p>
                                <FormattedMessage {...messages.startProjectMessage} />
                            </p>

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

                    </Section>
                </div>
            </article>
        );
    }
}

HomePage.propTypes = {
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

const withReducer = injectReducer({key: 'home', reducer});
const withSaga = injectSaga({key: 'home', saga});

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(HomePage);
