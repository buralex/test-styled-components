import React from 'react';

import './style.scss';

const AboutContent = () => (
    <section className="about-content-component text-center">
        <h2>About Denteez</h2>

        <div className="container-fluid">
            <div className="row">
                <div className="col text-left">
                    <section>
                        <p>
                            Why is it always so difficult to find what you are looking for in dentistry? Whether it is
                            the latest advancement in technology or techniques or simply a review or
                            understanding of the vast amount of products? Perhaps finding someone to just fix
                            your broken equipment or simply hiring new staff or looking for that new job?
                        </p>
                    </section>
                </div>

                <div className="col text-left">
                    <section className="right">
                        <p>
                            Our mission is to give every dental professional the possibility to discuss and share all
                            aspects of their profession, their practice and their business. We aim to make the world
                            of dentistry easy and accessible, so every dental professional can find what they are
                            looking for quickly and easily all in one place.
                        </p>
                    </section>
                </div>
            </div>
        </div>

    </section>
)

export default AboutContent;
