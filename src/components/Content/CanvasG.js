import React, { Component } from 'react';
import { initiate, rightF, leftF, upF, downF, goDark } from '../func_objs/functions.js';

class CanvasG extends Component {
  componentDidMount() {
    initiate();
  }
  shouldComponentUpdate = () => { return false; }
  multiRight = () => {
    for(let i = 0; i < 14; i++) {
      window.setTimeout(function() {
        rightF();
      },5 + 5*i);
    }
  }
  multiLeft = () => {
    for(let i = 0; i < 14; i++) {
      window.setTimeout(function() {
        leftF();
      },5 + 5*i);
    }
  }
  multiUp = () => {
    for(let i = 0; i < 14; i++) {
      window.setTimeout(function() {
        upF();
      },5 + 5*i);
    }
  }
  multiDown = () => {
    for(let i = 0; i < 14; i++) {
      window.setTimeout(function() {
        downF();
      },5 + 5*i);
    }
  }
  render() {
    return(
      <div className="table">
        <div className='command-buttons'>
          <div className="master-commands">
            <button onClick={goDark}>darkness/clear</button>
          </div>
          <div className="direction-commands">
            <button className="direction-button disSelect" onClick={this.multiLeft}>left</button>
            <div id='updown'>
              <button className="direction-button disSelect" onClick={this.multiUp}>up</button>
              <button className="direction-button disSelect" onClick={this.multiDown}>down</button>
            </div>
            <button className="direction-button disSelect" onClick={this.multiRight}>right</button>
          </div>
        </div>
        <div className='canvas-g'>
          <canvas id='myCanvas' width="1600" height="1600">your browser does not support canvas</canvas>
        </div>
        <canvas id="semaphor" width="300" height="492"></canvas>
        <label>You can use arrows on your keyboard</label>
      </div>
    );
  }
}

export default CanvasG;
