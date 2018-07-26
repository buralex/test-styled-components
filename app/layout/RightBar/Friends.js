import React from 'react';

import {Link} from "react-router-dom";

import Img1 from './images/1.png';
import Img2 from './images/2.png';
import Img3 from './images/3.png';


export default function Friends() {
    return (
        <div className="friends">
            <div className="d-flex justify-content-between align-items-baseline">
                <p className="tip">People you may know</p>
                <Link className="see-all" to="#">See All</Link>
            </div>

            <div className="item-card clearfix">
                <p className="name text-truncate">Dennis Adams</p>
                <img src={Img1} alt="friend" />
                <div className="float-right item-text">
                    <p className="text-truncate">Dentist (Practice Owner)</p>
                    <p className="text-truncate">London, England</p>
                    <Link className="action" to="#">Add Friend</Link>
                </div>
            </div>

            <div className="item-card clearfix">
                <p className="name text-truncate">Mary Carpenter</p>
                <img src={Img2} alt="friend" />
                <div className="float-right item-text">
                    <p className="text-truncate">Dentist (Practice Owner)</p>
                    <p className="text-truncate">London, England</p>
                    <Link className="action" to="#">Add Friend</Link>
                </div>
            </div>

            <div className="item-card clearfix">
                <p className="name text-truncate">Danielle Salazar</p>
                <img src={Img3} alt="friend" />
                <div className="float-right item-text">
                    <p className="text-truncate">Dentist (Practice Owner)</p>
                    <p className="text-truncate">Paris, France</p>
                    <Link className="action" to="#">Add Friend</Link>
                </div>
            </div>
        </div>
    );
}

