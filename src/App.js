import {
  Routes,
  Route,
  BrowserRouter,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Main from "./containers/main/Main";
import HomepageContainer from "./containers/homepage/HomepageContainer";
import TransactionsContainer from "./containers/chart/TransactionsContainer";
import DashboardContainer from "./containers/dashboard/DashboardContainer";
import ProfileContainer from "./containers/profile/ProfileContainer";
import AuthContainer from "./containers/auth/AuthContianer";
import LandingPage from "./containers/landing/LandingPage";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public pages */}
        <Route path="/" element={<Main />}>
        <Route index element={<LandingPage />} />
          <Route index element={<HomepageContainer />} />
          <Route path="/login" element={<AuthContainer type="login" />} />
          <Route path="/register" element={<AuthContainer type="register" />} />

          {/* private pages */}
          <Route path="/" element={<PrivateOutlet />}>
            <Route
              path="/transactions/:type"
              element={<TransactionsContainer />}
            />
            <Route
              path="/transactions/dashboard"
              element={<DashboardContainer />}
            />
            <Route path="/profile" element={<ProfileContainer />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function PrivateOutlet() {
  const auth = useSelector((state) => state.auth);
  return auth.status ? <Outlet /> : <Navigate to="/login" />;
}

// function PrivateRoute({ children }) {
//   const auth = useAuth();
//   return auth ? children : <Navigate to="/login" />;
// }

function useAuth() {
  const authMode = useSelector((state) => state.auth.authMode);
  return true;
}
