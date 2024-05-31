
export type Id = string | number;

interface IGlobal {
    id: Id;
}

export interface ICategory extends IGlobal {
    name: string;
    description: string;
}

export interface IDishOrder extends IGlobal {
    name: string;
    categories: ICategory[];
    price: number;
    description: string;
    discount: number;
    images: string[];
    availableQuantity: number;
}