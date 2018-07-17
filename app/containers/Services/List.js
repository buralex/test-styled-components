
import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Tooltip, UncontrolledTooltip} from 'reactstrap';
import restApi, {fetchCategories, fetchCategory, fetchFriends} from 'services/api';

import {
    makeSelectLoading,
} from 'containers/App/selectors';

import withData from "hocs/withData";

import Greetingbackground from "layout/Greetingbackground";


import * as appActions from "containers/App/actions";
import {withSignal} from "redux-signal";


import * as actions from "./actions";
import {makeSelectCategories} from './selectors';



class List extends React.PureComponent {
    constructor(props) {
        super(props);

    }

    componentDidUpdate(prevProps) {

    }


    render() {
        const {loading, categories} = this.props;

        console.log('<<<<<<<<<<<<<<<<<  RENDER LIST >>>>>>>>>>>>>>>>>', this.props);

        console.log(categories);
        return (
            <article>
                <Greetingbackground>
                    aaaaaaaaaaaaaaaaaaaaaddddddddsssssss
                </Greetingbackground>
                {categories.map((cat) => {
                    console.log(cat);

                    return <Button color="silver-two" >{cat.title}</Button>
                })}
                {/*<div>*/}
                    {/*<Button*/}
                        {/*color="success" onClick={async () => {*/}
                        {/*// const aaa = await fetchCategories().then(res => res.data).catch(e => e.response.data);*/}
                        {/*// const aaa = await fetchCategory(1).then(res => res.data).catch(e => e.response.data);*/}
                        {/*const aaa = await fetchFriends({*/}
                            {/*per_page: 10,*/}
                        {/*}).then(res => res.data).catch(e => e.response.data);*/}

                        {/*console.log(aaa);*/}

                    {/*}}>Add New Service</Button>*/}

                    {/*<Button color="success" onClick={this.props.logout}>logout</Button>*/}

                    {/*<div className="p-3 mb-3 swatch-indigo">Indigo</div>*/}

                    {/*<div className="col-2 text-truncate">*/}
                        {/*Praeterea iter est quasdam res quas ex communi.*/}
                    {/*</div>*/}

                {/*</div>*/}
            </article>
        );
    }
}

List.propTypes = {
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
)(withData(List));
