
import { FC } from 'react'
import { IconProps } from '../../lib/types'
import IconParent from './IconParent'
import DishDinner from "../../assets/dishes/dish-dinner-colorful.svg"
import DishPlate from "../../assets/dishes/dish-plate-colorful.svg"

type DishIconOnReturn = FC<IconProps> & {
    plate: FC<IconProps>
}

const DishIconColorful: DishIconOnReturn = ({ size, onTouch }: IconProps) => {
    return (
        <IconParent icon={DishDinner} size={size} onTouch={onTouch} key="DishIconColorful" />
    )
}

DishIconColorful.plate = ({ size, onTouch }) => (
    <IconParent icon={DishPlate} size={size} onTouch={onTouch} key="DishPlateIcon" />
)

export default DishIconColorful