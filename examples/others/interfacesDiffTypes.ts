interface PointInterface {
  x: number
  y: number
}

type PointType = {
  x: number
  y: number
}

const getRectangleAreaInterface = (args: PointInterface) => args.x * args.y
const getRectangleAreaAliased = (args: PointType) => args.x * args.y

interface ThreeDimesions extends PointType {
  z: number
}

class Rectangle implements PointType {
  x: 2
  y: 4
}

class RectanglePrism implements ThreeDimesions {
  x: 1
  y: 2
  z: 3
}

interface Shape {
  area(): number
}
type Perimeter = {
  perimiter(): number
}

class Rectangles implements PointType, Shape, Perimeter {
  x: 1
  y: 2
  area() {
    return this.x * this.y
  }
  perimiter() {
    return 2 * (this.x + this.y)
  }
}

type RectangleShape = Partial<Shape & Perimeter> & PointType

class PartialRectangle implements RectangleShape {
  x: 1
  y: 2
}

interface Counter {
  (start: number): string
  interval: number
  reset(): void
}

const getCounter = () => {
  const counter = ((start: number) => {}) as Counter
  counter.interval = 2
  counter.reset = () => {}
  return counter
}

const callable = getCounter()
callable(10)
callable.reset()
callable.interval = 5.0


type RectangleShape1 = (Shape | Perimeter) & PointType

class PartialRectangle1 implements RectangleShape1 {
}

type RectangleShape2 = Shape | Perimeter

interface RectangleShape2Interface extends RectangleShape2 {}

interface Box {
  height: number
  width: number
}
interface Box {
  scale: number
}

const box: Box = {height: 1, width: 2, scale: 3}

type BoxType = {
  height: number
  width: number
}
type BoxType = {
  scale: number
}