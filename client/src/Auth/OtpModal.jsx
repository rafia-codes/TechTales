import Otpcomp from './Otp.jsx';
import {useContext,createContext,useState} from 'react';

const OtpModalContext=createContext();

export const OtpModalProvider=({children})=>{
    const [showOtp,setShowOtp]=useState(false);
    const [email,setEmail]=useState("");

    const showModal=(emailval)=>{
        if(emailval){
            setEmail(emailval);
            setShowOtp(true);
        }
    }

    const closeModal=()=>{
        setShowOtp(false);
        setEmail("");
    }
    return (
        <OtpModalContext.Provider value={{email,showModal,closeModal}}>
            {children}
            {showOtp && <>
            <Otpcomp email={email}/></>}
        </OtpModalContext.Provider>
    )
}

export const useOtpModal=()=>useContext(OtpModalContext);
