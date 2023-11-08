import React from 'react';
import { Card, Col, Row, Typography, Space } from 'antd';
import { Herb, HerbsInterface } from '../../interface/Iherbs';
import { ConditionData } from '../../interface/Iprescription';

const gridStyle: React.CSSProperties = {
  width: '25%',
  textAlign: 'center',
};
interface PrescriptionDetail {
  record: ConditionData;
}

const { Text, Link,Title } = Typography;
const PrescriptionDetail: React.FC<PrescriptionDetail> = ({ record }) => (

<>


        {record.prescription_sku.length>0&& record.prescription_sku.map((item,index)=>{
          return (
          <Row gutter={16} className='mt-2'>
            <Space >
              <Text strong>《{item.common_name}》</Text>
              <Text>{item.dosage_number} </Text>
              <Text>{item.unit_symbol} </Text>
            </Space> </Row>
          )
        })}
        {record.prescription_sku.length>0&& record.prescription_sku.map((item,index)=>{
          return (
          <Row gutter={16} className='mt-2'>
            <Space >
              <Text strong>《{item.common_name}》</Text>
              <Text>{item.dosage_number} </Text>
              <Text>{item.unit_symbol} </Text>
            </Space> </Row>
          )
        })}
    </>
);

export default PrescriptionDetail;