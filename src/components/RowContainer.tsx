import { Col, Row } from "antd"
import { ColSize } from "antd/es/grid";
import { FC, ReactNode } from "react"

type RowContainerProps = {
    children: ReactNode;
}

type RowContainerReturn = FC<RowContainerProps> & {
    Column: FC<RowContainerProps & {
        defaultColSize?: ColSize
    }>
}
const RowContainer: RowContainerReturn = ({ children }: RowContainerProps) => {

    return (
        <Row gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32
        }}>

            {
                children
            }
        </Row>
    )
}

RowContainer.Column = ({ children, defaultColSize }) => {

    return (
        <Col
            style={{
                marginBottom: 15
            }}
            lg={defaultColSize?.span ?? 6}
            md={defaultColSize?.span ?? 12}
            sm={24}
            {...defaultColSize ?? {}}
        >
            {children}
        </Col>
    )
}

export default RowContainer