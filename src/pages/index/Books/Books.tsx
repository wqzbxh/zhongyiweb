import React, { useEffect, useState } from 'react';
import qs from 'qs';
import { Form, Input, InputNumber, Popconfirm, Table, Tooltip, Typography } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import { ApiGetBooks } from '../../../api';

interface BooksInterfache {
  Introduction:string,
  book_author:string,
  book_id:string,
  book_name:string,
  create_at:string,
  // name: {
  //   first: string;
  //   last: string;
  // };
  // gender: string;
  // email: string;
  // login: {
  //   uuid: string;
  // };
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
  record: BooksInterfache;
  index: number;
  children: React.ReactNode;
}

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});


const Books: React.FC = () => {
  
  const [form] = Form.useForm();
  const [data, setData] = useState<BooksInterfache[] >([]);
  const [loading, setLoading] = useState(false);
  const [editingKey, setEditingKey] = useState('');
  
  const cancel = () => {
    setEditingKey('');
  };

  const isEditing = (record: BooksInterfache) => record.book_id === editingKey;

  const edit = (record: Partial<BooksInterfache> & { book_id: React.Key }) => {
    form.setFieldsValue({ book_name: '',book_author : '', Introduction: '', ...record });
    setEditingKey(record.book_id);
  };
  
const columns = [
  {
    title: '书籍名称',
    dataIndex: 'book_name',
    filters: [
      { text: '药材', value: '1' },
      { text: '药方', value: '2' },
    ],
  
    width: '15%',
    editable: true,
  },
  {
    title: '作者',
    dataIndex: 'book_author',
    width: '10%',
    editable: true,
  },
  {
    title: '简介',
    width: '60%',
    dataIndex: 'Introduction',
    // ellipsis: true,
    editable: true,
    ellipsis: {
      showTitle: false,
    },
    render: (Introduction:any) => (
      <Tooltip placement="topLeft" title={Introduction}>
        {Introduction}
      </Tooltip>
    ),
  },
  {
    title: '创建时间',
    dataIndex: 'create_at',
      editable: true,
  },
  {
    title: '操作',
    dataIndex: 'operation', render: (_: any, record: BooksInterfache) => {
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
        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
          Edit
        </Typography.Link>
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
    const row = (await form.validateFields()) as BooksInterfache;

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
    setLoading(true);
    const BooKsData = await ApiGetBooks(getRandomuserParams(tableParams), 'GET');
    setLoading(false);
    console.log(BooKsData.data.data);
    setData(BooKsData.data.data);
      setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: BooKsData.data.count,
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          },
        });

    // fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
    //   .then((res) => res.json())
    //   .then(({ results }) => {
    //     setData(results);
    //     setTableParams({
    //       ...tableParams,
    //       pagination: {
    //         ...tableParams.pagination,
    //         total: 200,
    //         // 200 is mock data, you should read it from server
    //         // total: data.totalCount,
    //       },
    //     });
    //   });
  };




// Use the USEEFFECT hook. When Search changes, call the AjaxCurrenTList function


  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);

  
  function handleTableChange (
    pagination: TablePaginationConfig,
    sorter: SorterResult<BooksInterfache>,
  ) {
    setTableParams({
      pagination,
      ...sorter,
    });
    console.log()
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
      onCell: (record: BooksInterfache) => ({
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

export default Books;
