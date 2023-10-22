import {useGoogleLogin} from '@react-oauth/google';
import { UseAuthContext } from '../../Hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { dispatch } = UseAuthContext();
  const navigate = useNavigate();

  const handleGoogleLoginSuccess = async(tokenResponse) =>{

        const accessToken = tokenResponse.access_token;
try {
  
  const response = await fetch(
    'http://localhost:8080/users/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({accessToken}),
    }
    
  );

  const json = await response.json();
  console.log(json)
  if(!json){
    console.log(json)
    return
  }
  dispatch({ type: 'LOGIN', payload: json });
  localStorage.setItem('user', JSON.stringify(json));
  navigate('/')
} catch (error) {
  console.log(error)
}
  

    }
    function handleGoogleLoginFailure(error) {
      console.error('Google login failed:', error);
      // You can add error handling logic here, such as displaying an error message to the user.
    }
    const login = useGoogleLogin({
      onSuccess: handleGoogleLoginSuccess,
      onFailure: handleGoogleLoginFailure,
    });
    return (
        <div >
            <div >
                <h1>Welcome back</h1>
             
                 <button onClick={() => login()} >
                    <i className="fa-brands fa-google"></i>  login</button>
                    
            </div>

        </div>
    )
}

export default Login;