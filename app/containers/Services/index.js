
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
    makeSelectLoading,
    makeSelectError,
} from 'containers/App/selectors';

import withData from "hocs/withData";


import * as appActions from "containers/App/actions";
import {withSignal} from "redux-signal";



import reducer from './reducer';
import saga from './saga';



import * as actions from "./actions";
import {makeSelectCategories} from './selectors';



class Services extends React.PureComponent {
    constructor(props) {
        super(props);

    }

    /**
     * when initial state username is not null, submit the form to load repos
     */
    componentDidMount() {

    }


    render() {
        const {loading, error, categories} = this.props;

        console.log('RENDER SERVICES >>>>>>>>>>>>>>>>>');

        console.log(categories);
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

                    <div className="col-2 text-truncate">
                        Praeterea iter est quasdam res quas ex communi.
                    </div>

                </div>
            </article>
        );
    }
}

Services.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
    onSubmitForm: PropTypes.func,
    username: PropTypes.string,
};


export const mapDispatchToProps = (dispatch) => ({
    onSubmitForm: (values) => dispatch(appActions.login(values)),
    logout: () => dispatch(appActions.logout()),

    /* -------------------- withData hoc ---------------------------------- */
    getData: () => {
        dispatch(actions.loadCategories());
    },
    // clearState: () => dispatch(actions.clearClientState()),
    /* -------------------- withData hoc ---------------------------------- */
});

const mapStateToProps = createStructuredSelector({
    //loading: makeSelectLoading(),
    error: makeSelectError(),
    categories: makeSelectCategories(),
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

const withReducer = injectReducer({key: 'services', reducer});
const withSaga = injectSaga({key: 'services', saga});

export default compose(
    withReducer,
    withSaga,
    withSignal,
    withConnect,
)(withData(Services));
