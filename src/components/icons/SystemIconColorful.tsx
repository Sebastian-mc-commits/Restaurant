
import { FC } from 'react'
import { IconProps } from '../../lib/types'
import IconParent from './IconParent'
import DNSColorful from "../../assets/system/dns-colorful.svg"
import ComputerColorful from "../../assets/system/system-computer-colorful.svg"

type SystemIconOnReturn = FC<IconProps> & {
    DNS: FC<IconProps>
}

const SystemIconColorful: SystemIconOnReturn = ({ size, onTouch }: IconProps) => {
    return (
        <IconParent icon={ComputerColorful} size={size} onTouch={onTouch} key="SystemIconColorful" />
    )
}

SystemIconColorful.DNS = ({ size, onTouch }) => (
    <IconParent icon={DNSColorful} size={size} onTouch={onTouch} key="DNSColorfulIcon" />
)

export default SystemIconColorful