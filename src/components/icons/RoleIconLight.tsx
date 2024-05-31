
import { FC } from 'react'
import { IconProps } from '../../lib/types.d'
import IconParent from './IconParent'
import AdminLight from "../../assets/administration/admin-light.svg"
import BusinessLightFill from "../../assets/administration/business-light-fill.svg"

type RoleIconLightOnReturn = FC<IconProps> & {
    fill: FC<IconProps>
}

const RoleIconLight: RoleIconLightOnReturn = ({ size, onTouch }: IconProps) => {
    return (
        <IconParent icon={AdminLight} size={size} onTouch={onTouch} key="RoleIconLight" />
    )
}

RoleIconLight.fill = ({ size, onTouch }) => (
    <IconParent icon={BusinessLightFill} size={size} onTouch={onTouch} key="BusinessLightFillIcon" />
)

export default RoleIconLight