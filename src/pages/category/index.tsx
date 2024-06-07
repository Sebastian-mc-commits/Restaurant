
import { Button, Col, Divider, Row } from 'antd'
import { ICategory } from '../../lib/models/IRestaurant.model';
import { categories } from '../../lib/data'
import { useCallback, useMemo, useState } from 'react'
import useModalCategory from '../../components/CategoryItem/useModalCategory';
import CategoryChild from './CategoryChild';
import { ComponentOptions } from '../../lib/models/types.models';
import { Gutter } from 'antd/es/grid/row';
import { ColSize } from 'antd/es/grid';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getCategories } from '../../store/features/categorySlice';

type CategoryProps = {
  initial?: ICategory[];
  opt: ComponentOptions;
  style: "non";
} | {
  initial?: ICategory[];
  opt: ComponentOptions;
  style: "modify";
  gutter: Gutter;
  colSize: ColSize
};

export default function Category({ initial, opt, style, ...rowProps }: Readonly<CategoryProps>) {

  const [categoryData, setCategoryData] = useState(initial || categories)
  const [ModalCategory, setIsModalOpen] = useModalCategory()
  const sliceCategories = useAppSelector(state => state.categorySlice)
  const dispatch = useAppDispatch()

  const modifyRowProps = style === "modify"

  const onDelete = (id: string | number) => {
    setCategoryData(prev => prev.filter(p => p.id !== id))

    return true
  }

  const onUpdate = (props: ICategory) => {
    setCategoryData(prev =>
      prev.map(ct => {
        if (ct.id === props.id) {
          return props
        }

        return ct
      })
    )

  }

  const onCreate = (values: Omit<ICategory, "id">) => {

    setCategoryData(prev => [
      ...prev,
      {
        ...values,
        id: Date.now()
      }
    ])

  }

  const childProps = useCallback((props: ICategory) => {

    if (opt === "non-options") {
      return {
        ...props,
        categoryType: 'non-options' as const,
      }
    }

    return {
      ...props,
      categoryType: "options" as const,
      onDelete,
      onUpdate
    }
  }, [opt, onDelete, onUpdate])

  const categoryChildStyles: ColSize = modifyRowProps ?
    (rowProps as { colSize: ColSize }).colSize
    :
    {
      span: 6
    }

  const handleCategories = () => {
    dispatch(getCategories())
  }

  return (
    <div>
      <Divider orientation='right'>
        {
          opt === "options" && <Button onClick={() => setIsModalOpen(true)} type='primary'>Crear Categoria</Button>
        }
      </Divider>
      <button
        onClick={handleCategories}
      >Get categories</button>
      <ModalCategory
        categoryTitle='Crea una Categoria'
        onFinish={onCreate}
      />
      <Row gutter={
        modifyRowProps ?
          (rowProps as { gutter: Gutter }).gutter
          :
          {
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32
          }
      }>

        {
          sliceCategories.map(ct => (
            <Col
              {...categoryChildStyles}
              style={{
                marginBottom: 15
              }}
              key={ct.id}
            >
              <CategoryChild
                {...childProps(ct)}
              />
            </Col>
          ))
        }
      </Row>
    </div>
  )
}
