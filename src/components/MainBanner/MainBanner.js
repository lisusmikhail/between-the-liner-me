import React from 'react';
import  {Link } from 'react-router-dom'
import "./MainBanner.css";
import mainBanner  from '../../images/saly.svg'
import Title from "../Title/Title";
import About from "../About/About";

function MainBanner(props) {
    return (
        <main className="main-banner">
            <Title location=''/>
            <div className="main-banner__image-container">
                 <img className="main-banner__image" src={mainBanner} alt="Between-The-Liner"/>
            </div>
             <About location=''/>
            <Link to="/analyser" className="main-banner__link">get started</Link>
        </main>
    );
}

export default MainBanner;
