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

const { Text, Link, Title } = Typography;
const PrescriptionDetail: React.FC<PrescriptionDetail> = ({ record }) => (
  <>
    <div>
      <Text strong>  配方: </Text>
      <div className='mt-1'>
        {record.prescription_sku.length > 0 && record.prescription_sku.map((item, index) => {
          return (
            <>
              <Text >  {item.common_name}</Text>
              <Text>{item.dosage_number} </Text>
              <Text>{item.unit_symbol} , </Text>
            </>   
          )
        })}
      </div>
    </div>
    <div className='mt-2'>
      <Text strong>  主治病症: </Text>
      <div className='mt-1'>
        {record.conditions_retrult.length > 0 && record.conditions_retrult.map((item, index) => {
          return (<>
            <div className='mt-1'>
              <Text strong>{index + 1} : </Text>
              <Text>{item.symptoms} </Text>
            </div>
          </>

          )
        })}  </div>
    </div>


  </>
);

export default PrescriptionDetail;