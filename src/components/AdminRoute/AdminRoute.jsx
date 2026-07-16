import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../../firebase/config";


function AdminRoute({ children }) {


  const [user, loading] = useAuthState(auth);



  if (loading) {

    return (

      <h2>
        Carregando...
      </h2>

    );

  }



  if (!user) {

    return (

      <Navigate 
        to="/login" 
        replace 
      />

    );

  }



  return children;


}


export default AdminRoute;