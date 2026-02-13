import {createBrowserRouter} from "react-router-dom";
import LoginPage from "@/pages/LoginPage.jsx";
import {AuthProvider} from "@/contexts/AuthContext.js";
import {ROUTES} from "@/constants/PathRoutes.js";

const router = createBrowserRouter([

        {
            path: ROUTES.LOGIN,
            element: <AuthProvider/>,
            children:
                [
                    {
                        index: true,
                        element: <LoginPage/>,
                    },
                ]
        }
    ])
;

export default router;