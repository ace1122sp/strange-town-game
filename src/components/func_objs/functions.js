import React from 'react';
import { levelBackgrounds, imgs } from '../Content/Intro';

class GameObject {
  constructor(src, x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.img = new Image();
    this.img.src = src;
  }
  drawCharacter() {
    let ctx = document.getElementById('myCanvas').getContext('2d');
    ctx.drawImage(this.img, this.x, this.y);
  }
}
class Character extends GameObject {
  constructor(src, x, y) {
    super(src, x, y);
    this.speed = 0
  }
  moveUp() {
    this.y -= this.speed;
  }
  moveDown() {
    this.y += this.speed;
  }
  moveRight() {
    this.x += this.speed;
  }
  moveLeft() {
    this.x -= this.speed;
  }
}
class Door extends GameObject {
  constructor(src, x, y) {
    super(src, x, y);
  }
}
class Health extends GameObject {
  constructor(src, x, y) {
    super(src, x, y);
    this.value = 50;
  }
}
class Weapon extends GameObject {
  constructor(src, x, y) {
    super(src, x, y);
  }
}
class Knife extends Weapon {
  constructor(src, x, y) {
    super(src, x, y);
    this.name = 'knife';
    this.attack = 0.3;
  }
}
class Gun extends Weapon {
  constructor(src, x, y) {
    super(src, x, y);
    this.name = 'gun';
    this.attack = 0.5;
  }
}
class Blaster extends Weapon {
  constructor(src, x, y) {
    super(src, x, y);
    this.name = 'blaster';
    this.attack = 0.7;
  }
}
class Player extends Character {
  constructor(src, x, y) {
    super(src, x, y);
    this.xp = 100;
    this.health = 100;
    this.weapon = {name: 'armless', attack: 0.1};
    this.speed = 6;
  }
  attack() {
    return this.xp * this.weapon.attack;
  }
}
class Boss extends Character {
    constructor(src, x, y, oxo, oxt, oyo, oyt) {
    super(src, x, y, oxo, oxt, oyo, oyt);
    this.xp = 230;
    this.health = randomNumber(400, 250);
  }
}
class Soldier extends Character {
  constructor(src, x, y, oxo, oxt, oyo, oyt) {
    super(src, x, y);
    this.oxo = oxo;
    this.oxt = oxt;
    this.oyo = oyo;
    this.oyt = oyt;
    this.direction = '';
    this.activeWay = '';
  }
}
class SoldierOne extends Soldier {
  constructor(src, x, y, oxo, oxt, oyo, oyt) {
    super(src, x, y, oxo, oxt, oyo, oyt);
    this.xp = randomNumber(20, 10);
    this.health = 30;
    this.speed = 1.5;
  }
}
class SoldierTwo extends Soldier {
  constructor(src, x, y, oxo, oxt, oyo, oyt) {
    super(src, x, y, oxo, oxt, oyo, oyt);
    this.xp = randomNumber(35, 20);
    this.health = 50;
    this.speed = 3;
  }
}
class SoldierThree extends Soldier {
  constructor(src, x, y, oxo, oxt, oyo, oyt) {
    super(src, x, y, oxo, oxt, oyo, oyt);
    this.xp = randomNumber(50, 35);
    this.health = 70;
    this.speed = 4.5;
  }
}
class SoldierFour extends Soldier {
  constructor(src, x, y, oxo, oxt, oyo, oyt) {
    super(src, x, y, oxo, oxt, oyo, oyt);
    this.xp = randomNumber(70, 50);
    this.health = 100;
    this.speed = 6;
  }
}

