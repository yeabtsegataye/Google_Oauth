import {UseAuthContext} from './useAuthContext'
import { useNavigate } from 'react-router-dom';

export const UseLogout  = ()=>{
    const navigate = useNavigate();

    const {dispatch} = UseAuthContext()
    const logout =()=>{
        localStorage.removeItem('user');
        dispatch({type : "LOGOUT"})
        navigate('/login')

    }
    return {logout}
}