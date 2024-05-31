
import { Button, Card, Flex, Image } from 'antd'
import { IDishOrder } from '../../lib/models/IRestaurant.model'
import CategoryChild from '../category/CategoryChild'
import { useMemo, useState } from 'react'
import { LabelSpan, OnDelete } from '../../components'
import useDishOrderModal from './useDishOrderModal'

type DishOrderChildProps = IDishOrder & {
    onDelete: (id: string | number) => void
    onUpdate?: (props: IDishOrder) => void
}

const contentStyle: React.CSSProperties = {
    margin: 0,
    maxWidth: "100%",
    maxHeight: "100%",
    minWidth: "100%",
    minHeight: "100%",
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    backgroundColor: '#364d79',
};

function DishChild({
    availableQuantity,
    categories,
    description,
    discount,
    id,
    images,
    name,
    price,
    onDelete,
    onUpdate

}: DishOrderChildProps) {

    const [categoryItem, setCategoryItem] = useState(categories)
    const [DishModal, setDishModal] = useDishOrderModal()

    const handleUpdate = (props: IDishOrder) => {
        if (onUpdate) {
            onUpdate(props)
        }
    }

    const image = useMemo<string>(() => {
        const { random, floor } = Math

        return images[floor(random() * images.length - 1)]
    }, [id])


    const onRemoveCategoryItem = (id: string | number) => {
        setCategoryItem(prev => prev.filter(c => c.id !== id))
    }


    return (
        <Card>

            <DishModal
                availableQuantity={availableQuantity}
                categories={categories}
                description={description}
                discount={discount}
                id={id}
                images={images}
                name={name}
                price={price}
                onUpdate={handleUpdate}
                key={id}
            />
            <Flex gap={10} vertical>

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

                <Flex
                    vertical
                    gap={1.5}

                >
                    <h3>{name}</h3>
                    <p><strong>Precio: </strong>{price}</p>
                    <p><strong>Descuento: </strong>{discount}</p>
                    <p><strong>Cantidad Disponible: </strong>{availableQuantity}</p>
                    <p>{description}</p>

                    <Flex align='center' gap={10} wrap={false} style={{
                        overflow: "auto"
                    }}>
                        {
                            categoryItem.map(({
                                description,
                                id,
                                name
                            }) => (
                                <OnDelete onClick={() => onRemoveCategoryItem(id)} key={id} size='small'>
                                    <LabelSpan text={name}
                                        child={
                                            <CategoryChild
                                                description={description}
                                                id={id}
                                                name={name}
                                                key={id}
                                                categoryType='non-options'
                                            />
                                        }
                                    />
                                </OnDelete>
                            ))
                        }
                    </Flex>

                    <Flex gap={3} align='center' wrap>
                        <Button
                            type='dashed'
                            danger
                            onClick={() => onDelete(id)}>Eliminar</Button>
                        <Button
                            type='primary'
                            onClick={() => setDishModal(true)}
                        >Actualizar</Button>
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    )
}

export default DishChild