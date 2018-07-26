import React from 'react';
import * as modalNames from 'components/modals/names';

import {Link} from "react-router-dom";

import './style.scss';

const Footer = (props) => {

    const privacy = {message:'Privacy Policy', description:'Privacy Policy'};
    const terms = {message:'Terms of use', description:'Terms of use'};

    return (
        <footer className="footer-component">
            <div className="d-flex justify-content-between max-width">
                <div className="copy">
                    Denteez Copyright 2015
                </div>
                <div className="nav">
                    <Link to="/login/support">Support</Link>
                    <a
                        href="#"
                        onClick={(e) => {e.preventDefault(); props.showAlert(modalNames.INFO_MODAL, privacy)}}
                    >
                        Privacy Policy
                    </a>
                    <a
                        href="#"
                        onClick={(e) => {e.preventDefault(); props.showAlert(modalNames.INFO_MODAL, terms)}}
                    >
                        Terms of use
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
