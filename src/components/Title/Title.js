import React from 'react';
import "./Title.css";
import cn from 'classnames';

function Title({location}) {
    return (
        <h1 className={cn("title", { "title title_small" : location === "analyser"})}>Between-The-Liner</h1>
    );
}

export default Title;
