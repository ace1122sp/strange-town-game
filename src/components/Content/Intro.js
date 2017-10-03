import React from 'react';
import { Link } from 'react-router-dom';
let levelBackgrounds, imgs;
levelBackgrounds = {
  [1]: {
    room: require('../func_objs/img/floor.png'),
    empty: require('../func_objs/img/back1.png'),
    road: require('../func_objs/img/floor.png')
  },
  [2]: {
    empty: require('../func_objs/img/back2.png'),
    room: require('../func_objs/img/road.png'),
    road: require('../func_objs/img/road.png')
  },
  [3]: {
    empty: require('../func_objs/img/back3.png'),
    room: require('../func_objs/img/grass.png'),
    road: require('../func_objs/img/dirt.png')
  },
  [4]: {
    empty: require('../func_objs/img/back4.png'),
    room: require('../func_objs/img/blackLodge.png'),
    road: require('../func_objs/img/blackLodge.png')
  }
}
imgs = {
  cs: {
    one: require('../func_objs/img/one.png'),
    two: require('../func_objs/img/two.png'),
    three: require('../func_objs/img/three.png'),
    four: require('../func_objs/img/four.png'),
    boss: require('../func_objs/img/boss.png'),
    dc: require('../func_objs/img/dc.png')
  },
  items: {
    health: require('../func_objs/img/genericItem_color_102.png'),
    knife: require('../func_objs/img/genericItem_color_134.png'),
    gun: require('../func_objs/img/pistol.png'),
    blaster: require('../func_objs/img/flamethrower_short.png'),
    door: require('../func_objs/img/door.png')
  },
  ends: {
    win: require('../func_objs/img/victory.png'),
    lose: require('../func_objs/img/gameOver.png')
  }
}
const Intro = () => {
  const reloadWindow = () => window.location.reload()
  return(
    <div className='introScreen'>
        <p>After a serious of strange events, spec agent D Cooper
          has been invited to Strange Town to resolve the mystery.
          From the moment he arrived, he has started encountering
          strange creatures... The key to resolve the mystery around
          Strange Town lies in the place both wonderfull and strange
          called The Black Lodge...
        </p>
        <Link to="/table">START</Link>
    </div>
  );
}

export { levelBackgrounds, imgs };
export default Intro;
