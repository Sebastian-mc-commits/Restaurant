import { IconParams } from "../components/icons/IconParent"

export type IconProps = Readonly<Omit<IconParams, "icon">>

export type Routes = "/category" | "/configuration" | "/dishes"
    | "/" | "/dishOfTheDay" | "/configuration/user" | "/configuration/system" | "/roles"
    | "/roles/createUser"
    | "/roles/createRole"