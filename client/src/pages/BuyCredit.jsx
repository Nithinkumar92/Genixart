import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
const BuyCredit = () => {
  const {user,backendUrl,loadCreaditsData,token,setShowLogin} = useContext(AppContext)
  const navigate = useNavigate()


  const initPay = async (order)=>{
     const options ={
        key:import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount:order.amount,
        currency:order.currency,
        name:'Credits Payment',
        description:'Credits Payment',
        order_id:order.id,
        receipt:order.receipt,
        handler:async(response)=>{
          try {
            
            const responsed = await axios.post(backendUrl+"/api/user/verify-razor",response,{headers:token})
            const data = responsed.data

            if(data.success)
            {
              loadCreaditsData()
              navigate('/')
              toast.success('credit Added')
            }
          } catch (error) {
            toast.error(error.message)
          }
        }
     }

     const rzp = new window.Razorpay(options)
     rzp.open()
  }

  const paymentRazorpay = async(planId)=>{
         try {
          if(!user){
            setShowLogin(true)
            return;
          }


         const response = await axios.post(backendUrl+"/api/user/pay-razor",{planId},{headers:{token}})
          const data = response.data

          if(data.success){
              initPay(data.order)
          }
         } catch (error) {
          console.log(error.message)
          toast.error(error.message)
         } 
  }
  
  return (
    <motion.div
     initial={{opacity:0.2,y:100}}
     transition={{duration:1}}
     whileInView={{opacity:1,y:0}}
     viewport={{once:true}}
     className='min-h-[80vh] text-center pt-14 mb-10'>
       <button className='border text-white border-gray-400 bg-gray-900 px-10 py-2 rounded-full mb-6'>Our Plans</button>
       <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10'>Choose the plan</h1>
       <div className='flex flex-wrap gap-6 text-left justify-center'>
          {plans.map((plan,index)=>(
              <div key={index} className='bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500'>
                  <img src='./GenixAilogopng copy.png' width={40}/>
                  <p className='mt-3 mb-1 font-semibold'>
                    {plan.id}
                  </p>
                  <p className='text-sm'>
                    {plan.desc}
                  </p>
                  <p className='mt-6'>
                    <span className='text-3xl font-medium'>${plan.price}</span>/{plan.credits} credits
                  </p>
                  <button onClick={()=>paymentRazorpay(plan.id)} className='mt-8 w-full bg-gray-800 text-white text-sm rounded-md py-2.5 min-w-52'>{user ? 'Purchase' :' Get Started'}</button>
              </div>
          ))}
       </div>
    </motion.div>
  )
}

export default BuyCredit
