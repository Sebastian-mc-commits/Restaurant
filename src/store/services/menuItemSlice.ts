import { IExtendedCategory, IExtendedCategory_IExtendedMenuItem, IExtendedMenuItem, IMenuItem, Id } from "../../lib/models/IRestaurant.model";
import { categories, dishOrders, extendedCategoriesWithMenuItems } from "../../lib/data";
import { createAppSlice } from "../hooks";
import { AsyncOperations } from "../../lib/types";
import { thunkHandler } from "../../lib/utils/redux.utils";
import { delay } from "../../lib/utils/helpers";

type InitialStateType = AsyncOperations<IExtendedMenuItem[]> & {
    menuItemsAndCategoryOrder: IExtendedCategory_IExtendedMenuItem[],
}

const initialState: InitialStateType = {
    data: [],
    hasError: "non-error",
    isLoading: false,
    loadingType: "",
    menuItemsAndCategoryOrder: [],
}

type CategoryAndMenuItemProps = {
    categoryID: Id,
    menuItemID: Id
}

type MenuItemAndCategoriesProps = {
    categories?: IExtendedCategory[],
    menuItemID: Id,
    categoryIDs: Id[]
}

const menuItemThunkHandler = <Payload>() => thunkHandler<Payload, IExtendedMenuItem[], InitialStateType>;

export const menuItemSlice = createAppSlice({
    initialState,
    name: "menuItems",
    reducers: (create) => ({

        getMenuItems: create.asyncThunk(async () => {

            return dishOrders
        },

            menuItemThunkHandler<IExtendedMenuItem[]>()(
                (state, action) => {
                    state.data = action.payload
                }, "get"
            )
        ),

        getMenuItemsAndCategoryOrder: create.asyncThunk(async () => {

            return extendedCategoriesWithMenuItems
        },

            menuItemThunkHandler<IExtendedCategory_IExtendedMenuItem[]>()(
                (state, action) => {
                    state.menuItemsAndCategoryOrder = action.payload
                }, "getCombinedEntityFrom"
            )
        ),

        createMenuItem: create.asyncThunk(async (menuItem: IMenuItem) => {

            await delay(2000)

            const m: IExtendedMenuItem = {
                ...menuItem,
                id: Date.now()
            }
            return m
        }, menuItemThunkHandler<IExtendedMenuItem>()(
            (state, action) => {
                state.data.push(action.payload)
            }, "create"
        )),

        deleteMenuItem: create.asyncThunk(async (id: Id) => {

            await delay(2000)

            return id
        }, menuItemThunkHandler<Id>()(
            (state, action) => {
                state.data = state.data.filter(c => c.id !== action.payload)
                state.menuItemsAndCategoryOrder = state.menuItemsAndCategoryOrder.map(m => {

                    const menuItems = m.menuItems.filter(mt => mt.id !== action.payload)
                    return {
                        ...m,
                        menuItems
                    }
                })
            }, "delete"
        )),

        removeCategory: create.asyncThunk(async ({ categoryID, menuItemID }: CategoryAndMenuItemProps) => {

            await delay(2000)

            return {
                categoryID,
                menuItemID
            } as CategoryAndMenuItemProps

        }, menuItemThunkHandler<CategoryAndMenuItemProps>()(
            (state, action) => {

                state.data = state.data.map(c => {

                    if (c.id !== action.payload.menuItemID) return c;

                    return {
                        ...c,
                        categories: c.categories.filter(ct => ct.id !== action.payload.categoryID)
                    }
                })

                state.menuItemsAndCategoryOrder = state.menuItemsAndCategoryOrder.map(mt => {

                    return {
                        ...mt,
                        menuItems: mt.menuItems.map(m => {

                            if (m.id !== action.payload.menuItemID) return m

                            return {
                                ...m,
                                categories: m.categories.filter(ct => ct.id !== action.payload.categoryID)
                            }
                        })
                    }
                })

                state.menuItemsAndCategoryOrder = state.menuItemsAndCategoryOrder.map(c => {

                    if (c.id !== action.payload.categoryID) return c;

                    return {
                        ...c,
                        menuItems: c.menuItems.filter(mt => {
                            if (mt.id === action.payload.menuItemID) return false

                            return true;
                        })
                    }
                })

            }, "deleteEntityFromOne"
        )),

        updateMenuItem: create.asyncThunk(async (menuItem: IExtendedMenuItem) => {

            await delay(2000)

            return menuItem
        }, menuItemThunkHandler<IExtendedMenuItem>()(
            (state, action) => {
                state.data = state.data.map(d => {
                    if (d.id === action.payload.id) {
                        return action.payload
                    }
                    return d
                })
            }, "update"
        )),

        setCategoriesToMenuItem: create.asyncThunk(async ({ menuItemID, categoryIDs }: MenuItemAndCategoriesProps) => {

            await delay(2000)

            const ct = categories.filter(c => categoryIDs.includes(c.id))

            return {
                categories: ct,
                menuItemID,
                categoryIDs
            } as MenuItemAndCategoriesProps
        }, menuItemThunkHandler<MenuItemAndCategoriesProps>()(
            (state, action) => {
                state.data = state.data.map(d => {
                    if (d.id !== action.payload.menuItemID) return d;

                    return {
                        ...d,
                        categories: [...d.categories, ...(action.payload.categories! ?? [])]
                    }
                })

                state.menuItemsAndCategoryOrder = state.menuItemsAndCategoryOrder.map(m => {

                    return {
                        ...m,
                        menuItems: m.menuItems.map(mt => {
                            if (mt.id !== action.payload.menuItemID) return mt;

                            return {
                                ...mt,
                                categories: [...mt.categories, ...(action.payload.categories! ?? [])]
                            }
                        })
                    }
                })
            }, "createToEntity"
        ))
    })
})

export const {
    createMenuItem,
    deleteMenuItem,
    getMenuItems,
    getMenuItemsAndCategoryOrder,
    removeCategory,
    updateMenuItem,
    setCategoriesToMenuItem
} = menuItemSlice.actions

export default menuItemSlice.reducer;