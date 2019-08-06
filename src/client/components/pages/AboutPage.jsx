import React from 'react';
import NavBar from '../common/NavBar';
import Footer from '../common/Footer';

const AboutPage = () => (
    <div className="Page AboutPage">
        <NavBar />
            <div className="container">
                This site is a repository for various bits and pieces that I have translated for practice. If you need to contact me, you can do so by sending an email to admin@unofficialtranslations.com
            </div>
        <Footer />
    </div>
);

export default AboutPage;
