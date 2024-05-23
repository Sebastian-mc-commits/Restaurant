
import { Button, Card, Col, Divider, Flex, Form, Input, Modal, Row } from 'antd'
import { ICategory } from '../../lib/models/IRestaurant.model'
import { categories } from '../../lib/data'
import { Dispatch, FC, SetStateAction, useState } from 'react'

type CategoryChildProps = ICategory & {
  onDelete: (id: string | number) => boolean,
  onUpdate: (props: ICategory) => boolean
}

type ModalCategoryProps = {
  onFinish: () => null;
  categoryTitle: string;
}

function modalCategory(): [
  FC<ModalCategoryProps>,
  Dispatch<SetStateAction<boolean>>
] {

  const [form] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const Component = ({ categoryTitle, onFinish }: ModalCategoryProps) => (
    <Modal
      cancelText="Cancelar"
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      centered={true}
      closable={false}
    >

      <Form
        form={form}
        name='category-modal'
        onFinish={onFinish}
      >

        <Form.Item name="name" label={categoryTitle} rules={[{
          required: true,
          message: "Escribe una Categoria"
        }]}>

          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )

  return [Component, setIsModalOpen]
}

function CategoryChild({ name, id, onDelete, onUpdate }: CategoryChildProps) {

  return (
    <Card hoverable>

      <Flex justify='space-between' align='center'>
        <div>Square</div>

        <Flex vertical justify='space-between' align='center'>
          <strong>{name}</strong>

          <Flex gap={10} wrap>
            <Button onClick={() => onDelete(id)} danger>Eliminar</Button>
            <Button onClick={() => onUpdate({ id, name })} type='primary'>Actualizar</Button>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  )
}

export default function Category() {

  const [categoryData, setCategoryData] = useState(categories)
  const [ModalCategory, setIsModalOpen] = modalCategory
  const [form] = Form.useForm()

  const onDelete = (id: string | number) => {
    setCategoryData(prev => prev.filter(p => p.id !== id))

    return true
  }

  const onUpdate = (props: ICategory) => {
    setIsModalOpen(true)
    setCategoryData(prev =>
      prev.map(ct => {
        if (ct.id === props.id) {
          return props
        }

        return ct
      })
    )

    return true
  }

  const onCreate = (values: Omit<ICategory, "id">) => {

    setCategoryData(prev => [
      ...prev,
      {
        ...values,
        id: Date.now()
      }
    ])

    setIsModalOpen(false)
  }

  return (
    <div>

      <Divider orientation='right'>
        <Button onClick={() => setIsModalOpen(true)} type='primary'>Crear Categoria</Button>
      </Divider>
      <ModalCategory />
      <Modal
        cancelText="Cancelar"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        centered={true}
        closable={false}
      >

        <Form
          form={form}
          name='create-category'
          onFinish={onCreate}
        >

          <Form.Item name="name" label='Categoria' rules={[{
            required: true,
            message: "Escribe una Categoria"
          }]}>

            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Row gutter={{
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32
      }}>

        {
          categoryData.map(ct => (
            <Col span={6}
              style={{
                marginBottom: 15
              }}
            >
              <CategoryChild
                {...ct}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            </Col>
          ))
        }
      </Row>
    </div>
  )
}
