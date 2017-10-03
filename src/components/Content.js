import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Intro from './Content/Intro.js';
import CanvasG from './Content/CanvasG.js';

class Content extends Component {
  render() {
    return(
      <div className="content">
        <Switch>
          <Route exact path='/' component={ Intro } />
          <Route path='/table' component={ CanvasG } />
        </Switch>
      </div>
    );
  }
}


export default Content;
