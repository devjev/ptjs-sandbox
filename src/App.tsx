import React from 'react'
import { PtsCanvas } from 'react-pts-canvas'
import './App.css'
import { Num, Bound, CanvasSpace, Group, Rectangle } from 'pts'

class AppCanvas extends PtsCanvas {
  animate(time: number, ftime: number) {
    const rect = Rectangle.fromCenter(this.space.center, this.space.size.$divide(2))
    const poly = Rectangle.corners(rect)
    poly.shear2D( Num.cycle(time / 10000) - 0.5, this.space.center)

    this.form.fillOnly("#123").polygon(poly)

    const radius = 10 + Num.cycle(time / 5000) * 100
    this.form.fill("rgb(0, 71, 187)").point(this.space.pointer, radius, "circle")

    // triangles
    const triangles = poly.segments(2, 1, true)
    triangles.forEach((triangle) => {
      triangle.push(this.space.pointer)
    })

    this.form.strokeOnly("#fff", 2).polygons(triangles)
  }

  start(bound: Bound, space: CanvasSpace) {
  }

  action(type: string, x: number, y: number, event: Event) {}

  resize(size: Group, event: Event) {}
}

function App() {
  return (
    <div className="App">
       <AppCanvas
         style={{height: "100vh"}}
         background={"rgb(217, 217, 214)"} />
    </div>
  )
}

export default App
