import React from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import {HashRouter, Route, Switch, Redirect, useLocation} from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import RTLLayout from "layouts/rtl";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import AuthContextProvider, {useAuth} from "./contexts/AuthContext";

ReactDOM.render(
    <AuthContextProvider>
      <ChakraProvider theme={theme}>
        <React.StrictMode>
          <HashRouter>
            <Switch>
              <ProtectedRoute path={`/auth`} component={AuthLayout} />
              <ProtectedRoute path={`/admin`} component={AdminLayout} />
              <Route path={`/rtl`} component={RTLLayout} />
              <Redirect from='/' to='/auth' />
            </Switch>
          </HashRouter>
        </React.StrictMode>
      </ChakraProvider>
    </AuthContextProvider>
  ,
  document.getElementById("root")
);

function ProtectedRoute(props) {
    const { currentUser } = useAuth()
    const location = useLocation()
    const { path } = props

    if(path === '/auth' || path === 'sign-up' || path === 'sign-in' || path === 'forgot-password'){
        return currentUser ? (<Redirect to={location.state?.from ?? '/admin'}/>
        ) : (
            <Route {...props}/>
        )
    }

    return currentUser ? <Route {...props} /> : <Redirect to={{
        pathname: '/sign-up',
        state: {from: path}
    }}/>
}
