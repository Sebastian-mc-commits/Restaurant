import { IExtendedCategory, IExtendedCategory_IExtendedMenuItem, IExtendedMenuItem } from "./models/IRestaurant.model";
import ChineseRice1 from "../assets/images/arroz_chino.jfif"
import ChineseRice2 from "../assets/images/arroz_chino2.jpg"
import ChineseRice3 from "../assets/images/arroz_chino3.jfif"

export const categories: IExtendedCategory[] = [
    {
        name: "Mariscos",
        description: "Mariscos Rico/s y delicioso/s",
        id: 1
    },
    {
        name: "Comidas Rapidas",
        description: "Comidas Rapidas Rico/s y delicioso/s",
        id: 2
    },
    {
        name: "Arrozes Tropicales",
        description: "Arrozes Tropicales Rico/s y delicioso/s",
        id: 3
    },
    {
        name: "Comida vegana",
        description: "Comida vegana Rico/s y delicioso/s",
        id: 4
    },
    {
        name: "Licores",
        description: "Licores Rico/s y delicioso/s",
        id: 5
    },
]

export const dishOrders: IExtendedMenuItem[] = [
    {
        name: "Arroz chino",
        categories: [categories[0], categories[2]],
        price: 20.000,
        menuOfTheDay: false,
        description: "Delicioso arroz chino",
        discount: 5,
        availableQuantity: 10,
        images: [
            ChineseRice1,
            ChineseRice2,
            ChineseRice3,
        ],
        id: 1,
    },
    {
        name: "Sushi",
        categories: [categories[0]],
        price: 25.000,
        menuOfTheDay: false,
        description: "Fresh and delicious sushi",
        discount: 0,
        availableQuantity: 15,
        images: [
            ChineseRice1,
            ChineseRice2,
            ChineseRice3,
        ],
        id: 2,
    },
    {
        name: "Taco",
        categories: [categories[1]],
        price: 10.000,
        menuOfTheDay: false,
        description: "Tasty taco",
        discount: 0,
        availableQuantity: 20,
        images: [
            ChineseRice1,
            ChineseRice2,
            ChineseRice3,
        ],
        id: 3,
    },
    {
        name: "Paella",
        categories: [categories[2]],
        price: 30.000,
        menuOfTheDay: false,
        description: "Traditional Spanish paella",
        discount: 10,
        availableQuantity: 8,
        images: [
            ChineseRice1,
            ChineseRice2,
            ChineseRice3,
        ],
        id: 4,
    },
    {
        name: "Vegan Burger",
        categories: [categories[3]],
        price: 15.000,
        menuOfTheDay: false,
        description: "Healthy and delicious vegan burger",
        discount: 0,
        availableQuantity: 12,
        images: [
            ChineseRice1,
            ChineseRice2,
            ChineseRice3,
        ],
        id: 5,
    },
    {
        name: "Mojito",
        categories: [categories[4]],
        price: 8.000,
        menuOfTheDay: false,
        description: "Refreshing mojito cocktail",
        discount: 0,
        availableQuantity: 25,
        images: [
            ChineseRice1,
            ChineseRice2,
            ChineseRice3,
        ],
        id: 6,
    },
    {
        name: "Seafood Paella",
        categories: [categories[0], categories[2]],
        price: 35.000,
        menuOfTheDay: false,
        description: "Exquisite seafood paella",
        discount: 0,
        availableQuantity: 10,
        images: [
            ChineseRice1,
            ChineseRice2,
            ChineseRice3,
        ],
        id: 7,
    },
];

export const extendedCategoriesWithMenuItems: IExtendedCategory_IExtendedMenuItem[] = categories.map(category => ({
    ...category,
    menuItems: dishOrders.filter(dish => dish.categories.some(cat => cat.id === category.id)),
}));