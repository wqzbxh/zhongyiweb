import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { useRef } from 'react';
import request from 'umi-request';
import { Button, Form,Dropdown, Input, InputNumber, Modal, Popconfirm, Space, Table, Tooltip, Typography } from 'antd';
import api, { ApiGetHerbs } from '../../api';




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
    filters: [
      { text: '甘', value: '1' },
      { text: '涩', value: '2' },
    ],
    ellipsis: true,
  },
  {
    title: '性状',
    dataIndex: 'medicine_character_name',
    width: '5%',
    ellipsis: true,
  },
  {
    title: '毒性',
    dataIndex: 'toxicity_name',
    width: '5%',
    ellipsis: true,
  },
  {
    title: '功效',
    width: '30%',
    ellipsis: true,
    copyable: true,
    dataIndex: 'efficacy',
    render: (efficacy:any) => (
      <Tooltip placement="topLeft" title={efficacy}>
        {efficacy}
      </Tooltip>),
  },
  {
    title: '来源',
    dataIndex: 'book_name',
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
      <a href={record.id} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
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

export default  function Herbs() {
  const actionRef = useRef<ActionType>();
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
        pageSize: 5,
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