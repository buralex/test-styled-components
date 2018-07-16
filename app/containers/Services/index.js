
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

import withData from "hocs/withData";

import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import {logout} from 'containers/App/actions';
import {changeUsername} from './actions';
import {makeSelectUsername} from './selectors';

import reducer from './reducer';
import saga from './saga';
import * as appActions from "containers/App/actions";


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


                        <Button
                            color="success" onClick={async () => {
                            // const aaa = await fetchCategories().then(res => res.data).catch(e => e.response.data);
                            // const aaa = await fetchCategory(1).then(res => res.data).catch(e => e.response.data);
                                const aaa = await fetchFriends({
                                    per_page: 10,
                                }).then(res => res.data).catch(e => e.response.data);

                                console.log(aaa);

                            }}>Add New Service</Button>

                        <Button color="success" onClick={this.props.logout}>logout</Button>

                        <div className="p-3 mb-3 swatch-indigo">Indigo</div>

                        <Button color="danger" onClick={this.toggle}>mmmmmmm</Button>
                        <div className="col-2 text-truncate">
                            Praeterea iter est quasdam res quas ex communi.
                        </div>

                    </CenteredSection>

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


export const mapDispatchToProps = (dispatch) => ({
    onSubmitForm: (values) => dispatch(appActions.login(values)),
    logout: () => dispatch(logout()),
});

const mapStateToProps = createStructuredSelector({
    loading: makeSelectLoading(),
    error: makeSelectError(),
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withConnect,
)(HomePage);
