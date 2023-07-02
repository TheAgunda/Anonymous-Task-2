import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth } = useAuth();
    const logout = async () => {
        try {
        } catch (err) {
            console.error(err);
        }
    }
    return logout;
}

export default useLogout;