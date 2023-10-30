import React from 'react';
import { Space, Table, Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PrescriptionInterface } from '../../interface/Iprescription';

interface ComponentInterface {
  presriptionList:PrescriptionInterface[]
}

const columns: ColumnsType<PrescriptionInterface> = [
  {
    title: '药方名',
    dataIndex: 'prescription_name',
    key: 'name',
    width:"15%",
    render: (text) => <a>{text}</a>,
  },
  {
    title: '煮法',
    dataIndex: 'method_name',
    key: 'method_name',
    ellipsis: true,
    width:"40%",
    render: (method_name:any) => (
      <Tooltip placement="topLeft" title={method_name}>
        {method_name}
      </Tooltip>),
  },
  {
    title: '配料解释',
    dataIndex: 'pl',
    key: 'pl',
    width:"40%",
    ellipsis: true,
    render: (pl:any) => (
      <Tooltip placement="topLeft" title={pl}>
        {pl}
      </Tooltip>),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>detail</a>
      </Space>
    ),
  },
];


const PrescriptionList: React.FC<ComponentInterface> = ({ presriptionList }) => (
  <>
  <Table columns={columns}    dataSource={presriptionList} />
  </>
)

export default PrescriptionList;
