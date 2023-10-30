import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import request from 'umi-request';
import { Button, Form,Dropdown, Input, InputNumber, Modal, Popconfirm, Space, Table, Tooltip, Typography } from 'antd';
import api, { ApiGetHerbs, ApiGetHerbsDetail } from '../../api';
import HerbsDatail from './HerbsDetail';
import { Herb, HerbsInterface } from '../../interface/Iherbs';




var title = '';
const columns: ProColumns<HerbsInterface>[] = [
  {
    title: 'ID',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: '5%',
  },
  {
    title: '药材名称',
    dataIndex: 'common_name',
    ellipsis: true,
    width: '10%',
  },
  {
    title: '科学名称',
    dataIndex: 'scientific_name',
    width: '7%',
    ellipsis: true,
  } ,{
    title: '味',
    dataIndex: 'medicinal_smell_name',
    width: '5%',
    ellipsis: true,
    filters: true,
    onFilter: true,
    search:false,
    valueType: 'select',
    valueEnum: {
      all: { text: '超长'.repeat(50) },
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
        disabled: true,
      },
      processing: {
        text: '解决中',
        status: 'Processing',
      },
    },
  },
  {
    title: '性状',
    dataIndex: 'medicine_character_name',
    width: '5%',
    ellipsis: true, filters: true,
    onFilter: true,
    search:false,
    valueType: 'select',
    valueEnum: {
      open: {
        text: '微寒',
        status: 'Error',
      },
      closed: {
        text: '温',
        status: 'Success',
        disabled: true,
      },
      processing: {
        text: '热',
        status: 'Processing',
      },
    },
  },
  {
    title: '毒性',
    dataIndex: 'toxicity_name',
    width: '5%',
    ellipsis: true,
    search:false,
  },
  {
    title: '功效',
    width: '30%',
    dataIndex: 'efficacy',
    ellipsis: true,
    copyable: true,
    render: (efficacy:any) => (
      <Tooltip placement="topLeft" title={efficacy}>
        {efficacy}
      </Tooltip>),
  },
  {
    title: '来源',
    dataIndex: 'book_name',
    search:false,
    width: '10%',
    ellipsis: true,
  },
  {
    title: '其他名称',
    dataIndex: 'other_names',
    copyable: true,
      ellipsis: true,
      render: (other_names:any) => (
        <Tooltip placement="topLeft" title={other_names}>
          {other_names}
        </Tooltip>
      ),
  },
  {
    title: '创建时间',
    key: 'showTime',
    dataIndex: 'created_at',
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
       <Space>
        <Typography.Link  onClick={() => detail(record)}>
        查看
      </Typography.Link></Space>
   ,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];
const detail= async (record:HerbsInterface)=>{
const HerbData = await ApiGetHerbsDetail({id:record.id}, 'GET');
Modal.info({
title: record.common_name,
width:'70%',
content: (
  <>
       {HerbData.data.data ? (
      <HerbsDatail record={HerbData.data.data} />
    ) : (
      <p>Loading...</p>
    )}
  </>
),
});
}



export default  function Herbs() {
  const actionRef = useRef<ActionType>();

  const [herbsdata,setHerbsData]=useState<Herb>();





  return (
    <ProTable<HerbsInterface>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        console.log(sort, filter);
        return request<{
          data: HerbsInterface[];
        }>(api.getHerbsList, {
          params,
        });
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform， 提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 10,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="高级表格"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            actionRef.current?.reload();
          }}
          type="primary"
        >
          新建
        </Button>,
        <Dropdown
          key="menu"
          menu={{
            items: [
              {
                label: '1st item',
                key: '1',
              },
              {
                label: '2nd item',
                key: '1',
              },
              {
                label: '3rd item',
                key: '1',
              },
            ],
          }}
        >
          <Button>
            <EllipsisOutlined />
          </Button>
        </Dropdown>,
      ]}
    />
  );
};