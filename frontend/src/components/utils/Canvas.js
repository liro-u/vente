import React, { useRef, useEffect } from 'react';

const Canvas = (props) => {
  
  const { draw, init, ...rest } = props
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let frameCount = 0
    let animationFrameId

    var w,h;
    //sizing/resizing the canvas
    const clientResize = () => {
      w = canvas.width = window.innerWidth - 3;
      h = canvas.height = window.innerHeight - 3
    }
    clientResize();
    window.addEventListener("resize", clientResize);

    //init particles
    init(w,h)

    const render = () => {
      frameCount++
      draw(context, w, h, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw, init])
  
  return <canvas ref={canvasRef} {...rest}/>
}

export default Canvas;