import { ICategory, IExtendedCategory, Id } from "../../lib/models/IRestaurant.model";
import { categories } from "../../lib/data";
import { createAppSlice } from "../hooks";
import { AsyncOperations } from "../../lib/types";
import { thunkHandler } from "../../lib/utils/redux.utils";
import { delay } from "../../lib/utils/helpers";

type InitialStateType = AsyncOperations<IExtendedCategory[]>
const initialState: InitialStateType = {
    data: [],
    hasError: "non-error",
    isLoading: false,
    loadingType: "",
}

const categoryThunkHandler = <Payload>() => thunkHandler<Payload, IExtendedCategory[], InitialStateType>;

export const categorySlice = createAppSlice({
    initialState,
    name: "categories",
    reducers: (create) => ({

        getCategories: create.asyncThunk(async () => {

            // await delay(2000)
            return categories
        },

            categoryThunkHandler<IExtendedCategory[]>()(
                (state, action) => {
                    state.data = action.payload
                }, "get"
            )
        ),

        createCategory: create.asyncThunk(async (category: ICategory) => {

            await delay(2000)

            const c: IExtendedCategory = {
                ...category,
                id: Date.now()
            }
            return c
        }, categoryThunkHandler<IExtendedCategory>()(
            (state, action) => {
                state.data.push(action.payload)
            }, "create"
        )),

        deleteCategory: create.asyncThunk(async (id: Id) => {
            await delay(2000)

            return id
        }, categoryThunkHandler<Id>()(
            (state, action) => {
                state.data = state.data.filter(c => c.id !== action.payload)
            }, "delete"
        )),

        updateCategory: create.asyncThunk(async (category: IExtendedCategory) => {

            await delay(2000)

            return category
        }, categoryThunkHandler<IExtendedCategory>()(
            (state, action) => {
                state.data = state.data.map(d => {
                    if (d.id === action.payload.id) {
                        return action.payload
                    }
                    return d
                })

            }, "update"
        ))
    })
})

export const {
    getCategories,
    createCategory,
    deleteCategory,
    updateCategory
} = categorySlice.actions

export default categorySlice.reducer;