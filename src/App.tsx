import { ConfigProvider } from "antd";
import Routers from "./routers/Routers";
import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <ConfigProvider
      theme={{
        components: {},
        token: {
          colorTextHeading: "#1570EF",
        },
      }}
    >
      <Routers />
    </ConfigProvider>
  );
}

export default App;
