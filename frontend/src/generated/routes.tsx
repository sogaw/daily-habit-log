import EmailVerification from "../pages/email-verification";
import Home from "../pages/home";
import Index from "../pages/index";
import MeEdit from "../pages/me/edit";
import NotFound from "../pages/not-found";
import Onboard from "../pages/onboard";
import SignIn from "../pages/sign-in";
import SignUp from "../pages/sign-up";
const routes = [
  { path: "/email-verification", element: <EmailVerification /> },
  { path: "/home", element: <Home /> },
  { path: "/", element: <Index /> },
  { path: "/me/edit", element: <MeEdit /> },
  { path: "/not-found", element: <NotFound /> },
  { path: "/onboard", element: <Onboard /> },
  { path: "/sign-in", element: <SignIn /> },
  { path: "/sign-up", element: <SignUp /> },
];
export default routes;
