import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import PostDetails from "@/pages/PostDetails";
import LogInPage from "@/pages/LogInPage";
import Registration from "@/pages/Registration";
import DashBoard from "@/layout/DashBoard";
import PrivateRoute from "./PrivateRoute";
import MyProfile from "@/DashBoard/MyProfile";
import AddPost from "@/DashBoard/AddPost";
import MembershipPage from "@/pages/MembershipPage";
import MyPost from "@/DashBoard/MyPost";
import AllUsers from "@/DashBoard/Allusers";
import MakeAnnouncement from "@/DashBoard/MakeAnnouncement";
import AdminRoute from "./AdminRoute";
import AdminProfile from "@/DashBoard/AdminProfile";
import Payment from "@/DashBoard/Payment";
import ErrorPage from "@/components/ErrorPage";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/postdetails/:id",
                element: <PrivateRoute>
                    <PostDetails />
                </PrivateRoute>,
            },
            {
                path: "/membership",
                element: <PrivateRoute>
                    <MembershipPage />
                </PrivateRoute>,
            },
            {
                path: "/login",
                element: <LogInPage />,
            },
            {
                path: "/registration",
                element: <Registration />,
            },
        ],
    },
    {
        path: "/dashboard",
        element:
            <PrivateRoute>
                <DashBoard />
            </PrivateRoute>,
        children: [
            {
                path: "/dashboard/myprofile",
                element: <MyProfile />,
            },
            {
                path: "/dashboard/addpost",
                element: <AddPost />,
            },
            {
                path: "/dashboard/mypost",
                element: <MyPost />,
            },
            {
                path: "/dashboard/alluser",
                element:
                    <AdminRoute>
                        <AllUsers />
                    </AdminRoute>,
            },
            {
                path: "/dashboard/announcement",
                element:
                    <AdminRoute>
                        <MakeAnnouncement />,
                    </AdminRoute>
            },
            {
                path: "/dashboard/adminprofile",
                element: <AdminProfile />,

            },
            {
                path: "/dashboard/payment",
                element: <Payment />,

            },

        ]
    }
]);

export default router;
