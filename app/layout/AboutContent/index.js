import React from 'react';

import './style.scss';

const AboutContent = () => (
    <section className="about-content-component text-center">
        <h2>About Denteez</h2>

        <div className="container-fluid">
            <div className="row">
                <div className="col text-left">
                    <p>Why is it always so difficult to find what you are looking for in dentistry? Whether it is <br/>
                        the latest advancement in technology or techniques or simply a review or <br/>
                        understanding of the vast amount of products? Perhaps finding someone to just fix <br/>
                        your broken equipment or simply hiring new staff or looking for that new job?</p>
                </div>

                <div className="col text-left">
                    <p className="right">Our mission is to give every dental professional the possibility to discuss and share all <br/>
                        aspects of their profession, their practice and their business. We aim to make the world <br/>
                        of dentistry easy and accessible, so every dental professional can find what they are <br/>
                        looking for quickly and easily all in one place.</p>
                </div>
            </div>
        </div>

    </section>
)

export default AboutContent;
