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
  strokeWeight(1)
  stroke(255)
  fill(255)
  setCoordinates(density)
  circle(loc.x, loc.y, gridMode ? 10 : 2)
  if (!gridMode) {
    setCoordinates(density)
    circle(loc.x, loc.y, gridMode ? 10 : 2)
    setCoordinates(density)
    circle(loc.x, loc.y, gridMode ? 10 : 2)
    setCoordinates(density)
    circle(loc.x, loc.y, gridMode ? 10 : 2)
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
