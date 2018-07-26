import React from 'react';

import {Link} from "react-router-dom";

import Img4 from './images/4.png';
import Img5 from './images/5.png';


export default function Products() {
    return (
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
    );
}

