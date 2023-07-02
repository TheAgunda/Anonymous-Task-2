import { BrowserRouter, Route, Routes } from "react-router-dom"

import LoginComponent from "./auth/LoginComponent";
import PersistLogin from "./auth/PersistLogin";
import PostForm from "./Components/PostFrom";
import Home from "./page/Home";
import RequireAuth from "./auth/RequireAuth"
function Router(props) {
    return (
        <BrowserRouter >
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginComponent />} />
                <Route element={<PersistLogin />}>
                    <Route element={<RequireAuth />}>
                        <Route path="/add-data" element={<PostForm />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;