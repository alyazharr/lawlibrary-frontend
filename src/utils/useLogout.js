import { client } from "./clientUtil";
import { useAuth } from "../context/GlobalStates";
const useLogout = () => {
    const {setAuthState} = useAuth()

    const logout = async () => {
         
        client.get('/logout', {
            withCredentials: true
        }).then(res=>{
            if(res.status==204){
                setAuthState({})
            }
        }).catch(err=>{
            console.log(err)
        })
     
    }
    return logout; 
};

export default useLogout