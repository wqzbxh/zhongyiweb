import React, { useEffect, useState } from 'react';
import { Button, Select, Space ,Flex, message, Input} from 'antd';
import type { SelectProps } from 'antd';
import { ApiGetHerbs, ApiGetPrescriptionBySymptoms, ApiSearchPrescription } from '../../api';
import { SearchOutlined } from '@ant-design/icons';
import PrescriptionList from './PrescriptionList';
import { PrescriptionInterface, PrescriptionSearch } from '../../interface/Iprescription';
import { SearchProps } from 'antd/es/input';
import DiseaseInquiryList from './DiseaseInquiryList';

const DiseaseInquiry: React.FC = () => {

  const { Search } = Input;

  const [presription, setPresription] = useState<string[]>([]);
  const [presriptionList, setPresriptionList] = useState<PrescriptionSearch[]>([]);

  const [messageApi, contextHolder] = message.useMessage();

  const handleChange = (value: string[]) => {
    setPresription(value)
  };

  
  const ajaxCurrentList = async () => {
  
  };

  /**
   * 发送查询
   */
  const onSearchFunction = async (event:any)=>{
    if(event){
         const SearchData = await ApiGetPrescriptionBySymptoms({symptoms:event},"GET")
         setPresriptionList(SearchData.data.data.conditions_retrult)
    }else{
      messageApi.open({
        type: 'warning',
        content: '请输入病症',
      });
    }
  }
  useEffect(() => {
    ajaxCurrentList();
  }, []);


  return (
    <div className='px-xs '>
      <Flex className='mt-2 pt-2' gap="middle" align="start" >
        {contextHolder}
        <Search
      placeholder="输入病症,多种病症用,隔开"
      allowClear
      enterButton="查询"
      size="large"
      onSearch={(event)=>onSearchFunction(event)}
    />
    </Flex>
    <div className='mt-2'>
       <DiseaseInquiryList presriptionList={presriptionList} />
    </div>
    
  </div>
  );
};

export default DiseaseInquiry;
