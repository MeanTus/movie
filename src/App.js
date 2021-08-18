import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.scss';
import { AdminForm } from './components/AdminForm';
import LoginAdmin from './components/LoginAdmin';
import NotFound from './components/NotFound';
import Booking from './layouts/Booking';
import Homepage from "./layouts/Homepage";
import MovieDetail from './layouts/MovieDetail';
import HomeProtectedRoute from './route/HomeProtectedRoute';
import HomeLayoutRoute from './route/HomeRoute';
import AdminRoute from "./route/AdminRoute";
import { Footer1 } from "./components/Footer1";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <HomeLayoutRoute path="/" exact={true} component={Homepage} />
        <HomeLayoutRoute path="/details/:idMovie" component={MovieDetail} />
        <HomeProtectedRoute path="/booking/:idMovie" component={Booking} />
        <Route path="/loginadmin" component={LoginAdmin} />
        <AdminRoute path="/admin" component={AdminForm} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
    // <Footer1 />
  );
}

export default App;
