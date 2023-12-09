import React from 'react';
import { Modal, Space, Table, Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PrescriptionInterface, PrescriptionSearch } from '../../interface/Iprescription';
import { ApiGetPrescriptionBySymptoms, ApiGetPrescriptionDetail } from '../../api';
import PrescriptionDetail from './PrescriptionDetail';
import { get } from 'http';

interface ComponentInterface {
  presriptionList:PrescriptionSearch[]
}

const columns: ColumnsType<PrescriptionSearch> = [
  {
    title: '药方名',
    dataIndex: 'prescription_name',
    key: 'name',
    width:"15%",
    render: (text) => <a>{text}</a>,
  },
  {
    title: '主治病症',
    dataIndex: 'symptoms',
    key: 'symptoms',
    ellipsis: true,
    width:"40%",
    render: (method_name:any) => (
      <Tooltip placement="topLeft" title={method_name}>
        {method_name}
      </Tooltip>),
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
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <Space size="middle" onClick={getDetail(record)}>
        <a>详情</a>
      </Space>
    ),
  },
];

const getDetail = (record:PrescriptionSearch) => {
  return () => detail(record);
}

const detail= async (record:PrescriptionSearch)=>{
  console.log(record.prescription_id)
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

const DiseaseInquiryList: React.FC<ComponentInterface> = ({ presriptionList }) => {
  console.log(presriptionList)
  return(
    <>
    <Table columns={columns}    dataSource={presriptionList} />
    </>
  )
}

export default DiseaseInquiryList;
