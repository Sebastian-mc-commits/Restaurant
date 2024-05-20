import { ReactNode } from 'react'
import RightBarMenu from './RightBarMenu'

type WrapperProps = {
    children: ReactNode
}
export default function Wrapper({ children }: WrapperProps) {
    return (
        <RightBarMenu>
            {children}
        </RightBarMenu>
    )
}
