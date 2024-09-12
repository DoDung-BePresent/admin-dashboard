import { Button, message, Modal, Space, Tooltip, Typography } from "antd";
import Table, { ColumnProps } from "antd/es/table";
import { Edit2, Sort, UserRemove } from "iconsax-react";
import { useEffect, useState } from "react";
import handleAPI from "../apis/handleAPI";
import { colors } from "../constants/colors";
import { ToggleSupplier } from "../modals";
import { SupplierModel } from "../models/SupplierModel";

const { Title, Text } = Typography;
const { confirm } = Modal;

const Suppliers = () => {
  const [isVisibleModalAddNew, setIsVisibleModalAddNew] = useState(false);
  const [suppliers, setSuppliers] = useState<SupplierModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [supplierSelected, setSupplierSelected] = useState<SupplierModel>();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState<number>(10);

  const columns: ColumnProps<SupplierModel>[] = [
    {
      key: "index",
      dataIndex: "index",
      title: "#",
      align: "center",
    },
    {
      key: "name",
      dataIndex: "name",
      title: "Supplier name",
    },
    {
      key: "product",
      dataIndex: "product",
      title: "Product",
    },
    {
      key: "contact",
      dataIndex: "contact",
      title: "Contact",
    },
    {
      key: "email",
      dataIndex: "email",
      title: "Email",
    },
    {
      key: "type",
      dataIndex: "isTaking",
      title: "Type",
      render: (isTaking: boolean) => (
        <Text type={isTaking ? "success" : "danger"}>
          {isTaking ? "Taking Return" : "Not Taking Return"}
        </Text>
      ),
    },
    {
      key: "on",
      dataIndex: "active",
      title: "On the way",
      render: (num) => num ?? "-",
    },
    {
      key: "buttonContainer",
      title: "Action",
      dataIndex: "",
      render: (item: SupplierModel) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              type="text"
              onClick={() => {
                setSupplierSelected(item);
                setIsVisibleModalAddNew(true);
              }}
              icon={<Edit2 size={18} className="text-info" />}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              onClick={() =>
                confirm({
                  title: "Confirm",
                  content: "Are you sure you want to delete this supplier?",
                  onOk: () => removeSupplier(item._id),
                })
              }
              type="text"
              icon={<UserRemove size={18} className="text-danger" />}
            />
          </Tooltip>
        </Space>
      ),
      fixed: "right",
      align: "right",
    },
  ];

  useEffect(() => {
    getSuppliers();
  }, [page, pageSize]);

  const getSuppliers = async () => {
    const api = `/supplier?page=${page}&pageSize=${pageSize}`;
    setIsLoading(true);
    try {
      const res = await handleAPI(api);
      console.log(res.data);
      res.data && setSuppliers(res.data.items);

      const items: SupplierModel[] = [];

      res.data.items.forEach((item: any, index: number) =>
        items.push({
          index: (page - 1) * pageSize + (index + 1),
          ...item,
        })
      );

      setSuppliers(items);

      setTotal(res.data.total);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const removeSupplier = async (id: string) => {
    try {
      await handleAPI(`/supplier/remove?id=${id}`, undefined, "delete");

      await getSuppliers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Table
        pagination={{
          showSizeChanger: true,
          onShowSizeChange: (current, size) => {
            setPageSize(size);
          },
          total,
          onChange(page, pageSize) {
            console.log(page, pageSize);
            setPage(page);
          },
        }}
        scroll={{
          y: "calc(100vh - 300px)",
        }}
        loading={isLoading}
        dataSource={suppliers}
        columns={columns}
        title={() => (
          <div className="row">
            <div className="col">
              <Title level={5}>Suppliers</Title>
            </div>
            <div className="col text-end">
              <Space>
                <Button
                  type="primary"
                  onClick={() => setIsVisibleModalAddNew(true)}
                >
                  Add Supplier
                </Button>
                <Button icon={<Sort size={20} />} color={colors.gray600}>
                  Filters
                </Button>
                <Button>Download all</Button>
              </Space>
            </div>
          </div>
        )}
      />
      <ToggleSupplier
        visible={isVisibleModalAddNew}
        onClose={() => {
          supplierSelected && getSuppliers();
          setSupplierSelected(undefined);
          setIsVisibleModalAddNew(false);
        }}
        onAddNew={(val) => setSuppliers([...suppliers, val])}
        supplier={supplierSelected}
      />
    </div>
  );
};

export default Suppliers;
