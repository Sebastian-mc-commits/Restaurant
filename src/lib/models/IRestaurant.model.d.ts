
export type Id = string | number;
export type Roles = "admin" | "super-admin" | "user"
export type Modules = ""

export interface IBaseEntity {
    id: Id;
}

export interface IUser {
    name: string;
    email: string;
    password: string;
    role: Roles;
}

export interface IExtendedUser extends IUser, IBaseEntity { }

export interface ICategory {
    name: string;
    description: string;
}

export interface IExtendedCategory extends IBaseEntity, ICategory { };

export interface IMenuItem {
    price: number;
    description?: string;
    discount?: number;
    images: string[];
    availableQuantity: number;
    menuOfTheDay: boolean;
    userId?: Id;
    categories: IExtendedCategory[];
    name: string;
}

export interface IExtendedMenuItem extends IBaseEntity, IMenuItem { }

export interface IExtendedCategory_IExtendedMenuItem extends IExtendedCategory {
    menuItems: IExtendedMenuItem[];
}

export interface IModule extends IBaseEntity {
    type: Modules;
    disabled: boolean;
}

export interface ILocation {
    department: string;
    cities: string[];
}

export interface IExtendedLocation extends IBaseEntity, ILocation { }

export interface IAdmin {
    logo: string;
    location: string;
    userId?: Id;
    locationId?: Id;
}

export interface IExtendedAdmin extends IBaseEntity, IAdmin { }

export interface ISpot extends IBaseEntity {
    description?: string;
    adminId?: Id;
}

export interface IOrder extends IBaseEntity {
    total: number;
    subtotal: number;
    isPayed: boolean;
    totalQuantity: number;
    spot: ISpot;
}

export interface IMenuItemOrder extends IBaseEntity {
    quantity: number;
    total: number;
    price: number;
    orderId: IOrder[];
    menuItemId: IExtendedMenuItem[];
}
