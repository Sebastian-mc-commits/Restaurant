import { createContext, useContext } from "react";
import { ContextProviderProps } from "../lib/types";

const CategoryContext = createContext<undefined>(undefined)

export const useCategoryContext = () => {
    const context= useContext(CategoryContext)

    return context
}

export default function CategoryProvider ({children}: ContextProviderProps) {

    <CategoryContext.Provider value={{}}>

    </CategoryContext.Provider>
}