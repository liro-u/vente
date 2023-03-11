import React, { useRef } from "react";
import Canvas from "../utils/Canvas"
// css
import "../../css/particles.css"

const OrbsParticles = ({ ParticlesOnScreen = 30, size = {min: 5, max: 10}, speedX = {min: -1.5, max: 1.5}, speedY = {min: -3, max: 0}, lifeTime = -1}) => {
    const orbRef = useRef(null);
    var grow = {
        min: 0.1,
        max: 0.7
    }

    const random = (min, max) => {
        return min + Math.random() * (max - min);
    }
    var particles = [];
    const createParticles = (w,h) => {
        for (let i = 0; i < ParticlesOnScreen; i++) {
            const curSize = random(size.min, size.max)
            particles.push({
                size:{
                    baseX: curSize,
                    baseY:curSize,
                    x: curSize,
                    y: curSize
                },
                x: Math.random() * w,
                y: Math.random() * h - h - curSize,
                speedX: random(speedX.min, speedX.max),
                speedY: random(speedY.min, speedY.max),
                growSpeed: random(grow.min, grow.max),
                offset: random(-10, 10),
                currentLifeTime: random(0, lifeTime),
            })
            console.log(particles[i].y)
        }
    }
    
    
    const drawParticles = (ctx, w, h) => {
        ctx.clearRect(0, 0, w, h)
        particles.forEach(particle => {
            ctx.drawImage(orbRef.current, particle.x - particle.size.x / 2, particle.y - particle.size.y / 2, particle.size.x, particle.size.y);
        });
    }

    const updateParticles = (w, h, frameCount) => {
        particles.forEach(particle => {
            particle.x += particle.speedX
            particle.y += particle.speedY

            particle.currentLifeTime += 0.05
            if (lifeTime > 0){
                console.log(particle.currentLifeTime)
            }

            const mult = particle.growSpeed*Math.sin(frameCount*0.05 + particle.offset) + particle.growSpeed;
            particle.size.x = mult * particle.size.baseX + particle.size.baseX
            particle.size.y = mult * particle.size.baseY + particle.size.baseY

            if ((lifeTime === -1 && (particle.y < -particle.size.y / 2 || particle.x < -particle.size.x / 2 || particle.x > w + particle.size.x / 2)) || (lifeTime > 0 && lifeTime < particle.currentLifeTime) ) {
                particle.x = Math.random() * w * 1.5
                particle.y = h + particle.size.y
                particle.currentLifeTime = 0
            }
        });
    }

    const drawAndUpdate = (ctx, w, h, frameCount) => {
        drawParticles(ctx, w, h)
        updateParticles(w, h, frameCount)
    }

    return (
        <div className="orbsParticles">
            <Canvas draw={drawAndUpdate} init={createParticles}/>
            <div style={{display: "none"}}>
                <img src="https://media.discordapp.net/attachments/692145538774335552/1083901052790771852/Pngtreeblack_radial_gradient_5659208.png?width=670&height=670" ref={orbRef} alt="assetOrb"/>
            </div>
        </div>
    )
}

export default OrbsParticles;