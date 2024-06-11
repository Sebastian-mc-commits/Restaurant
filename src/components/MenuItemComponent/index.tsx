import { Button, Card, Flex, Image } from "antd"
import { IExtendedMenuItem, Id } from "../../lib/models/IRestaurant.model"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { FC, useEffect, useMemo, useState } from "react"
import { LoadingTypes } from "../../lib/types"
import useMenuItemModal from "./useMenuItemModal"
import OnDelete from "../OnDelete"
import LabelSpan from "../LabelSpan"
import { CategoryItem } from ".."
import { colors } from "../../lib/utils/helpers"
import { deleteMenuItem, removeCategory, updateMenuItem } from "../../store/services/menuItemSlice"

type MenuItemComponentProps = FC<IExtendedMenuItem> & {
    FullOptions: FC<IExtendedMenuItem>;
    ItemDetails: FC<IExtendedMenuItem>;
}

const contentStyle: React.CSSProperties = {
    margin: 0,
    maxWidth: "50%",
    maxHeight: "50%",
    minWidth: "50%",
    minHeight: "50%",
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    backgroundColor: '#364d79',
};

const MenuItemComponent: MenuItemComponentProps = ({
    availableQuantity,
    categories,
    description,
    discount,
    id,
    images,
    name,
    price,
    menuOfTheDay
}: IExtendedMenuItem) => {

    const image = useMemo<string>(() => {
        const { random, floor } = Math

        return images[floor(random() * images.length - 1)]
    }, [id])

    return (
        <Card>
            <Flex gap={10} vertical>

                <div style={contentStyle}>

                    <Image
                        src={image}
                        alt={name}
                    />
                </div>

                <MenuItemComponent.ItemDetails
                    availableQuantity={availableQuantity}
                    categories={categories}
                    id={id}
                    images={images}
                    menuOfTheDay={menuOfTheDay}
                    name={name}
                    price={price}
                    description={description}
                    discount={discount}
                />
                <Flex align='center' gap={10} wrap={false} style={{
                    overflow: "auto"
                }}>
                    {
                        categories.map(({
                            description,
                            id,
                            name
                        }) => (
                            <LabelSpan text={name}
                                key={id}>
                                <CategoryItem
                                    description={description}
                                    id={id}
                                    name={name}
                                />
                            </LabelSpan>
                        ))
                    }
                </Flex>
            </Flex>
        </Card>
    )
}

MenuItemComponent.ItemDetails = ({
    availableQuantity,
    description,
    discount,
    name,
    price,
}: IExtendedMenuItem) => {
    return (

        <Flex
            vertical
            gap={1.5}

        >
            <h3>{name}</h3>
            <p><strong>Precio: </strong>{price}</p>
            <p><strong>Descuento: </strong>{discount}</p>
            <p><strong>Cantidad Disponible: </strong>{availableQuantity}</p>
            <p>{description}</p>
        </Flex>
    )
}

MenuItemComponent.FullOptions = ({
    availableQuantity,
    categories,
    description,
    discount,
    id,
    images,
    name,
    price,
    menuOfTheDay
}: IExtendedMenuItem) => {

    const [MenuItemModal, setModal] = useMenuItemModal()
    const dispatch = useAppDispatch()
    const { loadingType, isLoading } = useAppSelector(state => state.menuItemSlice)

    const [loadType, setLoadType] = useState<LoadingTypes>("")
    const image = useMemo<string>(() => {
        const { random, floor } = Math

        return images[floor(random() * images.length - 1)]
    }, [id])

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
        dispatch(deleteMenuItem(id))
    }

    const onRemoveCategoryItem = (categoryID: Id) => {
        setLoadType("deleteEntityFromOne")
        console.log("onRemoveCategoryItem: ", categoryID, id)
        dispatch(removeCategory({
            menuItemID: id,
            categoryID
        }))
    }

    const onUpdate = (props: IExtendedMenuItem) => {
        dispatch(updateMenuItem(props))
    }

    return (
        <Card style={{
            width: "100%"
        }}>

            <MenuItemModal
                availableQuantity={availableQuantity}
                categories={categories}
                description={description}
                discount={discount}
                id={id}
                images={images}
                name={name}
                price={price}
                key={id}
                onUpdate={onUpdate}
            />
            <Flex gap={5} vertical>

                <Flex justify="space-around" align="center">

                    <div style={contentStyle}>

                        <Image
                            src={image}
                            alt={name}
                            style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                minWidth: "100%",
                                minHeight: "100%",
                            }}
                        />
                    </div>

                    <MenuItemComponent.ItemDetails
                        availableQuantity={availableQuantity}
                        categories={categories}
                        id={id}
                        images={images}
                        menuOfTheDay={menuOfTheDay}
                        name={name}
                        price={price}
                        description={description}
                        discount={discount}
                    />
                </Flex>

                <Flex align='center' gap={10} wrap={false} style={{
                    overflow: "auto",
                    backgroundColor: colors.lightGray,
                    padding: 7,
                    paddingLeft: 8,
                    borderRadius: 100
                }}>
                    {
                        categories.map(({
                            description,
                            id,
                            name
                        }) => (
                            <OnDelete onClick={() => onRemoveCategoryItem(id)} key={id} size='small'>
                                {
                                    loadType === "deleteEntityFromOne" && <p>On loading</p>
                                }
                                <LabelSpan text={name}
                                    key={id}>
                                    <CategoryItem
                                        description={description}
                                        id={id}
                                        name={name}
                                    />
                                </LabelSpan>
                            </OnDelete>
                        ))
                    }
                </Flex>

                <Flex gap={3} align='center' wrap justify="flex-end">
                    <Button
                        type='dashed'
                        danger
                        onClick={() => onDelete(id)}>Eliminar</Button>
                    <Button
                        type='primary'
                        onClick={() => setModal(true)}
                    >Actualizar</Button>
                </Flex>
            </Flex>
        </Card>
    )
}

export default MenuItemComponent