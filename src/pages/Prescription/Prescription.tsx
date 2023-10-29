import React, { useEffect, useState } from 'react';
import { Button, Select, Space ,Flex} from 'antd';
import type { SelectProps } from 'antd';
import { ApiGetHerbs } from '../../api';
import { SearchOutlined } from '@ant-design/icons';

const Prescription: React.FC = () => {
  const [options, setOptions] = useState<SelectProps['options']>([]);

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  const ajaxCurrentList = async () => {
    const responseCompany = await ApiGetHerbs({}, 'GET');
    const selectList = responseCompany.data.data;

    const newOptions = selectList.map((item: { [x: string]: any; }) => ({
      label: item['common_name'],
      value: item['common_name'],
    }));

    setOptions(newOptions);
  };

  useEffect(() => {
    ajaxCurrentList();
  }, []);

  return (
    <Flex className='mt-2' gap="middle" align="start" >
        <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="请选择药材"
            onChange={handleChange}
            options={options}
        />
            <Button type="primary" icon={<SearchOutlined />}>
                Search
            </Button>
  </Flex>
    
  );
};

export default Prescription;
