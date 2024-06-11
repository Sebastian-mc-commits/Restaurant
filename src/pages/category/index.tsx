
import { Button, Divider } from 'antd'
import { ICategory } from '../../lib/models/IRestaurant.model';
import useModalCategory from '../../components/CategoryItem/useModalCategory';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createCategory, getCategories } from '../../store/services/categorySlice';
import { Errors } from '../../lib/types';
import { CategoryItem, RowContainer } from '../../components';

export default function Category() {

  const [ModalCategory, setIsModalOpen] = useModalCategory()
  const sliceCategories = useAppSelector(state => state.categorySlice)
  const dispatch = useAppDispatch()

  const onCreate = (values: Omit<ICategory, "id">) => {

    dispatch(createCategory(values))
  }

  const handleCategories = () => {
    dispatch(getCategories())
  }

  if (sliceCategories.loadingType === "get") {
    return <div>Loading...</div>
  }

  if (sliceCategories.hasError as Errors === "error") {
    return <div>Error</div>
  }

  return (
    <div>
      <Divider orientation='right'>
        <Button onClick={() => setIsModalOpen(true)} type='primary'>Crear Categoria</Button>
      </Divider>
      <button
        onClick={handleCategories}
      >Get categories</button>
      <ModalCategory
        categoryTitle='Crea una Categoria'
        onFinish={onCreate}
      />
      <RowContainer>
        {
          sliceCategories.data.map(ct => (
            <RowContainer.Column
              key={ct.id}>
              <CategoryItem.DeleteAndUpdate
                {...ct}
              />

            </RowContainer.Column>
          ))
        }
      </RowContainer>
    </div>
  )
}
