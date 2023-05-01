import { client } from "./clientUtil";
import { useAuth } from "../context/GlobalStates";
const useLogout = () => {
    const {setAuthState} = useAuth()
    // const refreshToken = localStorage.get('refreshToken')
    // localStorage.removeItem('refreshToken')
    const logout = async () => {
        const response = await client.post('/logout', {
            refreshToken : localStorage.getItem('refreshToken')
        });
        if(response.status==204){
            setAuthState({})
            localStorage.removeItem('refreshToken')
        }

     
    }
    return logout; 

    
};

export default useLogout