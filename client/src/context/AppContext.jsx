import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export const AppContext = createContext()

const AppContextProvider = (props)=>{
    const navigate = useNavigate()
    const [user,setUser] = useState(null);
    const [showLogin,setShowLogin] = useState(false)

    const [token,setToken] = useState(localStorage.getItem('token'))

    const [credit ,setCredit] = useState(0);

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    
    const loadCreaditsData = async () => {
        if (!token) return;
    
        try {
            const response = await axios.get(`${backendUrl}/api/user/credits`, {
                headers: { token }
            });
    
            const data = response.data;
    
            if (data.success) {
                setCredit(data.credits);
                setUser(data.user);
            } else {
                toast.error("Failed to load credits. Please try again.");
            }
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to load credits. Please login again.");
        }
    };
    const generateImage = async(prompt)=>{
            try {
                
               const response = await axios.post(backendUrl+'/api/image/generate-image',{prompt},{headers:{token}})
               const data = response.data;

               if(data.success){
                loadCreaditsData()
                return data.resultImage
               }
               else{
                toast.error(data.message)
                loadCreaditsData()
                if(data.creditBalance===0){
                        navigate('/buy')
                }
               }
            } catch (error) {
                console.log(error.message)
                toast.error(error.message)
            }
}
    const logout = ()=>{
        localStorage.removeItem('token');
        setToken('')
        setUser(null)
    }

    useEffect(()=>{
        if(token){
            loadCreaditsData()
        }
    },[token])

    const value ={
        user, setUser,showLogin,setShowLogin,backendUrl,token,credit,setToken,setCredit,loadCreaditsData,logout,generateImage
    }

    return (
        <AppContext.Provider value={value}>
                {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;