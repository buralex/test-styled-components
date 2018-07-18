import React from 'react';
import * as modalNames from 'components/modals/names';

import {Link} from "react-router-dom";

const Footer = (props) => {

    const privacy = {data: {message:'Privacy Policy', description:'Privacy Policy'}, modalName: modalNames.INFO_MODAL};
    const terms = {data: {message:'Terms of use', description:'Terms of use'}, modalName: modalNames.INFO_MODAL};

    return (
        <footer className="footer">
            <div className="d-flex justify-content-between">
                <div className="">
                    <p>Denteez Copyright 2015</p>
                </div>
                <div className="">
                    <Link to="/login/support">Support</Link>
                    <a href="" onClick={(e) => {e.preventDefault(); props.showModal(privacy)}}>Privacy Policy</a>
                    <a href="" onClick={(e) => {e.preventDefault(); props.showModal(terms)}}>Terms of use</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
