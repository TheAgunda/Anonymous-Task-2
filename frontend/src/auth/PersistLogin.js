import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from '../hooks/useAuth';
const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { auth, persist, setAuth } = useAuth();
    const userData = JSON.parse(localStorage.getItem("userData"));
    useEffect(() => {
        let isMounted = true;
        const isMoutedAndsetIsLoading = async (user) => {
            isMounted && setIsLoading(false);
        }
        !auth?.accessToken && persist ? isMoutedAndsetIsLoading() : setIsLoading(false);
        return () => isMounted = false;
    }, [isLoading])
    useEffect(() => {
        console.log(auth)
        setAuth(prev => {
            return userData;
        });
    }, [isLoading]);
    return (
        <>
            {!persist
                ? <Outlet />
                : isLoading
                    ? <div >
                        loading...
                    </div>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin