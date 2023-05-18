import { client } from "./clientUtil";
import { useAuth } from "../context/GlobalStates";
const useRefreshToken = () => {
    const {setAuthState} = useAuth()

    const refresh = async () => {
        const response = await client.post('/refresh', {
            refreshToken : localStorage.getItem('refreshToken')
        });
        // console.log(response)
        setAuthState(prev => {
            // console.log(JSON.stringify(prev));
            // console.log(response.data.accessToken);
            // console.log(response)
            return { ...prev, username: response.data.username,accessToken: response.data.accessToken, roles:response.data.roles }
        });
        return response.data.accessToken;
    }
    return refresh; 
};

export default useRefreshToken;