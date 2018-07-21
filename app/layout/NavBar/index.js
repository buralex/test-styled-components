import React from 'react';

import SearchForm from 'components/SearchForm';

import Logo from 'images/logo-img.svg';

import {
    Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Tooltip, UncontrolledTooltip
} from 'reactstrap';

import './style.scss';

const aaa = (values) => {
    console.log(values);
}

/* eslint-disable react/prefer-stateless-function */
export default class NavBar extends React.PureComponent {
    render() {
        return (
            <div className="navbar-component outline-danger">
                <div className="max-width outline-danger d-flex justify-content-between">

                    <section className="logo outline-danger">
                        <a href="/"> <img src={Logo} alt="Denteez logo" /> </a>
                    </section>

                    <section className="search outline-danger w-100">
                        <SearchForm
                            form="header_search_form"
                            onSubmit={aaa}
                            placeholder="Company Name"
                        />
                    </section>

                    <section className="navigation d-flex outline-danger ">
                        <div className="msg outline-danger">
                            <button className="msg-btn"></button>
                        </div>
                        <div className="notif outline-danger">
                            <button className="notif-btn"></button>
                        </div>
                        <div className="avatar outline-danger">
                            <button className="avatar-btn"></button>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

