let gridButton, resetButton, loc
let gridMode = true
let bgColor = 0
let density = 25

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  background(bgColor)
  gridButton = new Clickable()
  resetButton = new Clickable()
  setButtonFeatures()
  loc = createVector(725, 375)
  gridMode ? drawGrid(density) : null
}

function draw() {
  gridButton.draw()
  resetButton.draw()
  setCoordinates(density)
  setColor()
  circle(loc.x, loc.y, gridMode ? 10 : 2)
  if (!gridMode) {
    for (let i = 0; i < 15; i++) {
      setCoordinates(density)
      setColor()
      circle(loc.x, loc.y, gridMode ? 10 : 2)
    }
  }
}

// background grid lower density creates smaller/more squares
function drawGrid(density) {
  stroke(110)
  for (let i = 0; i <= window.innerWidth / density; i++) {
    for (let j = 0; j <= window.innerHeight / density; j++) {
      line(i * density, 0, i * density, window.innerHeight)
      line(0, j * density, window.innerWidth, j * density)
    }
  }
}

function setButtonFeatures() {
  // visual properties
  gridButton.locate(20, 23)
  gridButton.text = gridMode ? "Switch to mini mode" : "Switch to grid mode"
  gridButton.resize(150, 30)
  gridButton.color = "#AABBCC"
  resetButton.locate(200, 23)
  resetButton.text = "Reset"
  resetButton.resize(75, 30)
  resetButton.color = "#AABBCC"
  // functions
  gridButton.onPress = () => setMode()
  resetButton.onPress = () => {
                                background(bgColor)
                                gridMode ? drawGrid(density) : null
                                loc = createVector(725, 375)
                              }
}

function setColor() {
  strokeWeight(1)
  let w = window.innerWidth / 6

  if (loc.x <= w) {
    red = 255
    green = (255 / w) * loc.x
    blue = 0
  }
  else if (loc.x <= 2 * w) {
    red = -(255 / w) * loc.x + 510
    green = 255
    blue = 0
  }
  else if (loc.x <= 3 * w) {
    red = 0
    green = 255
    blue = (255 / w) * loc.x - 510
  }
  else if (loc.x <= 4 * w) {
    red = 0
    green = -(255 / w) * loc.x + 1020
    blue = 255
  }
  else if (loc.x <= 5 * w) {
    red = (255 / w) * loc.x - 1020
    green = 0
    blue = 255
  }
  else {
    red = 255
    green = 0
    blue = -(255 / w) * loc.x + 1530
  }

  stroke(color(red, green, blue))
  fill(color(red, green, blue))
}

function setCoordinates(density) {
  direction = random([0,1,2,3])
  strokeWeight(gridMode ? 4 : 1)

  switch (direction) {
    case 0:
      if (loc.x + density < window.innerWidth) {
        line(loc.x, loc.y, loc.x + density, loc.y)
        loc.x += density
      }
      break
    case 1:
      if (loc.x - density >= 0) {
        line(loc.x, loc.y, loc.x - density, loc.y)
        loc.x -= density
      }
      break
    case 2:
      if (loc.y + density < window.innerHeight) {
        line(loc.x, loc.y, loc.x, loc.y + density)
        loc.y += density
      }
      break
    case 3:
      if (loc.y - density >= 0) {
        line(loc.x, loc.y, loc.x, loc.y - density)
        loc.y -= density
      }
      break
  }
}

function setMode() {
  background(bgColor)
  gridMode = !gridMode
  density = gridMode ? 25 : 5
  gridMode ? drawGrid(density) : null
  loc = createVector(725, 375)
  gridButton.text = gridMode ? "Switch to mini mode" : "Switch to grid mode"
}
