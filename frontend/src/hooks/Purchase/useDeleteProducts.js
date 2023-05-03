import { useAuthContext } from '../auth/useAuthContext';
import { useVerifyAuth } from '../auth/useVerifyAuth';
import {useShoppingCartContext} from "./useShoppingCartContext";


export const useDeleteProducts = () => {
    const {user} = useAuthContext();
    const { dispatch } = useShoppingCartContext();
    const { verifyAuth } = useVerifyAuth();


    const handleDeleteProducts = async (products, isPending, setIsPending) => {
        if (!user){
            alert('You must be logged in')
            return
        }
        if (!isPending) {
            setIsPending(true)
                const response = await fetch(process.env.REACT_APP_PROXY + '/api/market/' + products._id, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Baerer ${user.token}`
                    }
                })
                const json = await response.json();

                if (response.ok) {
                    dispatch({type: 'REMOVE_PRODUCT', payload: json});
                }else{
                    verifyAuth(json);
                    console.log(json)
                    if (json.error !== "request is not authorized") {
                        // if not found on db, delete anyway because maybe was deleted by someone else
                        dispatch({type: 'REMOVE_PRODUCT', payload: products});
                    }
                }
            setIsPending(false)
        }
    }

    return {handleDeleteProducts};
}