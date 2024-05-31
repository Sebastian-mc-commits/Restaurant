
import IconParent from './IconParent'
import Category from "../../assets/category/category-dark.svg"
import CategoryFill from "../../assets/category/category-fill.svg"
import CategoryLight from "../../assets/category/category-light.svg"
import { IconProps } from '../../lib/types.d'
import { FC } from 'react'

type CategoryIconProps = FC<IconProps> & {
    fill: FC<IconProps>;
    light: FC<IconProps>;
}

const CategoryIcon: CategoryIconProps = ({ size, onTouch }: IconProps) => {

    return (
        <IconParent icon={Category} size={size} onTouch={onTouch} key="CategoryIcon" />
    )
}

CategoryIcon.fill = ({ size, onTouch }: IconProps) => (
    <IconParent icon={CategoryFill} size={size} onTouch={onTouch} key="CategoryIconFill" />
)

CategoryIcon.light = ({ size, onTouch }: IconProps) => (
    <IconParent icon={CategoryLight} size={size} onTouch={onTouch} key="CategoryIconLight" />
)

export default CategoryIcon