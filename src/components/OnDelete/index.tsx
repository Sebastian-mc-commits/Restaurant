import { ReactNode, ButtonHTMLAttributes, useMemo } from "react"
import styles from "./OnDelete.module.css"


type onDeleteProps = {
    children: ReactNode;
    size: "small" | "medium" | "large" | "x_large"
} & { [K in keyof ButtonHTMLAttributes<HTMLButtonElement>]?: ButtonHTMLAttributes<HTMLButtonElement>[K] }

function OnDelete({ children, size, ...buttonProps }: onDeleteProps) {

    const fontSize = useMemo<string>(() => {
        let fontSize = "10px"

        if (size === "medium") {
            fontSize = "15px"
        }
        else if (size === "large") {
            fontSize = "20px"
        }
        else if (size === "x_large") {
            fontSize = "25px"
        }

        return fontSize
    }, [size])

    return (
        <div className={styles?.container}>
            <button {...buttonProps} className={styles?.closeButton} style={{
                fontSize
            }}>
                <span>X</span>
            </button>

            {children}
        </div>
    )
}

export default OnDelete