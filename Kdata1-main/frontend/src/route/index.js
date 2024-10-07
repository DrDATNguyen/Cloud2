import Home from "../pages/Home/Home";
import Products from "../pages/Product/Product";
import Profile from "../pages/Profile";
import Login from "../pages/Login/Login";
import Hosting from "../pages/Product/Hosting/Hosting";
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/product/hosting', component: Hosting },
    { path: '/profile', component: Profile }
];


const privateRoutes = [
    // { path: '/profile', component: Profile },
];
export { publicRoutes, privateRoutes };