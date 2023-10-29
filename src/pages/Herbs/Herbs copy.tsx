import React, { useEffect, useState } from 'react';
import qs from 'qs';
import { Button, Form, Input, InputNumber, Modal, Popconfirm, Space, Table, Tooltip, Typography } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import { ApiGetBooks, ApiGetHerbs, ApiGetHerbsDetail } from '../../api';
import HerbsDatail from './HerbsDetail';


interface HerbsInterface {
  common_name: string;
  id: string;
  other_names: string;
  scientific_name: string;
  medicinal_smell_id: string;
  character_id: string;
  toxicity_id: string;
  book_id: number;
  efficacy: string;
  origin: string | null;
  type: string;
  created_at: string;
  book_name: string;
  medicinal_smell_name: string;
  medicine_character_name: string;
}



interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue >;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: HerbsInterface;
  index: number;
  children: React.ReactNode;
}

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});


const Herbs: React.FC = () => {
  
  const [modal, contextHolder] = Modal.useModal();
  const [form] = Form.useForm();
  const [data, setData] = useState<HerbsInterface[] >([]);
  const [loading, setLoading] = useState(false);
  const [editingKey, setEditingKey] = useState('');
  const cancel = () => {
    setEditingKey('');
  };
  const isEditing = (record: HerbsInterface) => record.id === editingKey;
  const edit = (record: Partial<HerbsInterface> & { id: React.Key }) => {
    form.setFieldsValue({ book_name: '',book_author : '', Introduction: '', ...record });
    setEditingKey(record.id);
  };
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };


  const config = {
    title: 'Use Hook!',
    content: (
      <>
        <HerbsDatail />
      </>
    ),
  };
  const detail= async (record:HerbsInterface)=>{
    const BooKsData = await ApiGetHerbsDetail({id:record.id}, 'GET');
    modal.info(config);
  }
const columns = [
  {
    title: '药材名称',
    dataIndex: 'common_name',
  
    ellipsis: true,
    width: '10%',
    editable: true,
  },
  {
    title: '科学名称',
    dataIndex: 'scientific_name',
    width: '7%',
    editable: true,
    ellipsis: true,
  },
  {
    title: '味',
    dataIndex: 'medicinal_smell_name',
    width: '5%',
    filters: [
      { text: '甘', value: '1' },
      { text: '涩', value: '2' },
    ],
    editable: true,
    ellipsis: true,
  },
  {
    title: '性状',
    dataIndex: 'medicine_character_name',
    width: '5%',
    editable: true,
    ellipsis: true,
  },
  {
    title: '毒性',
    dataIndex: 'toxicity_name',
    width: '5%',
    editable: true,
    ellipsis: true,
  },
  {
    title: '功效',
    width: '30%',
    ellipsis: true,
    dataIndex: 'efficacy',
    editable: true,
    render: (efficacy:any) => (
      <Tooltip placement="topLeft" title={efficacy}>
        {efficacy}
      </Tooltip>),
  },
  {
    title: '来源',
    dataIndex: 'book_name',
    width: '10%',
    editable: true,
    ellipsis: true,
  },
  {
    title: '其他名称',
    dataIndex: 'other_names',
      editable: true,
      ellipsis: true,
      render: (other_names:any) => (
        <Tooltip placement="topLeft" title={other_names}>
          {other_names}
        </Tooltip>
      ),
  },
  {
    title: '操作',
    dataIndex: 'operation', render: (_: any, record: HerbsInterface) => {
      const editable = isEditing(record);
      return editable ? (
        <span>
          <Typography.Link onClick={() => save(record.book_id)} style={{ marginRight: 8 }}>
            Save
          </Typography.Link>
          <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
            <a>Cancel</a>
          </Popconfirm>
        </span>
      ) : (
        <Space>
        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
          Edit
        </Typography.Link>
         <Typography.Link disabled={editingKey !== ''} onClick={() => detail(record)}>
         Detail
       </Typography.Link></Space>
      );
    },
  },
];

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const save = async (key: React.Key) => {
  try {
    const row = (await form.validateFields()) as HerbsInterface;

    const newData = [...data];
    const index = newData.findIndex((item) => key === item.book_id);
    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        ...row,
      });
      setData(newData);
      setEditingKey('');
    } else {
      newData.push(row);
      setData(newData);
      setEditingKey('');
    }
  } catch (errInfo) {
    console.log('Validate Failed:', errInfo);
  }
};
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const fetchData = async () => {
    setLoading(true);  setData([]);
    const BooKsData = await ApiGetHerbs(getRandomuserParams(tableParams), 'GET');
    setLoading(false);
    setData(BooKsData.data.data);
      setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: BooKsData.data.count,
          },
        });
  };




// Use the USEEFFECT hook. When Search changes, call the AjaxCurrenTList function


  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);

  
  function handleTableChange (
    pagination: TablePaginationConfig,
    sorter: SorterResult<HerbsInterface>,
  ) {
    setTableParams({
      pagination,
      ...sorter,
    });
    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };
  
  
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: HerbsInterface) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
       {contextHolder}
    <Table
    components={{
      body: {
        cell: EditableCell,
      },
    }}
      columns={mergedColumns}
      rowKey={(record) => record.book_id}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
    />
    </Form>
  );
};

export default Herbs;
