import { createBrowserRouter } from "react-router-dom";

import routes from "@/generated/routes";
import NotFound from "@/pages/not-found";

export const router = createBrowserRouter([...routes, { path: "*", element: <NotFound /> }]);
