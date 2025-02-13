import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";

// ? Default Component
import NotFound from '../Components/NotFound'
import NotFoundDashboard from '../Components/DashboardNotFound'

// ? Middleware
import MiddlwareLogin from '../Routes/middleware/Login'

// ? Auth Page
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";

// ? Dashboard Components
const DashboardLayout = lazy(() => import("../Layouts/SystemLayout"));

// ? View
const HomeIndex = lazy(() => import("../Pages/View/Home"));
const PostsDetail = lazy(() => import("../Pages/View/PostDetail"));

// ? Dashboard View
// const DashboardIndex = lazy(() => import("../Pages/Systems/Dashboard/Index"));

// ? Master
const UserIndex = lazy(() => import("../Pages/Systems/Users/Index"));
const PostsIndex = lazy(() => import("../Pages/Systems/Posts/Index"));
const TagsIndex = lazy(() => import("../Pages/Systems/Tags/Index"));

const Router = () => {
    return (
        <>
            <Routes>

                <Route path="/*" element={<NotFound />} />
                <Route path="/" element={<HomeIndex />} />
                <Route path="/posts/:uuid/detail" element={<PostsDetail />} />

                <Route element={<MiddlwareLogin Type="login" />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                <Route element={<MiddlwareLogin Type="check" />}>
                    <Route path="/system" element={<DashboardLayout />}>
                        <Route path="master/user" element={<UserIndex />} />
                        <Route path="master/tags" element={<TagsIndex />} />
                        <Route path="master/posts" element={<PostsIndex />} />
                        <Route path="*" element={<NotFoundDashboard />} />
                    </Route>
                </Route>

            </Routes>
        </>

    )
}

export default Router
