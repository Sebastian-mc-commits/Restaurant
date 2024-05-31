import { Breadcrumb, Layout, Menu, MenuProps, theme } from 'antd'
import { CategoryIcon, ConfigurationGearIcon, DishIconColorful, FoodIconLight, MenuFoodIconLight, RoleIconLight, SystemIconColorful, UserCircleIcon } from './icons'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Routes } from '../lib/types.d'

type MenuItem = Required<MenuProps>["items"][number]
type RightBarMenuProps = {
  children: ReactNode
}

export default function RightBarMenu({ children }: RightBarMenuProps) {

  const navigate = useNavigate()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [currentRoute, setCurrentRoute] = useState<Routes>(location.pathname as Routes)
  const { token } = theme.useToken()
  useEffect(() => {
    setCurrentRoute(pt => pt = location.pathname as Routes)
    console.log(currentRoute)
  }, [location.pathname])

  const items = useMemo<MenuItem[]>(() => [
    {
      key: "/",
      icon: currentRoute === "/" ? <FoodIconLight.fill size='small' /> : <FoodIconLight size='small' />,
      label: 'Pedidos',
      onClick: () => {
        navigate("/")
      }
    },
    {
      key: '/category',
      icon: currentRoute === "/category" ? <CategoryIcon.fill size='small' /> : <CategoryIcon.light size='small' />,
      label: 'Categoría',
      onClick: () => {
        navigate("/category")
      }
    },
    {
      key: '/dishes',
      icon: currentRoute === "/dishes" ? <DishIconColorful size='small' /> : <DishIconColorful.plate size='small' />,
      label: 'Platillos',
      onClick: () => {
        navigate("/dishes")
      }
    },
    {
      key: '/dishOfTheDay',
      icon: currentRoute === "/dishOfTheDay" ? <MenuFoodIconLight.fill size='small' /> : <MenuFoodIconLight size='small' />,
      label: 'Platillo del dia',
      onClick: () => {
        navigate("/dishOfTheDay")
      }
    },
    {
      key: '/configuration',
      icon: <ConfigurationGearIcon.fillLight size='small' />,
      label: 'Configuración',
      children: [
        {
          key: "/configuration/user",
          label: "Usuario",
          icon: currentRoute === "/configuration/user" ? <UserCircleIcon.square size='small' /> : <UserCircleIcon size='small' />,
          onClick: () => {
            navigate("/configuration/user")
          }
        },
        {
          key: "/configuration/system",
          label: "Sistema",
          icon: currentRoute === "/configuration/system" ? <SystemIconColorful.DNS size='medium' /> : <SystemIconColorful size='small' />,
          onClick: () => {
            navigate("/configuration/system")
          }
        }
      ]
    },
    {
      key: '/roles',
      icon: <RoleIconLight size='small' />,
      label: 'Administración de usuarios',
      children: [
        {
          key: "/roles/createUser",
          label: "Crear Usuario",
          onClick: () => {
            navigate("/roles/createUser")
          }
        },
        {
          key: "/roles/createRole",
          label: "Crear Rol",
          onClick: () => {
            navigate("/roles/createRole")
          }
        }
      ]
    },
  ], [currentRoute])

  return (
    <Layout style={{ minHeight: "100vh" }}>

      <Layout.Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
        <Menu
          defaultSelectedKeys={[currentRoute]}
          mode='inline'
          theme='dark'
          items={items}
        />
      </Layout.Sider>

      <Layout>
        <Layout.Content
          style={{
            marginLeft: 10
          }}
        >

          <Breadcrumb>
            <Breadcrumb.Item>{currentRoute}</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: token.colorBgContainer,
              borderRadius: token.borderRadiusLG
            }}
          >
            {children}
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}
