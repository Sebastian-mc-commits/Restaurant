import { ICategory } from "../../lib/models/IRestaurant.model";
import { categories } from "../../lib/data";
import { createAppSlice } from "../hooks";

const initialState: ICategory[] = []

export const categorySlice = createAppSlice({
    initialState,
    name: "categories",
    reducers: (create) => ({

        getCategories: create.asyncThunk(async () => {

            await new Promise(rs => {
                setTimeout(() => {
                    rs(0)
                }, 2000)
            })
            return categories
        },
            {
                fulfilled: (satate, action) => {
                    state = action.payload
                }
            })
    })
})

export const {
    getCategories
} = categorySlice.actions

export default categorySlice.reducer;