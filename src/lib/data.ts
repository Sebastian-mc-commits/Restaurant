import { ICategory, IDishOrder } from "./models/IRestaurant.model";
import ChineseRice1 from "../assets/images/arroz_chino.jfif"
import ChineseRice2 from "../assets/images/arroz_chino2.jpg"
import ChineseRice3 from "../assets/images/arroz_chino3.jfif"

export const categories: ICategory[] = [
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

export const dishOrders: IDishOrder[] = [
    {
        name: "Arroz chino",
        categories: [categories[0], categories[2]],
        price: 20.000,
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