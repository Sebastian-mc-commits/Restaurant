
import { Popover, PopoverProps } from 'antd'
import React, { CSSProperties } from 'react'

const labelCategoryStyle: CSSProperties = {
    backgroundColor: "#D3D3D3",
    padding: "0.5rem",
    borderRadius: "7px",
    fontSize: "0.7rem",
    fontWeight: "bolder",
    margin: "4 3",
    cursor: "pointer"
}

type LabelSpanProps = {
    child: React.ReactNode;
    text: string;
} & { [K in keyof PopoverProps]?: PopoverProps[K] };

export default function LabelSpan({ child, text, ...popoverElements }: LabelSpanProps) {
    return (
        <Popover
            {...popoverElements}
            placement='topLeft'
            content={child}
        >
            <span
                style={labelCategoryStyle}
            >{text}</span>

        </Popover>
    )
}
