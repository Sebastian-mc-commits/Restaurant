
import { FC } from 'react'
import { IconProps } from '../../lib/types.d'
import IconParent from './IconParent'
import UserCircleLight from "../../assets/user/user-circle-light.svg"
import UserSquareLight from "../../assets/user/user-square-light.svg"

type UserCircleOnReturn = FC<IconProps> & {
    square: FC<IconProps>
}

const UserCircleIcon: UserCircleOnReturn = ({ size, onTouch }: IconProps) => {
    return (
        <IconParent icon={UserCircleLight} size={size} onTouch={onTouch} key="UserCircleIcon" />
    )
}

UserCircleIcon.square = ({ size, onTouch }) => (
    <IconParent icon={UserSquareLight} size={size} onTouch={onTouch} key="UserSquareLightIcon" />
)

export default UserCircleIcon