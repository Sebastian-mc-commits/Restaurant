import { Col, Row } from "antd";
import { dishOrders } from "../../lib/data";
import DishChild from "./DishChild";
import { IDishOrder } from "../../lib/models/IRestaurant.model";
import { useState } from "react";

export default function Dishes() {

  const [dishOrderData, setDishOrderData] = useState<IDishOrder[]>(dishOrders)

  const onDelete = (id: string | number) => {
    setDishOrderData(prev => prev.filter((d) => d.id !== id))
  }

  return (
    <div>
      <Row
        gutter={15}
      >
        {
          dishOrderData.map(d => (
            <Col
              key={d.id}
              span={6}

              style={{
                minHeight: "10rem",
                padding: 15,
                margin: 15
              }}
            >
              <DishChild
                {...d}
                onDelete={onDelete}
                onUpdate={() => null}
              />
            </Col>
          ))
        }
      </Row>
    </div>
  )
}
