import React from 'react';

import {Link} from "react-router-dom";

import Add2 from './images/add2.png';
import Img1 from './images/1.png';
import Img2 from './images/2.png';
import Img3 from './images/3.png';
import Img4 from './images/4.png';
import Img5 from './images/5.png';

import './style.scss';

export default function RightBar() {
    return (
        <div className="right-bar-component ">

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

            <hr/>

            <div className="products">
                <div className="d-flex justify-content-between align-items-baseline">
                    <p className="tip">Featured Products</p>
                    <Link className="see-all" to="#">See All</Link>
                </div>

                <div className="item-card clearfix">
                    <p className="name text-truncate">Product Name</p>
                    <img src={Img4} alt="friend" />
                    <div className="float-right item-text">
                        <p>
                            Product Short
                            Description. The quick brown
                            fox jumps over the
                            lazy dog.
                        </p>
                    </div>
                </div>

                <div className="item-card clearfix">
                    <p className="name text-truncate">Product Name</p>
                    <img src={Img5} alt="friend" />
                    <div className="float-right item-text">
                        <p>
                            Product Short
                            Description. The quick brown
                            fox jumps over the
                            lazy dog.
                        </p>
                    </div>
                </div>
            </div>



            <hr/>

            <p>Advertisement</p>

            <div>
                <img src={Add2} alt="addvert" />

                <p className="small text-white-two">Ads By Denteez.com</p>
            </div>

        </div>
    );
}

