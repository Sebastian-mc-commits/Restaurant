
import { Button, Divider, Drawer, FloatButton, Form, Input, Modal } from 'antd'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { IExtendedMenuItem, Id } from '../../lib/models/IRestaurant.model'
import { AddFile, CategoryItem, RowContainer } from '..'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { CategoryIcon } from '../icons'
import { setCategoriesToMenuItem } from '../../store/services/menuItemSlice'

type MenuItemModalProps = Partial<IExtendedMenuItem> & {
    onUpdate: (props: IExtendedMenuItem) => void
}

export default function useMenuItemModal(): [
    FC<MenuItemModalProps>,
    Dispatch<SetStateAction<boolean>>
] {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const { isLoading, data } = useAppSelector(state => state.categorySlice)
    const dispatch = useAppDispatch()
    const [form] = Form.useForm()

    const Component = ({

        availableQuantity,
        categories,
        description,
        discount,
        id,
        name,
        price,
        onUpdate
    }: MenuItemModalProps) => {

        const [isDrawerOpen, setIsDrawerOpen] = useState(false)
        const [checkList, setCheckList] = useState<Id[]>([])

        const handleFinish = async () => {
            await form.validateFields()

            setIsModalOpen(false)

            onUpdate(form.getFieldsValue())
        }

        const handleChecked = (id: Id) => {
            setCheckList(prev => [
                ...prev,
                id
            ])
        }

        const handleUnchecked = (id: Id) => {
            setCheckList(prev =>
                prev.filter(item => item !== id)
            )
        }

        const onSelectCategories = () => {
            dispatch(setCategoriesToMenuItem({
                menuItemID: id!,
                categoryIDs: checkList,
            }))
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
                    <RowContainer>
                        {
                            categories!.map(ct => (
                                <RowContainer.Column
                                    key={ct.id}
                                    defaultColSize={{
                                        span: 24
                                    }}
                                >
                                    <CategoryItem {...ct} />
                                </RowContainer.Column>
                            ))
                        }
                    </RowContainer>

                    <Divider orientation='right'>Agregar Categorias</Divider>

                    {
                        isLoading && <p>Cargando Categorias</p>
                    }

                    <RowContainer>
                        {
                            data.map(ct => (
                                <RowContainer.Column
                                    key={ct.id}
                                    defaultColSize={{
                                        span: 24
                                    }}
                                >
                                    <CategoryItem.Check
                                        {...ct}
                                        checked={handleChecked}
                                        unchecked={handleUnchecked}
                                        label='Seleccionar Categoría'
                                    />
                                </RowContainer.Column>
                            ))
                        }
                    </RowContainer>

                    <FloatButton.Group
                        open={checkList.length > 0}
                    >

                        <FloatButton
                            shape='square'
                            icon={<CategoryIcon.fill size='medium' />}
                            tooltip={`Agregar Categorias Seleccionadas a ${name}`}
                            onClick={onSelectCategories}
                            badge={{
                                count: checkList.length,
                                color: "red"
                            }}
                        />
                    </FloatButton.Group>
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
