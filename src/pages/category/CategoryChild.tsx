import { Button, Card, Col, Flex, Row } from "antd"
import useModalCategory from "../../components/CategoryItem/useModalCategory"
import { ICategory } from "../../lib/models/IRestaurant.model"
import randomColor from "../../lib/utils/randomColor"

export type CategoryChildProps = ICategory & (
    {
        onDelete: (id: string | number) => boolean,
        onUpdate: (props: ICategory) => void,
        categoryType: "options"
    }
    |
    {
        categoryType: "non-options"
    }
)


export default function CategoryChild(categoryProps: CategoryChildProps) {

    const { name, id, description, categoryType } = categoryProps

    const [ModalCategory, setModal] = useModalCategory()
    const options = categoryType === "options"

    return (
        <Card hoverable>

            {
                options
                &&
                <ModalCategory
                    categoryTitle='Actualizar Categoria'
                    onFinish={props => categoryProps.onUpdate({ ...props, id })}
                    key={id}
                />
            }

            <Row justify='space-between' wrap gutter={15}>
                <Col style={{
                    backgroundColor: randomColor(),
                    width: "100%",
                    minHeight: "100%",
                }}
                    span={8}></Col>

                <Col span={16}>

                    <Flex vertical justify='space-between' align='center'>
                        <strong>{name}</strong>
                        <p>{description}</p>

                        {
                            options && (
                                <Flex gap={5} wrap>
                                    <Button onClick={() => categoryProps.onDelete(id)} danger>Eliminar</Button>
                                    <Button onClick={() => setModal(true)} type='primary'>Actualizar</Button>
                                </Flex>
                            )
                        }
                    </Flex>
                </Col>
            </Row>
        </Card>
    )
}