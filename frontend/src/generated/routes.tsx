import EmailVerification from "../pages/email-verification";
import HabitsHabitIdEdit from "../pages/habits/[habitId]/edit";
import HabitsIndex from "../pages/habits/index";
import HabitsNew from "../pages/habits/new";
import Home from "../pages/home";
import Index from "../pages/index";
import MeAccount from "../pages/me/account";
import MeProfile from "../pages/me/profile";
import NotFound from "../pages/not-found";
import Onboard from "../pages/onboard";
import PasswordReset from "../pages/password-reset";
import SignIn from "../pages/sign-in";
import SignUp from "../pages/sign-up";
import SprintsSprintIdEdit from "../pages/sprints/[sprintId]/edit";
import SprintsIndex from "../pages/sprints/index";
import SprintsNew from "../pages/sprints/new";
const routes = [
  { path: "/email-verification", element: <EmailVerification /> },
  { path: "/habits/:habitId/edit", element: <HabitsHabitIdEdit /> },
  { path: "/habits", element: <HabitsIndex /> },
  { path: "/habits/new", element: <HabitsNew /> },
  { path: "/home", element: <Home /> },
  { path: "/", element: <Index /> },
  { path: "/me/account", element: <MeAccount /> },
  { path: "/me/profile", element: <MeProfile /> },
  { path: "/not-found", element: <NotFound /> },
  { path: "/onboard", element: <Onboard /> },
  { path: "/password-reset", element: <PasswordReset /> },
  { path: "/sign-in", element: <SignIn /> },
  { path: "/sign-up", element: <SignUp /> },
  { path: "/sprints/:sprintId/edit", element: <SprintsSprintIdEdit /> },
  { path: "/sprints", element: <SprintsIndex /> },
  { path: "/sprints/new", element: <SprintsNew /> },
];
export default routes;
