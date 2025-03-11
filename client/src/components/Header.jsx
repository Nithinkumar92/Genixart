import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { sample_images } from '../assets/assets'
import { motion } from "motion/react"
import { use } from 'react'
import { AppContext } from '../context/AppContext'
import {useNavigate} from 'react-router-dom'
const Header = () => {
  const {user,setShowLogin} = useContext(AppContext)
  const navigate = useNavigate()
  const onClickHandler =()=>{
      if(user){
          navigate('/result')
      }
      else{
        setShowLogin(true)
      }
  }
  return (
    <motion.div initial={{opacity:0.2,y:100}} transition={{duration:1}} whileInView={{opacity:1,y:0}} viewport={{once:true}}  className='flex flex-col justify-center items-center text-center my-20'>
      <motion.div initial={{opacity:0,y:-20}}  animate={{opacity:1,y:0}} transition={{duration:0.8, delay:0.2}} className='text-stone-500 inline-flex border border-neutral-400 rounded-full text-center bg-white px-6 py-2'>
        <p>
            Best text to image Generator
        </p>
        <img src={assets.star_icon} alt='sample_img_1'/>
      </motion.div>

      <motion.h1 className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center'
       initial={{opacity:0}}
       animate={{opacity:1}}
       transition={{delay:0.4 , duration:2}}
      >
        Turn text to <span className='text-green-400 '>image</span>, in seconds.
      </motion.h1>

      <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.6,duration:0.8}} className='max-w-[300px]  sm:max-w-[580px] mx-auto mt-10 text-center'>
      Text-to-image is an AI technology that generates realistic or artistic images based on textual descriptions.
      </motion.p>

      <motion.button onClick={()=>onClickHandler()} initial={{opacity:0}} whileHover={{scale:1.05}} whileTap={{scale:0.95}} animate={{opacity:1}} transition={{default :{duration:0.5},opacity:{delay:0.8 , duration:1}}} className='sm:text-lg text-white bg-black w-auto gap-2 mx-12 my-5 px-5 py-2.5 flex  items-center rounded-full'>Generate images
        <img src={assets.star_group} className='size-6' />
      </motion.button>

      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1,duration:1}} className='flex flex-wrap justify-center mt-15 gap-3'>
        {sample_images.map((item,index)=>(
            <motion.img  whileHover={{scale:1.05,duration:0.1 }} className='rounded hover:scale-105 transition-all ease-in-out duration-300 cursor-pointer max-sm:w-10' src={item.aiimage} alt='' key={index} width={70}/>
        ))}

      </motion.div>

      <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.2,duration:0.8}} className='mt-2 text-neutral-500'>
        generated images from GenixAi.
      </motion.p>
    </motion.div>
  )
}

export default Header
