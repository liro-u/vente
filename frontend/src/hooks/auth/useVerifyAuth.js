import { useLogout } from "./useLogout";

export const useVerifyAuth = () => {
    const { logout } = useLogout();

    const verifyAuth = (json) => {

        if (json.error === "session expired") {
            alert("session expired");
            logout();
        }
    }

    return {verifyAuth};
}