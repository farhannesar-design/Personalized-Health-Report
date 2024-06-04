import PaperGrid from "../components/Paper/paper"
// import { GoogleLogin } from '@react-oauth/google';
// import jwt_decode from "jwt-decode"
import { useGoogleLogin } from '@react-oauth/google';

function GoogleloginTest(){
    const login = useGoogleLogin({
        onSuccess: tokenResponse => console.log(tokenResponse),
      });
      
    return <button onClick={() => login()}>Sign in with Google 🚀</button>;
//     <GoogleLogin
//     onSuccess={credentialResponse => {
//         const credentialResponseDecoded = jwt_decode(credentialResponse.credential)
//       console.log(credentialResponse);
//     }}
//     onError={() => {
//       console.log('Login Failed');
//     }}
//   />;
}
export default GoogleloginTest