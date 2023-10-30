import React, { useEffect, useState } from 'react';
import { Button, Select, Space ,Flex, message} from 'antd';
import type { SelectProps } from 'antd';
import { ApiGetHerbs, ApiSearchPrescription } from '../../api';
import { SearchOutlined } from '@ant-design/icons';
import PrescriptionList from './PrescriptionList';
import { PrescriptionInterface } from '../../interface/Iprescription';

const Prescription: React.FC = () => {
  const [options, setOptions] = useState<SelectProps['options']>([]);
  const [presription, setPresription] = useState<string[]>([]);
  const [presriptionList, setPresriptionList] = useState<PrescriptionInterface[]>([]);

  const [messageApi, contextHolder] = message.useMessage();

  const handleChange = (value: string[]) => {
    setPresription(value)
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

  /**
   * 发送查询
   */
  const searchPresription = async ()=>{
    console.log(presription)
    if(presription.length>0){
         const SearchData = await ApiSearchPrescription({search_common_name:presription},"GET")
         setPresriptionList(SearchData.data.data)
    }else{
      messageApi.open({
        type: 'warning',
        content: '至少选择一种药材',
      });
    }
  }
  useEffect(() => {
    ajaxCurrentList();
  }, []);



  return (
    <>
      <Flex className='mt-2 pt-2' gap="middle" align="start" >
        {contextHolder}
          <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="请选择药材"
              onChange={handleChange}
              options={options}
          />
              <Button type="primary" onClick={searchPresription} icon={<SearchOutlined />}>
                  Search
              </Button>
    </Flex>
    <div className='mt-2'>
       <PrescriptionList presriptionList={presriptionList} />
    </div>
    
  </>
  );
};

export default Prescription;
