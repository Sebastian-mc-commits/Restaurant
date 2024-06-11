import { Form, Input, Modal } from "antd";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { ICategory } from "../../lib/models/IRestaurant.model";

type ModalCategoryProps = {
    onFinish: (props: ICategory) => void;
    categoryTitle: string;
  }

export default function useModalCategory(): [
    FC<ModalCategoryProps>,
    Dispatch<SetStateAction<boolean>>
  ] {
  
    const [form] = Form.useForm<ICategory>()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  
    const Component = ({ categoryTitle, onFinish }: ModalCategoryProps) => {
  
      const handleFinish = async (props: ICategory) => {
  
        await form.validateFields()
  
        setIsModalOpen(false)
        onFinish(props)
      }
  
      return (
        (
          <Modal
            cancelText="Cancelar"
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            centered={true}
            closable={false}
            onOk={() => handleFinish(form.getFieldsValue())}
            title={categoryTitle}
          >
  
            <Form
              form={form}
              name='category-modal'
              onFinish={handleFinish}
            >
  
              <Form.Item name="name" label="Nombre" rules={[{
                required: true,
                message: "Escribe una Categoria"
              }]}>
  
                <Input />
              </Form.Item>
  
              <Form.Item
                name="description"
                label="Descripcion"
                required={true}
                rules={[{
                  required: true,
                  message: "Escribe una Descripción"
                }]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        )
      )
    }
  
    return [
      Component,
      setIsModalOpen
    ]
  }