import React, {useContext}  from 'react';
import { __RouterContext } from 'react-router';
import { useTransition, animated } from 'react-spring';
import {
  Switch,
  Route
} from "react-router-dom";
import MainBanner from "./components/MainBanner/MainBanner";

import './App.css';
import Analyser from "./components/Analyser/Analyser";

function App() {
  const { location } = useContext(__RouterContext);
  const transitions = useTransition(location, location => location.pathname, {
    from: { opacity: 0, transform: "translate(100%, 0)", display: "none" },
    enter: { opacity: 1, transform: "translate(0%, 0)", display: "block"},
    leave: { opacity: 0, transform: "translate(-50%, 0)", display: "none"  }
  });

  return (
      <>
        {transitions.map(({ item, props, key }) => (
         <animated.div key={key} style={props}>
            <Switch location={item}>
             <Route exact path="/analyser">
                <Analyser/>
             </Route>
             <Route path="/*">
               <MainBanner/>
             </Route>
            </Switch>
          </animated.div>
        ))}
      </>
  );
}

export default App;

