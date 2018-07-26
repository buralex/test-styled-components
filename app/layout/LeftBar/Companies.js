import React from 'react';
import {Link} from "react-router-dom";

import Img9 from './images/9.png';
import Img10 from './images/10.png';
import Img11 from './images/11.png';


export default function Companies() {

    return (
        <div className="companies">
            <div className="d-flex justify-content-between align-items-baseline">
                <p>Featured Companies</p>
                <Link className="see-all" to="#">See All</Link>
            </div>

            <div className="item-card clearfix">
                <img src={Img9} alt="company" />
                <div className="float-right item-text">
                    <p className="name text-truncate">Company Name</p>
                    <p className="text-truncate">Manufacturer</p>
                    <p className="text-truncate">Belgrade, Serbia</p>
                    <Link className="action" to="#">Follow Now</Link>
                </div>
            </div>

            <div className="item-card clearfix">
                <img src={Img10} alt="company" />
                <div className="float-right item-text">
                    <p className="name text-truncate">Company Name</p>
                    <p className="text-truncate">Service Provider</p>
                    <p className="text-truncate">New York, USA</p>
                    <Link className="action" to="#">Follow Now</Link>
                </div>
            </div>

            <div className="item-card clearfix">
                <img src={Img11} alt="company" />
                <div className="float-right item-text">
                    <p className="name text-truncate">Company Name</p>
                    <p className="text-truncate">Supplier</p>
                    <p className="text-truncate">London, England</p>
                    <Link className="action" to="#">Follow Now</Link>
                </div>
            </div>
        </div>
    );
}

