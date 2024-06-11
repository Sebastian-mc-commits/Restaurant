
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
    children: React.ReactNode;
    text: string;
} & { [K in keyof PopoverProps]?: PopoverProps[K] };

export default function LabelSpan({ children, text, ...popoverElements }: LabelSpanProps) {
    return (
        <Popover
            {...popoverElements}
            placement='topLeft'
            content={children}
        >
            <span
                style={labelCategoryStyle}
            >{text}</span>

        </Popover>
    )
}
