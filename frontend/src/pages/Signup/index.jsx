import { useGoogleLogin } from '@react-oauth/google';
import { UseAuthContext } from '../../Hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';


function Login() {
    const { dispatch } = UseAuthContext();
    const navigate = useNavigate();

  const handleGoogleLoginSuccess = async(tokenResponse) =>{
    const accessToken = tokenResponse.access_token;
    const response = await fetch(
        'http://localhost:8080/users/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({accessToken}),
        }
      );
      const json = await response.json();
      if(!json){
        console.log(json)
        return
      }
      dispatch({ type: 'LOGIN', payload: json });
      localStorage.setItem('user', JSON.stringify(json));
      navigate('/')

    console.log(json)
    }

  function handleGoogleLoginFailure(error) {
    console.error('Google login failed:', error);
    // You can add error handling logic here, such as displaying an error message to the user.
    
    // Close the popup window in case of an error in modern browsers
    if (window.opener) {
      window.opener.postMessage({ type: 'CLOSE_POPUP' }, '*');
    } else {
      window.close();
    }
  }

  const login = useGoogleLogin({
    onSuccess: handleGoogleLoginSuccess,
    onFailure: handleGoogleLoginFailure,
  });

  return (
    <div>
      <div>
        <h1>Welcome back</h1>
        <div>
          <div>
            Remember Me <input type="checkbox" />
          </div>
        </div>
        <span>or</span>
        <button onClick={() => login()}>
          <i className="fa-brands fa-google"></i> register
        </button>
      </div>
    </div>
  );
}

export default Login;
