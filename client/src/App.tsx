import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Profile/Profile';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import { ConversationProvider } from './context/useActiveConvoContext';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import ProfileListings from './pages/Profile/ProfileListings/ProfileListings';
import ProfileDetails from './components/ProfileSettings/ProfileDetails/ProfileDetails';
import Message from './pages/Message/Message';

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackBarProvider>
          <AuthProvider>
            <ConversationProvider>
              <SocketProvider>
                <Switch>
                  <ProtectedRoute exact path="/dashboard" component={Dashboard} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/signup" component={Signup} />
                  <Route exact path="/profile">
                    <Profile />
                  </Route>
                  <Route exact path="/profiles">
                    <ProfileListings />
                  </Route>
                  <Route exact path="/profile-details">
                    <ProfileDetails />
                  </Route>
                  <Route exact path="/messages">
                    <Message />
                  </Route>
                  <Route path="*">
                    <Redirect to="/login" />
                  </Route>
                </Switch>
              </SocketProvider>
            </ConversationProvider>
          </AuthProvider>
        </SnackBarProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
