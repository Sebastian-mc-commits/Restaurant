
import { FC } from 'react'
import { IconProps } from '../../lib/types.d'
import IconParent from './IconParent'
import ConfigurationGear from "../../assets/configuration/configuration-gear-options.svg"
import ConfigurationGearFill from "../../assets/configuration/configuration-gear-fill.svg"
import ConfigurationGearLight from "../../assets/configuration/configuration-gear-options-light.svg"
import ConfigurationGearFillLight from "../../assets/configuration/configuration-gear-light-fill.svg"

type ConfigurationGearIconOnReturn = FC<IconProps> & {
    fill: FC<IconProps>;
    light: FC<IconProps>;
    fillLight: FC<IconProps>;
}

const ConfigurationGearIcon: ConfigurationGearIconOnReturn = ({ size, onTouch }: IconProps) => {
    return (
        <IconParent icon={ConfigurationGear} size={size} onTouch={onTouch} key="ConfigurationGearIcon" />
    )
}

ConfigurationGearIcon.fill = ({ size, onTouch }) => (
    <IconParent icon={ConfigurationGearFill} size={size} onTouch={onTouch} key="ConfigurationGearIconFill" />
)

ConfigurationGearIcon.light = ({ size, onTouch }) => (
    <IconParent icon={ConfigurationGearLight} size={size} onTouch={onTouch} key="ConfigurationGearIconLight" />
)

ConfigurationGearIcon.fillLight = ({ size, onTouch }) => (
    <IconParent icon={ConfigurationGearFillLight} size={size} onTouch={onTouch} key="ConfigurationGearIconFillLight" />
)

export default ConfigurationGearIcon