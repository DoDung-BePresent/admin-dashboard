import { Affix, Layout } from "antd";
import SiderComponent from "../components/SiderComponent";
import HomeScreen from "../screens/HomeScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Inventories,
  ManageStore,
  Orders,
  ReportScreen,
  Suppliers,
} from "../screens";
import { HeaderComponent } from "../components";

const { Content, Footer, Header } = Layout;

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Affix offsetTop={0}>
          <SiderComponent />
        </Affix>
        <Layout>
          <Affix offsetTop={0}>
            <HeaderComponent />
          </Affix>
          <Content className="mt-3 mb-2 container bg-white">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/inventory" element={<Inventories />} />
              <Route path="/report" element={<ReportScreen />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/manage-store" element={<ManageStore />} />
            </Routes>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default MainRouter;
