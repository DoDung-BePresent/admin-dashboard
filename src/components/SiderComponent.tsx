import { Layout, Menu, MenuProps, Typography } from "antd";
import { Box, Chart, Home2, ProfileCircle } from "iconsax-react";
import { Link } from "react-router-dom";
import { CiViewList } from "react-icons/ci";
import { MdOutlineInventory2 } from "react-icons/md";
import { appInfo } from "../constants/appInfos";
import { colors } from "../constants/colors";
const { Sider } = Layout;

const { Text } = Typography;

type MenuItem = Required<MenuProps>["items"][number];

const SiderComponent = () => {
  const items: MenuItem[] = [
    {
      key: "dashboard",
      label: <Link to={"/"}>Dashboard</Link>,
      icon: <Home2 size={20} />,
    },
    {
      key: "inventory",
      label: <Link to={"/inventory"}>Inventory</Link>,
      icon: <MdOutlineInventory2 size={20} />,
    },
    {
      key: "reports",
      label: <Link to={"/report"}>Reports</Link>,
      icon: <Chart size={20} />,
    },
    {
      key: "suppliers",
      label: <Link to={"/suppliers"}>Suppliers</Link>,
      icon: <ProfileCircle size={20} />,
    },
    {
      key: "orders",
      label: <Link to={"/orders"}>Orders</Link>,
      icon: <Box size={20} />,
    },
    {
      key: "manage store",
      label: <Link to={"/manage-store"}>Manager Store</Link>,
      icon: <CiViewList size={20} />,
    },
  ];
  return (
    <Sider
      width={280}
      theme="light"
      style={{
        height: "100vh",
      }}
    >
      <div className="p-2 d-flex align-items-center">
        <img src={appInfo.logo} width={48} alt="" />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            color: colors.primary500,
            margin: 0,
            padding: "10px",
          }}
        >
          {appInfo.title}
        </Text>
      </div>
      <Menu items={items} theme="light" />
    </Sider>
  );
};

export default SiderComponent;