const levelSoldiersProperties = {
  [1]: {
    s1: 0.7,
    s2: 0.3,
    s3: 0,
    s4: 0,
    boss: 0
  },
  [2]: {
    s1: 0.4,
    s2: 0.5,
    s3: 0.1,
    s4: 0,
    boss: 0
  },
  [3]: {
    s1: 0.15,
    s2: 0.3,
    s3: 0.4,
    s4: 0.15,
    boss: 0
  },
  [4]: {
    s1: 0,
    s2: 0.15,
    s3: 0.45,
    s4: 0.4,
    boss: 1
  }
}
const randomNumber = (max, min) => min + Math.round((max-min)*Math.random())
let winImage, loseImage, drawing;
let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
let cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let activeLevel = 1;
let worldRooms = {};
let allRoads = [];
let ace = null;
let boss = null;
let itemCoords = [];
let allSoldiers = [];
let gaming = 1;
let rightBtn = false;
let leftBtn = false;
let upBtn = false;
let downBtn = false;
let dark = false;
const originPos = (rooms) => {
  const room = randomNumber(8, 1);
  const maxX = rooms[room].x + rooms[room].w - 52;
  const maxY = rooms[room].y + rooms[room].h - 52;
  const minX = rooms[room].x + 52;
  const minY = rooms[room].y + 52;
  const xOrigin = randomNumber(maxX, minX);
  const yOrigin = randomNumber(maxY, minY);
  return [xOrigin, yOrigin, minX, maxX, minY, maxY];
}
const keyDownHandler = (e) => {
  if(e.keyCode === 39) {
    rightPressed = true;
  } else if (e.keyCode === 37) {
    leftPressed = true;
  } else if(e.keyCode === 38) {
    upPressed = true;
  } else if(e.keyCode === 40) {
    downPressed = true;
  }
}
const keyUpHandler = (e) => {
  if(e.keyCode === 39) {
  rightPressed = false;
  } else if (e.keyCode === 37) {
    leftPressed = false;
  } else if(e.keyCode === 38) {
    upPressed = false;
  } else if(e.keyCode === 40) {
    downPressed = false;
  }
}
const createSections = (width, height) => {
  let counter = 0;
  let grid = {
    [counter]: {
      xone: 0,
      xtwo: width,
      yone: 0,
      ytwo: height
    }
  };
  let nextGrid = {};
  let previousSections = [0];
  let nextSections = [];

  for(let i = 0; i < 3; i++) {
    counter = 0;
    previousSections.forEach( (k) => {
      const xone = grid[k].xone;
      const xtwo = grid[k].xtwo;
      const yone = grid[k].yone;
      const ytwo = grid[k].ytwo;
      let fxo, fxt, fyo, fyt, sxo, sxt, syo, syt;
      fxo = xone;
      fxt = xtwo;
      fyo = yone;
      fyt = ytwo;
      sxo = xone;
      sxt = xtwo;
      syo = yone;
      syt = ytwo;
      const perc = randomNumber(60, 40)/100;
      let separateCoord;
      const xLength = xtwo - xone;
      const yLength = ytwo - yone;
      const dimension = (xLength < yLength ? 'y' : 'x');
      if(dimension === 'x') {
        separateCoord = Math.round(xone + (xtwo - xone) * perc);
        fxo = xone;
        fxt = separateCoord;
        sxo = separateCoord;
        sxt = xtwo;
      } else {
        separateCoord = Math.round(yone + (ytwo - yone) * perc);
        fyo = yone;
        fyt = separateCoord;
        syo = separateCoord;
        syt = ytwo;
      }
      nextGrid[counter] = {
        xone: fxo,
        xtwo: fxt,
        yone: fyo,
        ytwo: fyt,
      };
      nextSections.push(counter);
      counter++;
      nextGrid[counter] = {
        xone: sxo,
        xtwo: sxt,
        yone: syo,
        ytwo: syt,
      }
      nextSections.push(counter);
      counter++;
    });
    previousSections = [...nextSections];
    grid = Object.assign({}, nextGrid);
    nextSections = [];
    nextGrid = Object.assign({});
  }
  return grid;
}
const createRoom = (bounds) => {
  const {xo, xt, yo, yt} = bounds;
  const avalXO = xo + 18;
  const avalXT = xt - 18;
  const avalYO = yo + 18;
  const avalYT = yt - 18;
  const w = (avalXT - avalXO) * randomNumber(100, 55) / 100;
  const h = (avalYT - avalYO) * randomNumber(100, 55) / 100;
  const lastX = avalXT - w;
  const x = randomNumber(avalXO, lastX);
  const lastY = avalYT - h;
  const y = randomNumber(avalYO, lastY);
  const xc = x + w / 2;
  const yc = y + h / 2;
  const cp = [xc, yc];
  const room = {
    x, y, w, h, cp
  };
  return room;
}
const createRoads = (rooms) => {
  const cps = [[rooms[1].cp, rooms[2].cp], [rooms[3].cp, rooms[4].cp], [rooms[5].cp, rooms[6].cp], [rooms[7].cp, rooms[8].cp], [rooms[1].cp, rooms[6].cp], [rooms[3].cp, rooms[5].cp], [rooms[2].cp, rooms[3].cp], [rooms[6].cp, rooms[7].cp]];
  let roadsBook = [];
  cps.forEach( (p) => {
    const aX = p[0][0];
    const aY = p[0][1];
    const bX = p[1][0];
    const bY = p[1][1];
    const width = Math.abs(bX - aX);
    let height = Math.abs(aY - bY);
    let hX, hY, vX, vY;
    if(aX < bX && aY < bY) {
      hX = aX;
      hY = aY;
      vX = bX;
      vY = aY;
    } else if(aX < bX && aY > bY) {
      hX = aX;
      hY = aY;
      vX = bX;
      vY = bY;
      height += 98;
    } else if(aX > bX && aY > bY) {
      hX = bX;
      hY = aY;
      vX = bX;
      vY = bY;
    } else {
      hX = bX;
      hY = aY;
      vX = bX;
      vY = aY;
    }
    const hxtwo = hX + width;
    const hytwo = hY + 98;
    const vxtwo = vX + 98;
    const vytwo = vY + height;
    let roadCoords = {
      hxo: hX,
      hxt: hxtwo,
      hyo: hY,
      hyt: hytwo,
      vxo: vX,
      vxt: vxtwo,
      vyo: vY,
      vyt: vytwo,
      draw: {
        hX: hX, hY: hY, vX: vX, vY: vY, width: width, height: height
      }
    }
    roadsBook.push(roadCoords);
  });
  return roadsBook;
}
const createWorld = (gSections) => {
  const gKeys = Object.keys(gSections);
  let rooms = {};
  let id = 1;
  gKeys.forEach( (section) => {
    let xo = gSections[section].xone;
    let xt = gSections[section].xtwo;
    let yo = gSections[section].yone;
    let yt = gSections[section].ytwo;
    let coords = {
      xo,
      xt,
      yo,
      yt
    };
    let room = createRoom(coords);
    rooms[id] = room;
    id++;
  });
  return rooms;
}
const allowMove = (rooms, nextDir) => {
  let res = false;
  const allRooms = {...rooms};
  const nX = nextDir[0];
  const nY = nextDir[1];
  for(let room in rooms) {
    let rxo = rooms[room].x;
    let rxt = rooms[room].x + rooms[room].w;
    let ryo = rooms[room].y;
    let ryt = rooms[room].y + rooms[room].h;
    let roomSpace = nX > rxo && nX < rxt && nY > ryo && nY < ryt;
    if(roomSpace) res = true;
  }
  if(activeLevel === 4) {
    let bossCollision = nX > boss.x + 26 && nX < boss.x + boss.width - 26 && nY > boss.y + 26 && nY < boss.y + boss.height - 26;
    if(bossCollision) res = false;
  }
  return res;
}
const drawRooms = (rooms, allroads) => {
  let ctx = document.getElementById('myCanvas').getContext('2d');
  const rKeys = Object.keys(rooms);
  const imgRoom = new Image();
  const imgRoad = new Image();
  imgRoom.src = levelBackgrounds[activeLevel].room;
  imgRoad.src = levelBackgrounds[activeLevel].road;
  const patternRoom = ctx.createPattern(imgRoom, 'repeat');
  const patternRoad = ctx.createPattern(imgRoad, 'repeat');
  rKeys.forEach( (room) => {
    let x = rooms[room].x;
    let y = rooms[room].y;
    let w = rooms[room].w;
    let h = rooms[room].h;
    let o1 = rooms[room].cp[0];
    let o2 = rooms[room].cp[1];
    ctx.fillStyle = patternRoom;
    ctx.fillRect(x, y, w, h);
  });
  allroads.forEach((r) => {
    let obj = {...r.draw};
    let hX = obj.hX;
    let hY = obj.hY;
    let vX = obj.vX;
    let vY = obj.vY;
    let width = obj.width;
    let height = obj.height;
    ctx.fillStyle = patternRoad;
    ctx.fillRect(hX, hY, width, 98);
    ctx.fill();
    ctx.fillRect(vX, vY, 98, height);
    ctx.fillStyle = patternRoad;
    ctx.fill();
  });
}
function createSoldiers(rooms, level) {
  const soldiersNumber = randomNumber(15, 7);
  const sOneNum = Math.round(soldiersNumber * levelSoldiersProperties[level].s1);
  const sTwoNum = Math.round(soldiersNumber * levelSoldiersProperties[level].s2);
  const sThreeNum = Math.round(soldiersNumber * levelSoldiersProperties[level].s3);
  const sFourNum = Math.round(soldiersNumber * levelSoldiersProperties[level].s4);
  const bossNum = levelSoldiersProperties[level].boss;
  let soldiers = [];
  for(let i = 0; i < sOneNum; i++) {
    let coors = originPos(rooms);
    let so = new SoldierOne(imgs.cs.one, coors[0], coors[1], coors[2], coors[3], coors[4], coors[5]);
    so.direction = (function() {
      let d = randomNumber(1, 0);
      let res;
      d === 1 ? res = 'vertical' : res = 'horizontal';
      return res;
    })();
    so.activeWay = randomNumber(1, 0);
    soldiers.push(so);
  }
  for(let i = 0; i < sTwoNum; i++) {
    let coors = originPos(rooms);
    let st = new SoldierTwo(imgs.cs.two, coors[0], coors[1], coors[2], coors[3], coors[4], coors[5]);
    st.direction = (function() {
      let d = randomNumber(1, 0);
      let res;
      d === 1 ? res = 'vertical' : res = 'horizontal';
      return res;
    })();
    st.activeWay = randomNumber(1, 0);
    soldiers.push(st);
  }
  for(let i = 0; i < sThreeNum; i++) {
    let coors = originPos(rooms);
    let sr = new SoldierThree(imgs.cs.three, coors[0], coors[1], coors[2], coors[3], coors[4], coors[5]);
    sr.direction = (function() {
      let d = randomNumber(1, 0);
      let res;
      d === 1 ? res = 'vertical' : res = 'horizontal';
      return res;
    })();
    sr.activeWay = randomNumber(1, 0);
    soldiers.push(sr);
  }
  for(let i = 0; i < sFourNum; i++) {
    let coors = originPos(rooms);
    let sf = new SoldierFour(imgs.cs.four, coors[0], coors[1], coors[2], coors[3], coors[4], coors[5]);
    sf.direction = (function() {
      let d = randomNumber(1, 0);
      let res;
      d === 1 ? res = 'vertical' : res = 'horizontal';
      return res;
    })();
    sf.activeWay = randomNumber(1, 0);
    soldiers.push(sf);
  }
  if(bossNum) {
    let coors = originPos(rooms);
    boss = new Boss(imgs.cs.boss, coors[0], coors[1], coors[2], coors[3], coors[4], coors[5]);
    soldiers.push(boss);
  }
  return soldiers;
}
function drawSoldiers(allS) {
  let ctx = document.getElementById('myCanvas').getContext('2d');
  allS.forEach( (soldier) => {
    if(soldier.direction === 'horizontal') {
      if(soldier.activeWay === 1) {
        if(soldier.x + soldier.width + soldier.speed + 2 < soldier.oxt) {
          soldier.moveRight();
        } else {
          soldier.activeWay = 2;
        }
      } else {
        if(soldier.x - soldier.speed - 2 > soldier.oxo) {
          soldier.moveLeft();
        } else {
          soldier.activeWay = 1;
        }
      }
    } else {
      if(soldier.activeWay === 1) {
        if(soldier.y - soldier.speed - 2> soldier.oyo) {
          soldier.moveUp();
        } else {
          soldier.activeWay = 2;
        }
      } else {
        if(soldier.y + soldier.height + soldier.speed + 2 < soldier.oyt) {
          soldier.moveDown();
        } else {
          soldier.activeWay = 1;
        }
      }
    }
    soldier.drawCharacter();
  });
}
function collision(player) {
  let soldiersCount = allSoldiers.length;
  let itemCount = itemCoords.length;
  let forDeleteItems = [];
  let forDeleteSoldiers = [];
  for(let i = 0; i < itemCount; i++) {
    let itemCollect = 0;
    if(Math.abs(player.x - itemCoords[i].x) <= 25 && Math.abs(player.y - itemCoords[i].y) <= 25) {
      if(itemCoords[i] instanceof Weapon) {
        let weapon = {name: itemCoords[i].name, attack: itemCoords[i].attack};
        player.weapon = {...weapon};
        itemCoords[i].x = -4000;
        forDeleteItems.push(i);
      } else if(itemCoords[i] instanceof Health) {
        player.health += itemCoords[i].value;
        itemCoords[i].x = -4000;
        forDeleteItems.push(i);
      } else if(itemCoords[i] instanceof Door) {
        door();
        return;
      }
      updateSemaphor();
    }
    if(boss && boss.health <= 0) {
      endGame('win');
      let time = window.setTimeout(function() {
        window.location.reload();
      }, 3500);
    }
  }
  if(forDeleteItems.length === itemCount) itemCoords = [];
  for(let s = 0; s < soldiersCount; s++) {
    if(Math.abs(player.x - allSoldiers[s].x) < 25 && Math.abs(player.y - allSoldiers[s].y) < 25) {
      let att = player.attack();
      allSoldiers[s].health -= att;
      player.health -= allSoldiers[s].xp;
      if(allSoldiers[s].health <= 0) {
        player.xp += allSoldiers[s].xp;
        allSoldiers[s].x = -4000;
        allSoldiers[s].speed = 0;
        forDeleteSoldiers.push(s);
        updateSemaphor();
      }
      if(player.health <= 0) {
        let endMessage;
        activeLevel === 4 ? endMessage = 'loseBlackLodge' : endMessage = 'loseEarly';
        endGame(endMessage);
        let time = window.setTimeout(function() {
          window.location.reload();
        }, 3500);
      }
    }
  }
  if(forDeleteSoldiers.length === soldiersCount) allSoldiers = [];
}
const drawWorld = () => {
  let ctx = document.getElementById('myCanvas').getContext('2d');
  playing();
  if(gaming) {
    ctx.setTransform(1,0,0,1,0,0);
    let xxx = ace.x - 250;
    let yyy = ace.y - 250
    ctx.translate(-xxx,-yyy);
    drawing = requestAnimationFrame(drawWorld);
  }
}
function start(playerVals = {xp:100, h: 100, wn:'armless', wa:0.1, level:1}) {
  const {xp:pxp, h:ph, wn:pwn, wa:pwa} = playerVals;
  activeLevel = playerVals.level;
  let gridOfSections = createSections(1600, 1600);
  worldRooms = createWorld(gridOfSections);
  allRoads = createRoads(worldRooms);
  const originPlayerCoords = originPos(worldRooms);
  itemCoords = createItems(worldRooms);
  allSoldiers = createSoldiers(worldRooms, activeLevel);
  ace = new Player(imgs.cs.dc, originPlayerCoords[0], originPlayerCoords[1]);
  ace.xp = pxp;
  ace.health = ph;
  ace.weapon = {name: pwn, attack:pwa};
  gaming = 1;
  setBackground();
  updateSemaphor();
}

