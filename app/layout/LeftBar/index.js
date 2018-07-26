import React from 'react';
import {Link} from "react-router-dom";
import * as modalNames from "components/modals/names";

import './style.scss';

import Add1 from './images/add1.png';

import Companies from './Companies';


export default function LeftBar(props) {

    const {companies} = props.suggestions;

    const privacy = {message:'Privacy Policy', description:'Privacy Policy'};
    const terms = {message:'Terms of use', description:'Terms of use'};

    return (
        <div className="left-bar-component">

            <ul className="navbar">
                <li className="nav-item">
                    <a className="nav-link feed" href="#">Feed</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link ask" href="#">Ask a Colleague</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link comp" href="#">Companies</a>
                </li>
                <li className="nav-item">
                    <Link className="nav-link serv" to="/services">Service Directory</Link>
                </li>
            </ul>

            <p>Advertisement</p>

            <div>
                <img src={Add1} alt="addvert" />

                <p className="small text-white-two">Ads By Denteez.com</p>
            </div>

            <hr/>

            <Companies />

            <hr/>

            <div className="footer">
                <div className="copy">
                    Denteez Copyright 2015
                </div>
                <div className="nav">
                    <a
                        href="#"
                        onClick={(e) => {e.preventDefault(); props.showAlert(modalNames.INFO_MODAL, terms)}}
                    >
                        Terms of use
                    </a>

                    <a
                        href="#"
                        onClick={(e) => {e.preventDefault(); props.showAlert(modalNames.INFO_MODAL, privacy)}}
                    >
                        Privacy Policy
                    </a>
                </div>
            </div>

        </div>
    );
}

