
import { FC } from 'react'
import { IconProps } from '../../lib/types'
import IconParent from './IconParent'
import HamburgerMenu from "../../assets/menu/hamburger-menu.svg"
import HamburgerMenuCompressed from "../../assets/menu/compress-hamburger.menu.svg"

type HamburgerMenuIconOnReturn = FC<IconProps> & {
    compressed: FC<IconProps>
}

const HamburgerMenuIcon: HamburgerMenuIconOnReturn = ({ size, onTouch }: IconProps) => {
    return (
        <IconParent icon={HamburgerMenu} size={size} onTouch={onTouch} key="HamburgerMenuIcon" />
    )
}

HamburgerMenuIcon.compressed = ({ size, onTouch }) => (
    <IconParent icon={HamburgerMenuCompressed} size={size} onTouch={onTouch} key="HamburgerMenuIconCompressed" />
)

export default HamburgerMenuIcon