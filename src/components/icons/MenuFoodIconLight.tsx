
import { FC } from 'react'
import { IconProps } from '../../lib/types'
import IconParent from './IconParent'
import MenuFoodLight from "../../assets/menu-food/menu-food-light.svg"
import MenuFoodLightFill from "../../assets/menu-food/menu-food-light-fill.svg"

type MenuFoodIconOnReturn = FC<IconProps> & {
    fill: FC<IconProps>
}

const MenuFoodIconLight: MenuFoodIconOnReturn = ({ size, onTouch }: IconProps) => {
    return (
        <IconParent icon={MenuFoodLight} size={size} onTouch={onTouch} key="MenuFoodIconLight" />
    )
}

MenuFoodIconLight.fill = ({ size, onTouch }) => (
    <IconParent icon={MenuFoodLightFill} size={size} onTouch={onTouch} key="MenuFoodIconFill" />
)

export default MenuFoodIconLight