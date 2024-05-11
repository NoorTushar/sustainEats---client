import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { Triangle } from "react-loader-spinner";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
   const { user, loading } = useContext(AuthContext);

   // after login correct redirection (1)
   // here we will grab the path name of the private route which
   // we have set on the routes.jsx

   const location = useLocation();
   const pathName = location.pathname;
   if (loading) {
      return (
         <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
            <Triangle
               visible={true}
               height="80"
               width="80"
               color="#8E6D45"
               ariaLabel="triangle-loading"
               wrapperStyle={{}}
               wrapperClass=""
            />
         </div>
      );
   }

   if (user) {
      return children;
   }

   // after login correct redirection (2)
   // we will send our pathname through state props
   return <Navigate state={pathName} to={"/login"}></Navigate>;
};

PrivateRoute.propTypes = {
   children: PropTypes.node,
};

export default PrivateRoute;
