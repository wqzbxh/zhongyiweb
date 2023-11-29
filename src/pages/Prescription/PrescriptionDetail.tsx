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

<Text strong>
      配方:
    </Text>

        {record.prescription_sku.length>0&& record.prescription_sku.map((item,index)=>{
          return (
          <>
              <Text >《{item.common_name}》</Text>
              <Text>{item.dosage_number} </Text>
              <Text>{item.unit_symbol} , </Text>
          </>
          )
        })}

        
        {record.conditions_retrult.length>0&& record.conditions_retrult.map((item,index)=>{
          return (
          <Row  gutter={16} className='mt-2'>
            <Space >
              <Text>主治 {index+1} : </Text>
              <Text>{item.symptoms} </Text>
            </Space> </Row>
          )
        })}
    </>
);

export default PrescriptionDetail;