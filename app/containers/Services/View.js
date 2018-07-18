import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';

import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import {Button} from 'reactstrap';


import {
    makeSelectLoading,
} from 'containers/App/selectors';

import withData from "hocs/withData";


import * as appActions from "containers/App/actions";
import {withSignal} from "redux-signal";


import * as actions from "./actions";
import {makeSelectCategories} from './selectors';


class View extends React.PureComponent {

    render() {
        const {categories, loading} = this.props;

        console.log('<<<<<<<<<<<<<<<<<  RENDER VIEW >>>>>>>>>>>>>>>>>', this.props);

        console.log(categories);
        console.log(loading);
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

View.propTypes = {
    loading: PropTypes.bool,
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
    loading: makeSelectLoading(),
    categories: makeSelectCategories(),
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withSignal,
    withConnect,
)(withData(View));
