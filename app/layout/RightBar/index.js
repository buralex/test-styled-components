import React from 'react';

import {Link} from "react-router-dom";

import Add2 from './images/add2.png';
import Img1 from './images/1.png';
import Img2 from './images/2.png';
import Img3 from './images/3.png';

import './style.scss';

export default function RightBar() {
    return (
        <div className="right-bar-component header bg-silver outline-danger">
            <div className="d-flex justify-content-between align-items-baseline">
                <p>Featured Companies</p>
                <Link className="see-all" to="#">See All</Link>
            </div>

            <div className="company-card clearfix">
                <img src={Img1} alt="company" />
                <caption className="float-right">
                    <p className="name">Company Name</p>
                    <p>Manufacturer</p>
                    <p>Belgrade, Serbia</p>
                    <p className="small text-darkest-blue">Follow Now</p>
                </caption>
            </div>

            <div className="company-card clearfix">
                <img src={Img2} alt="company" />
                <caption className="float-right">
                    <p className="name">Company Name</p>
                    <p>Service Provider</p>
                    <p>New York, USA</p>
                    <p className="small text-darkest-blue">Follow Now</p>
                </caption>
            </div>

            <div className="company-card clearfix">
                <img src={Img3} alt="company" />
                <caption className="float-right">
                    <p className="name">Company Name</p>
                    <p>Supplier</p>
                    <p>London, England</p>
                    <p className="small text-darkest-blue">Follow Now</p>
                </caption>
            </div>

            <hr/>
        </div>
    );
}

