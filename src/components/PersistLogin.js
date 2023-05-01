import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import useRefreshToken from "../utils/useRefreshToken";
import { useAuth } from "../context/GlobalStates";
const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { authState } = useAuth();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            // console.log("hello")
            try {
                await refresh();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }

        !authState?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    }, [])

    useEffect(() => {
        // console.log(`isLoading: ${isLoading}`)
        // console.log(`aT: ${JSON.stringify(authState?.accessToken)}`)
    }, [isLoading])

    return (
        <>
            {isLoading
                    ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    )
}


export default PersistLogin