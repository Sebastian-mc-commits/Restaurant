
import { FC } from 'react'
import { IconProps } from '../../lib/types.d'
import IconParent from './IconParent'
import FoodLight from "../../assets/food/food-light.svg"
import FoodLightFill from "../../assets/food/food-menu-light-fill.svg"

type FoodIconOnReturn = FC<IconProps> & {
    fill: FC<IconProps>
}

const FoodIconLight: FoodIconOnReturn = ({ size, onTouch }: IconProps) => {
    return (
        <IconParent icon={FoodLight} size={size} onTouch={onTouch} key="FoodIconLight" />
    )
}

FoodIconLight.fill = ({ size, onTouch }) => (
    <IconParent icon={FoodLightFill} size={size} onTouch={onTouch} key="FoodIconFillLight" />
)

export default FoodIconLight