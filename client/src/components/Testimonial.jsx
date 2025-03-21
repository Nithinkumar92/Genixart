import React from 'react'
import { assets, testimonialsData } from '../assets/assets'
import {motion} from 'framer-motion'
const Testimonial = () => {
  return (
    <motion.div 
    initial={{opacity :0.2,y:100}}
     transition={{duration :1}}
     whileInView={{opacity :1,y:0}}
     viewport={{once :true}}
    className='flex flex-col items-center justify-center my-24 p-6 md:px-28'>
    <h1 className='text-3xl sm:text-4xl font-semibold'>
        Customer testimonials
    </h1>
    <p className='text-gray-500 mb-8'>
        Turn your imagination into visuals
    </p>
    <div className='flex flex-wrap gap-6'>
     {testimonialsData.map((testimonial,index)=>(
        <div key={index} className='bg-white/20 p-12 rounded-lg shadow-md border w-80 m-auto cursor-pointer hover:scale-[1.02] transition-all duration-300 ease-in-out'>
        <div className='flex flex-col items-center'>
            <img src={testimonial.image} alt='testimonial image' className='rounded-full w-14'/>
            <h2 className='text-xl font-semibold mt-3'>
                {testimonial.name}
            </h2>
            <p className='text-gray-500 mb-4'>
                {testimonial.role}
            </p>
            <div className='flex mb-4'>
                {Array(testimonial.stars).fill().map((item,index)=>(
                    <img key={index} src={assets.rating_star}/>
                ))}
            </div>
            <p className='text-center text-sm text-gray-600'>{testimonial.text}</p>
        </div>           
        </div>
     ))}
     </div>
    </motion.div>
  )
}

export default Testimonial
