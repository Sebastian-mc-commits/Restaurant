import { MenuItemComponent, RowContainer } from "../../components";
import { Divider, DividerProps } from "antd";
import { Orientation } from "../../lib/types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useLayoutEffect } from "react";
import { getMenuItemsAndCategoryOrder } from "../../store/services/menuItemSlice";

export default function Dishes() {

  const { menuItemsAndCategoryOrder } = useAppSelector(state => state.menuItemSlice)
  const dispatch = useAppDispatch()

  useLayoutEffect(() => {
    dispatch(getMenuItemsAndCategoryOrder())
  }, [dispatch])

  const divideProps = (): DividerProps => {

    const random = Math.floor(Math.random() * 3)
    const orientations = ["center", "left", "right"] as Orientation[]

    return {
      orientation: orientations[random]
    }
  }

  return (
    <div>
      <RowContainer>
        {
          menuItemsAndCategoryOrder.map(d => (
            <RowContainer.Column
              defaultColSize={{
                span: 24
              }}
              key={d.id}>
              <Divider {...divideProps()}>{d.name}</Divider>
              <RowContainer>

                {
                  d.menuItems.map(m => (
                    <RowContainer.Column
                      key={m.id}
                      defaultColSize={{
                        span: d.menuItems.length % 2 !== 0 && d.menuItems[d.menuItems.length - 1].id === m.id ? 24 : 12
                      }}
                    >

                      <MenuItemComponent.FullOptions
                        {...m}
                      />
                    </RowContainer.Column>
                  ))
                }
              </RowContainer>
            </RowContainer.Column>
          ))
        }
      </RowContainer>
    </div>
  )
}
