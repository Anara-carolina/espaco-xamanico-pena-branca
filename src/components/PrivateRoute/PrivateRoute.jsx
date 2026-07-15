import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../../firebase/config";


function PrivateRoute({ children }) {


  const [usuario, carregando] = useAuthState(auth);



  if (carregando) {

    return <p>Carregando...</p>;

  }



  if (!usuario) {

    return <Navigate to="/login" />;

  }



  return children;


}


export default PrivateRoute;