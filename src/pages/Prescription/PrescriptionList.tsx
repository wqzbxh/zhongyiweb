import React from 'react';
import { Modal, Space, Table, Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PrescriptionInterface } from '../../interface/Iprescription';
import { ApiGetPrescriptionDetail } from '../../api';
import PrescriptionDetail from './PrescriptionDetail';
import { get } from 'http';

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
      <Space size="middle" onClick={getDetail(record)}>
        <a>detail</a>
      </Space>
    ),
  },
];

const getDetail = (record:PrescriptionInterface) => {
  return () => detail(record);
}

const detail= async (record:PrescriptionInterface)=>{
  const PrescriptionDetal = await ApiGetPrescriptionDetail({prescription_id:record.prescription_id}, 'GET');
  Modal.info({
  title: record.prescription_name,
  width:'70%',
  content: (
    <>
         {PrescriptionDetal.data.data ? (
        <PrescriptionDetail record={PrescriptionDetal.data.data} />
      ) : (
        <p>Loading...</p>
      )}
    </>
  ),
  });
  }

const PrescriptionList: React.FC<ComponentInterface> = ({ presriptionList }) => (
  <>
  <Table columns={columns}    dataSource={presriptionList} />
  </>
)

export default PrescriptionList;
