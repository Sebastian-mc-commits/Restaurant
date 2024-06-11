import { createBrowserRouter } from "react-router-dom";
import FoodOrders from "./pages/foodOrders";
import Category from "./pages/category";
import Dishes from "./pages/menuItem";
import DishOfTheDay from "./pages/dishOfTheDay";
import User from "./pages/configuration/user";
import System from "./pages/configuration/system";
import CreateUser from "./pages/roles/createUser";
import CreateRole from "./pages/roles/createRole";
import Wrapper from "./components/Wrapper";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Wrapper>
                <FoodOrders />
            </Wrapper>
        )
    },
    {
        path: "/category",
        element: (
            <Wrapper>
                <Category />
            </Wrapper>
        )
    },
    {
        path: "/dishes",
        element: (
            <Wrapper>
                <Dishes />
            </Wrapper>
        )
    },
    {
        path: "/dishOfTheDay",
        element: (
            <Wrapper>
                <DishOfTheDay />
            </Wrapper>
        )
    },
    {
        path: "/configuration",
        children: [
            {
                path: "user",
                element: (
                    <Wrapper>
                        <User />
                    </Wrapper>
                )
            },
            {
                path: "system",
                element: (
                    <Wrapper>
                        <System />
                    </Wrapper>
                )
            },
        ]
    },
    {
        path: "/roles",
        children: [
            {
                path: "createUser",
                element: (
                    <Wrapper>
                        <CreateUser />
                    </Wrapper>
                )
            },
            {
                path: "createRole",
                element: (
                    <Wrapper>
                        <CreateRole />
                    </Wrapper>
                )
            },
        ]
    },
])

export default router;