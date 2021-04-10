import React from 'react';
import './About.css';
import cn from 'classnames'

function About({location}) {
    return (
        <p  className={cn("about", {"about about_small" : location === "analyser"})}>Get an instant emotional analysis of your text</p>
    );
}

export default About;
