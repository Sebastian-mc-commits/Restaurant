import { ReactNode } from "react"
import { IconParams } from "../components/icons/IconParent"
import { Id } from "./models/IRestaurant.model";
import { PayloadAction } from "@reduxjs/toolkit";

export type IconProps = Readonly<Omit<IconParams, "icon">>
export type Orientation = "center" | "left" | "right"

export type Routes = "/category" | "/configuration" | "/dishes"
    | "/" | "/dishOfTheDay" | "/configuration/user" | "/configuration/system" | "/roles"
    | "/roles/createUser"
    | "/roles/createRole"

export type ContextProviderProps = {
    children: ReactNode;
};

export type Errors = "error" | "non-error";

export type ErrorType = {
    errorMessage: string;
    statusCode: number;
    clientMessage: string;
}

export type LoadingTypes = "delete" | "create" | "update" | "get" | "other" | "" | "deleteEntityFromOne" | "getCombinedEntityFrom"
    | "createToEntity"

export type AsyncOperations<Data> = ({
    hasError: "non-error";
    isLoading: boolean;
    loadingType: LoadingTypes;
    data: Data;
})
    |
    ({
        hasError: "error";
        isLoading: boolean;
        loadingType: LoadingTypes;
        error: ErrorType;
        data: Data;
    })