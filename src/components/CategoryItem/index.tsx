import { Button, Card, Checkbox, CheckboxProps, Col, Divider, Flex, Row } from "antd"
import { IExtendedCategory, Id } from "../../lib/models/IRestaurant.model"
import randomColor from "../../lib/utils/helpers"
import useModalCategory from "./useModalCategory"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { deleteCategory, updateCategory } from "../../store/services/categorySlice"
import { FC, useEffect, useMemo, useState } from "react"
import { LoadingTypes } from "../../lib/types"

type CategoryChildProps = FC<IExtendedCategory> & {
    DeleteOnly: FC<IExtendedCategory>;
    DeleteAndUpdate: FC<IExtendedCategory>;
    Check: FC<IExtendedCategory & {
        checked: (id: Id) => void;
        unchecked: (id: Id) => void;
        label: string;
    }>;
}

const CategoryChild: CategoryChildProps = ({ description, name }: IExtendedCategory) => {

    const getRandomColor = useMemo(randomColor, [])

    return (
        <Card hoverable>

            <Row justify='space-between' wrap gutter={15}>
                <Col style={{
                    backgroundColor: getRandomColor,
                    width: "100%",
                    minHeight: "100%",
                }}
                    span={8}></Col>

                <Col span={16}>

                    <Flex vertical justify='space-between' align='center'>
                        <strong>{name}</strong>
                        <p>{description}</p>
                    </Flex>
                </Col>
            </Row>
        </Card>
    )
}

CategoryChild.DeleteAndUpdate = ({ description, id, name }: IExtendedCategory) => {

    const { loadingType, isLoading } = useAppSelector(state => state.categorySlice)
    const [loadType, setLoadType] = useState<LoadingTypes>("")
    const dispatch = useAppDispatch()
    const [ModalCategory, setModal] = useModalCategory()
    const getRandomColor = useMemo(randomColor, [])


    useEffect(() => {
        if (!isLoading) setLoadType("")
    }, [loadingType])

    if (loadType === "delete") {
        return <p>Eliminando</p>
    }

    if (loadType === "update") {
        return <p>Actualizando</p>
    }

    const onDelete = (id: Id) => {
        setLoadType("delete")
        dispatch(deleteCategory(id))
    }

    const onUpdate = (props: IExtendedCategory) => {
        setLoadType("update")
        dispatch(updateCategory(props))
    }

    return (
        <Card hoverable>

            <ModalCategory
                categoryTitle='Actualizar Categoria'
                onFinish={props => onUpdate({ ...props, id })}
                key={id}
            />

            <Row justify='space-between' wrap gutter={15}>
                <Col style={{
                    backgroundColor: getRandomColor,
                    width: "100%",
                    minHeight: "100%",
                }}
                    span={8}></Col>

                <Col span={16}>

                    <Flex vertical justify='space-between' align='center'>
                        <strong>{name}</strong>
                        <p>{description}</p>

                        <Flex gap={5} wrap>
                            <Button onClick={() => onDelete(id)} danger>Eliminar</Button>
                            <Button onClick={() => setModal(true)} type='primary'>Actualizar</Button>
                        </Flex>
                    </Flex>
                </Col>
            </Row>
        </Card>
    )
}

CategoryChild.DeleteOnly = ({ description, id, name }: IExtendedCategory) => {

    const [loadType, setLoadType] = useState<LoadingTypes>("")
    const { loadingType, isLoading } = useAppSelector(state => state.categorySlice)
    const dispatch = useAppDispatch()
    const getRandomColor = useMemo(randomColor, [])

    useEffect(() => {
        if (!isLoading) setLoadType("")
    }, [loadingType])

    if (loadType === "delete") {
        return <p>Eliminando</p>
    }

    const onDelete = (id: Id) => {
        setLoadType("delete")
        dispatch(deleteCategory(id))
    }

    return (
        <Card hoverable>

            <Row justify='space-between' wrap gutter={15}>
                <Col style={{
                    backgroundColor: getRandomColor,
                    width: "100%",
                    minHeight: "100%",
                }}
                    span={8}></Col>

                <Col span={16}>

                    <Flex vertical justify='space-between' align='center'>
                        <strong>{name}</strong>
                        <p>{description}</p>

                        <Button onClick={() => onDelete(id)} danger>Eliminar</Button>
                    </Flex>
                </Col>
            </Row>
        </Card>
    )
}

CategoryChild.Check = ({ description, id, name, label, checked, unchecked }) => {

    const getRandomColor = useMemo(randomColor, [])

    const handleChange: CheckboxProps["onChange"] = (e) => {

        if (e.target.checked) {
            checked(id)
        } else {
            unchecked(id)
        }
    }

    return (
        <Card hoverable>

            <Row justify='space-between' wrap gutter={15}>
                <Col style={{
                    backgroundColor: getRandomColor,
                    width: "100%",
                    minHeight: "100%",
                }}
                    span={8}></Col>

                <Divider>
                    <Checkbox onChange={handleChange}>
                        {label}
                    </Checkbox>
                </Divider>
                <Col span={16}>

                    <Flex vertical justify='space-between' align='center'>
                        <strong>{name}</strong>
                        <p>{description}</p>
                    </Flex>
                </Col>
            </Row>
        </Card>
    )
}

export default CategoryChild
//Delete
//Update
//Non options
//check
//On child check
//On press