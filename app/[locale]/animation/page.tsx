"use client"
import { motion } from "motion/react"

const variants = {
    variant1: {
     x:400, y:300, opacity:1},
     variant2: {
        x:100, y:-300, rotation:90,}
     };  
    

const AnimationPage = () => {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white">
            <div className="mb-4 text-2xl">Animation Demo</div>
            <motion.div 
                className="w-96 h-96 bg-red-400 rounded shadow-lg" 
                initial={{ x: -100, opacity: 0 }}
                variants={variants}
                animate="variant1"
                transition={{ 
                    delay:1,
                    duration: 2 
                }}
            >
            </motion.div>
        </div>
    )}

export default AnimationPage