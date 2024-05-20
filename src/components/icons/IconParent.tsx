import { Button } from 'antd';
import { useCallback, useEffect, useState } from 'react'

type IconSize = "x_small" | "small" | "medium" | "large" | "x_large"
type IconTypes = {
    height: number,
    width: number,
}
export type IconParams = {
    size: IconSize;
    onTouch?: (fn: (size: IconSize) => void) => void;
    icon: string;
}

export default function IconParent({ size, onTouch, icon }: Readonly<IconParams>) {

    const reduce = useCallback((type: IconSize) => {
        let finalSize = 16

        if (type === "small") {
            finalSize = 24
        }
        else if (type === "medium") {
            finalSize = 32
        }
        else if (type === "large") {
            finalSize = 48
        }
        else if (type === "x_large") {
            finalSize = 64
        }

        return finalSize
    }, [])

    const [iconSize, setIconSize] = useState<IconTypes>({
        height: reduce(size),
        width: reduce(size)
    })

    useEffect(() => {
        setIconSize({
            ...iconSize,
            height: reduce(size),
            width: reduce(size)
        })
    }, [size])

    const handleTouch = useCallback((size: IconSize) => {
        setIconSize({
            ...iconSize,
            height: reduce(size),
            width: reduce(size)
        })
    }, [onTouch])

    return (
        <div
            style={{
                display: "flex",
                alignContent: "center",
                justifyContent: onTouch ? "flex-start" : "center",
                padding: 10
            }}
        >
            {
                onTouch ?
                    (
                        <Button type='primary'
                            style={{
                                height: iconSize.height + 10,
                            }}
                            onClick={() => onTouch && onTouch(handleTouch)}
                        >
                            <img
                                src={icon}
                                height={iconSize.height}
                                width={iconSize.width}
                                alt={icon}
                            />
                        </Button>
                    )
                    :
                    (
                        <img
                            src={icon}
                            height={iconSize.height}
                            width={iconSize.width}
                            alt={icon}
                        />
                    )
            }
        </div>
    )
}
