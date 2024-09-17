import {
  Button,
  Empty,
  message,
  Modal,
  Space,
  Tooltip,
  Typography,
} from "antd";
import { Edit2, Sort, UserRemove } from "iconsax-react";
import { useEffect, useState } from "react";
import handleAPI from "../apis/handleAPI";
import { ToggleSupplier } from "../modals";
import { SupplierModel } from "../models/SupplierModel";
import { FormModel } from "../models/FormModel";
import TableComponent from "../components/TableComponent";

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
  const [forms, setForms] = useState<FormModel>();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getSuppliers();
  }, [page, pageSize]);

  const getData = async () => {
    setIsLoading(true);
    try {
      await getForms();
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getForms = async () => {
    const api = `/supplier/get-form`;
    const res = await handleAPI(api);
    res.data && setForms(res.data);
  };

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
      message.error("Remove supplier successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return forms ? (
    <div>
      {forms && (
        <TableComponent
          api="supplier"
          onPageChange={(val) => {
            console.log(val);
            setPage(val.page);
            setPageSize(val.pageSize);
          }}
          onAddNew={() => {
            setIsVisibleModalAddNew(true);
          }}
          forms={forms}
          records={suppliers}
          total={total}
          extraColumn={(item) => (
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
          )}
        />
      )}

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
  ) : (
    <Empty />
  );
};

export default Suppliers;
