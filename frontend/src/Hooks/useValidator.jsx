import { UseAuthContext } from "./useAuthContext";
import {useState, useEffect} from 'react'

 export const useValidator = ()=>{

const {user, dispatch} = UseAuthContext()
const [valid ,setValid] = useState(false)
const api= "http://localhost:8080/users/verify"
   
useEffect(()=>{
    if(!user){
      setValid(false)
      dispatch({type: 'LOGOUT'})
      return
    }
      const tok = user.token  
      console.log(tok)
    fetch(api, {
      method: "POST",
      headers: { authorization: `beared ${tok}` },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const states = data.user;
        setValid(states);
        if (!states) {
          dispatch({ type: "LOGOUT" });
        }
      })
      .catch((error) => {
        console.log(error)
      });
  },[ dispatch,user])

  return {valid}
}