import { createContext,useContext,useState  } from "react";
import PassModal from "./PassModal.jsx"

const PassContext=createContext();

export const PassProvider=({children})=>{
    const [showPassMod,setShowPassMod]=useState(false);
    const [email,setEmail]=useState();

    const activate=(email)=>{
        if(email){
            setShowPassMod(true);
            setEmail(email);
        }
    }
    const deactivate=()=>setShowPassMod(false);

    return (
        <PassContext.Provider value={{email,activate,deactivate}}>
            {children}
            {showPassMod && <PassModal email={email}/>}
        </PassContext.Provider>
    )
}

export const usePassModal=()=>useContext(PassContext);