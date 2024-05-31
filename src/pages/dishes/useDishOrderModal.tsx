
import { Button, Divider, Drawer, Form, Input, Modal } from 'antd'
import { Dispatch, FC, memo, SetStateAction, useState } from 'react'
import { IDishOrder } from '../../lib/models/IRestaurant.model'
import { AddFile } from '../../components'
import Category from '../category'

type DishOrderModalProps = Partial<IDishOrder> & {
    onUpdate: (props: IDishOrder) => void
}

export default function useDishOrderModal(): [
    FC<DishOrderModalProps>,
    Dispatch<SetStateAction<boolean>>
] {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [form] = Form.useForm()

    const Component = ({

        availableQuantity,
        categories,
        description,
        discount,
        id,
        images,
        name,
        price,
        onUpdate
    }: DishOrderModalProps) => {

        const [isDrawerOpen, setIsDrawerOpen] = useState(false)

        const MemoCategory = memo(Category)

        const handleFinish = async () => {
            await form.validateFields()

            setIsModalOpen(false)

            onUpdate(form.getFieldsValue())
        }

        return (
            <Modal
                cancelText="Cancelar"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                centered
                closable={false}
                onOk={handleFinish}
                title="Actualizar Platillo"
            >

                <Form>
                    <Form.Item name="name" label="Nombre"
                        rules={[{
                            required: true,
                            message: "Ingresa un nombre"
                        }]}
                    >
                        <Input
                            defaultValue={name}
                        />
                    </Form.Item>
                    {/*  */}
                    <Form.Item name="price" label="Precio"
                        rules={[{
                            required: true,
                            message: "Ingresa un Precio",
                            type: "number"
                        }]}
                    >
                        <Input
                            defaultValue={price}
                        />
                    </Form.Item>
                    {/*  */}
                    <Form.Item name="discount" label="Descuento"
                        rules={[{
                            required: true,
                            message: "Ingresa un Descuento",
                        }]}
                    >
                        <Input
                            defaultValue={discount}
                        />
                    </Form.Item>
                    {/*  */}
                    <Form.Item name="availableQuantity" label="Cantidad Disponible"
                        rules={[{
                            required: true,
                            message: "Ingresa una Cantidad Disponible",
                        }]}
                    >
                        <Input
                            defaultValue={availableQuantity}
                        />
                    </Form.Item>
                    {/*  */}
                    <Form.Item name="description" label="Descripciòn"
                        rules={[{
                            required: true,
                            message: "Ingresa una Descripciòn",
                        }]}
                    >
                        <Input
                            defaultValue={description}
                        />
                    </Form.Item>
                    {/*  */}
                </Form>

                <Drawer
                    open={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                >
                    <MemoCategory
                        opt='non-options'
                        initial={categories}
                        style='modify'
                        gutter={24}
                        colSize={{
                            span: 24,
                        }}
                    />

                    <Divider orientation='right'>Agregar Categorias</Divider>
                    <MemoCategory
                        opt='non-options'
                        style='modify'
                        gutter={24}
                        colSize={{
                            span: 24,
                        }}
                    />
                </Drawer>
                <Button onClick={() => setIsDrawerOpen(true)}>Categorias</Button>
                <AddFile limit={3} key={id} />
            </Modal>
        )
    }
    return [
        Component,
        setIsModalOpen
    ]
}