let setBackground = () => {
  let backgroundImg = document.querySelector('canvas#myCanvas');
  let backgroundUrl = levelBackgrounds[activeLevel].empty;
  backgroundImg.style.backgroundImage = `url(${backgroundUrl})`;
}
function initiate() {
  let ctx = document.getElementById('myCanvas').getContext('2d');
  document.addEventListener('keydown', keyDownHandler);
  document.addEventListener('keyup', keyUpHandler);
  ctx.clearRect(-1600, -1600, 5000, 5000);
  winImage = new Image();
  winImage.src = imgs.ends.win;
  loseImage = new Image();
  loseImage.src = imgs.ends.lose;
  start();
  drawing = requestAnimationFrame(drawWorld);
}
function createItems(rooms) {
  const healthNum = Math.ceil(randomNumber(5, 2));
  const knifeNum = Math.ceil(randomNumber(2, 1));
  const gunNum = Math.ceil(randomNumber(2, 1));
  const blasterNum = Math.ceil(randomNumber(0, 1));
  let items = [];
  for(let i = 0; i < healthNum; i++) {
    let coors = originPos(rooms);
    let ht = new Health(imgs.items.health, coors[0], coors[1]);
    items.push(ht);
  }
  for(let i = 0; i < knifeNum; i++) {
    let coors = originPos(rooms);
    let kp = new Knife(imgs.items.knife, coors[0], coors[1]);
    items.push(kp);
  }
  for(let i = 0; i < gunNum; i++) {
    let coors = originPos(rooms);
    let gp = new Gun(imgs.items.gun, coors[0], coors[1]);
    items.push(gp);
  }
  for(let i = 0; i < blasterNum; i++) {
    let coors = originPos(rooms);
    let bp = new Blaster(imgs.items.blaster, coors[0], coors[1]);
    items.push(bp);
  }
  if(activeLevel < 4) {
    let coors = originPos(rooms);
    let dr = new Door(imgs.items.door, coors[0], coors[1]);
    items.push(dr);
  }
  return items;
}
function drawItems(items) {
  items.forEach( (item) => {
    item.drawCharacter();
  });
}
function isOnRoad(roads, nextDir) {
  let res = false;
  const allroads = [...roads];
  const nX = nextDir[0];
  const nY = nextDir[1];
  allroads.forEach( (road) => {
    let horizontalRoad = nX > road.hxo && nX < road.hxt && nY > road.hyo && nY < road.hyt;
    let verticalRoad = nX > road.vxo && nX < road.vxt && nY > road.vyo && nY < road.vyt;
    if(horizontalRoad) {
      res = true;
    } else if(verticalRoad) {
      res = true;
    }
  });
  return res;
}
function playing() {
  let ctx = document.getElementById('myCanvas').getContext('2d');
  ctx.clearRect(-1600, -1600, 5000, 5000);
  drawRooms(worldRooms, allRoads);
  const nextRight = ace.x + ace.width + ace.speed;
  const nextLeft = ace.x - ace.speed;
  const nextUp = ace.y - ace.speed;
  const nextDown = ace.y + ace.height + ace.speed;
  const xRight = ace.x + ace.width;
  const yDown = ace.y + ace.height;
  if(rightPressed || rightBtn) {
    let rigthRoomUp = allowMove(worldRooms, [nextRight, ace.y]);
    let rigthRoomDown = allowMove(worldRooms, [nextRight, yDown]);
    let rightRoadUp = isOnRoad(allRoads, [nextRight, ace.y]);
    let rightRoadDown = isOnRoad(allRoads, [nextRight, yDown]);
    let rr = (rigthRoomUp && rigthRoomDown) || (rightRoadUp && rightRoadDown);
    if(rr) ace.moveRight();
    rightBtn = false;
  } else if(leftPressed || leftBtn) {
    let leftRoomUp = allowMove(worldRooms, [nextLeft, ace.y]);
    let leftRoomDown = allowMove(worldRooms, [nextLeft, yDown]);
    let leftRoadUp = isOnRoad(allRoads, [nextLeft, ace.y]);
    let leftRoadDown = isOnRoad(allRoads, [nextLeft, yDown]);
    let ll = (leftRoomUp && leftRoomDown) || (leftRoadUp && leftRoadDown);
    if(ll) ace.moveLeft()
    leftBtn = false;
  } else if(upPressed || upBtn) {
    let upRoomLeft = allowMove(worldRooms, [ace.x, nextUp]);
    let upRoomRight = allowMove(worldRooms, [xRight, nextUp]);
    let upRoadLeft = isOnRoad(allRoads, [ace.x, nextUp]);
    let upRoadRight = isOnRoad(allRoads, [xRight, nextUp]);
    let uu = (upRoomLeft && upRoomRight) || (upRoadLeft && upRoadRight);
    if(uu) ace.moveUp();
    upBtn = false;
  } else if(downPressed || downBtn) {
    let downRoomLeft = allowMove(worldRooms, [ace.x, nextDown]);
    let downRoomRight = allowMove(worldRooms, [xRight, nextDown]);
    let downRoadLeft = isOnRoad(allRoads, [ace.x, nextDown]);
    let downRoadRight = isOnRoad(allRoads, [xRight, nextDown]);
    let dd = (downRoomLeft && downRoomRight) || (downRoadLeft && downRoadRight);
    if(dd) ace.moveDown();
    downBtn = false;
  }
  ace.drawCharacter();
  drawItems(itemCoords);
  drawSoldiers(allSoldiers);
  collision(ace);
  if(dark) {
    let innerLeftWidth = Math.abs(-1600 -(ace.x-60));
    let upperHeight = Math.abs(-1600 - (ace.y-60));
    ctx.fillStyle = '#37b04b';
    ctx.fillRect(-1600, -1600, 5000, upperHeight);
    ctx.fillRect(-1600, ace.y+110, 5000, 5000-ace.y-60);
    ctx.fillRect(-1600, ace.y-60, innerLeftWidth, 170);
    ctx.fillRect(ace.x+110, ace.y-60, 5000-ace.x-60, 170);
  }
}
function door() {
  let ctx = document.getElementById('myCanvas').getContext('2d');
  if(activeLevel < 4) activeLevel++;
  let currentPlayer = {
    xp: ace.xp,
    h: ace.health,
    wn: ace.weapon.name,
    wa: ace.weapon.attack,
    level: activeLevel
  };
  gaming = 0;
  ctx.clearRect(-1600, -1600, 6000, 6000);
  start(currentPlayer);
}
function endGame(ending) {
  let ctx = document.getElementById('myCanvas').getContext('2d');
  gaming = 0;
  let message, message2, bg;
  if(ending === 'win') {
    message = 'You made it! SA Cooper has managed';
    message2 = 'to escape from the Black Lodge.';
    bg = 'white';
  } else if(ending === 'loseEarly') {
    message = 'Oh no! Game Over!';
    message2 = '';
    bg = 'black'
  } else if(ending === 'loseBlackLodge') {
    message = 'Oh no! Coop will be trapped in ';
    message2 = 'the Black Lodge for another 25 years!';
    bg = 'black';
  }
  let ww = window.innerWidth;
  ctx.clearRect(-1600, -1600, 5000, 5000);
  ctx.fillStyle = bg;
  ctx.fillRect(-1600, -1600, 5000, 5000);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '20px Monoton';
  ctx.fillStyle = 'crimson';
  if(ww > 850) {
    ctx.fillText(message, ace.x, ace.y);
    ctx.fillText(message2, ace.x, ace.y + 45);
  } else {
    let i;
    ending === 'win' ? i = winImage : i = loseImage;
    const patternEnd = ctx.createPattern(i, 'repeat');
    ctx.fillStyle = patternEnd;
    ctx.fillRect(-1600, -1600, 5000, 5000);
  }
}
function updateSemaphor() {
  let semaphorCanvas = document.getElementById('semaphor');
  let stx = semaphorCanvas.getContext('2d');
  let xp = 'XP: ' + ace.xp;
  let health = 'HEALTH: ' + ace.health;
  let weapon = 'WEAPON: ' + ace.weapon.name;
  let att = 'ATTACK: ' + Math.round(ace.xp*ace.weapon.attack);
  stx.clearRect(0, 0, semaphorCanvas.width, semaphorCanvas.height);
  stx.fillStyle = 'white';
  stx.textAlign = 'start';
  stx.baseline = 'middle';
  stx.font = '23px Monoton';
  stx.fillText(xp, 20, 159);
  stx.fillText(health, 20, 212);
  stx.fillText(weapon, 20, 265);
  stx.fillText(att, 20, 318);
}
const rightF = () => rightBtn = true
const leftF = () => leftBtn = true
const upF = () => upBtn = true
const downF = () => downBtn = true
const goDark = () => dark === true ? dark = false : dark = true

export { initiate, rightF, leftF, upF, downF, goDark };
