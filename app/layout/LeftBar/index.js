import React from 'react';
import {Link} from "react-router-dom";
import * as modalNames from "components/modals/names";

import './style.scss';

import Add1 from './images/add1.png';
import Img9 from './images/9.png';
import Img10 from './images/10.png';
import Img11 from './images/11.png';


export default function LeftBar(props) {

    const {companies} = props.suggestions;

    const privacy = {message:'Privacy Policy', description:'Privacy Policy'};
    const terms = {message:'Terms of use', description:'Terms of use'};

    return (
        <div className="left-bar-component outline-danger">

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
                    <a className="nav-link serv" href="#">Service Directory</a>
                </li>
            </ul>

            <p>Advertisement</p>

            <div>
                <img src={Add1} alt="addvert" />

                <p className="small text-white-two">Ads By Denteez.com</p>
            </div>

            <hr/>

            <div className="d-flex justify-content-between align-items-baseline">
                <p>Featured Companies</p>
                <Link className="see-all" to="#">See All</Link>
            </div>

            <div className="company-card clearfix">
                <img src={Img9} alt="company" />
                <caption className="float-right">
                    <p className="name">Company Name</p>
                    <p>Manufacturer</p>
                    <p>Belgrade, Serbia</p>
                    <p className="small text-darkest-blue">Follow Now</p>
                </caption>
            </div>

            <div className="company-card clearfix">
                <img src={Img10} alt="company" />
                <caption className="float-right">
                    <p className="name">Company Name</p>
                    <p>Service Provider</p>
                    <p>New York, USA</p>
                    <p className="small text-darkest-blue">Follow Now</p>
                </caption>
            </div>

            <div className="company-card clearfix">
                <img src={Img11} alt="company" />
                <caption className="float-right">
                    <p className="name">Company Name</p>
                    <p>Supplier</p>
                    <p>London, England</p>
                    <p className="small text-darkest-blue">Follow Now</p>
                </caption>
            </div>

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

