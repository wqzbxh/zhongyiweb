import React from 'react';
import { Card, Col, Row, Typography, Space } from 'antd';
import { Herb, HerbsInterface } from '../../interface/Iherbs';

const gridStyle: React.CSSProperties = {
  width: '25%',
  textAlign: 'center',
};
interface HerbsDetailProps {
  record: Herb;
}

const { Text, Link,Title } = Typography;
const HerbsDatail: React.FC<HerbsDetailProps> = ({ record }) => (

<>

    <Row gutter={16}>
          <Space direction="vertical">
            <Text>名称: {record.common_name} </Text>
            <Text>别名: {record.other_names} </Text>
            <Text >阿拉丁文: <Text keyboard>{record.scientific_name}</Text>  </Text>
            <Text >来源书籍: <Text keyboard>{record.book_name}</Text>  </Text>
            <Text >拼音: <Text keyboard>{record.pinyin}</Text>  </Text>
            <Space  size="large">
               <Text>性状: {record.medicine_character_name} </Text>  
                <Text>味: {record.medicinal_smell_name} </Text>
                <Text>毒性: {record.toxicity_name} </Text>
             </Space> 
            
            <Text>功效: {record.efficacy} </Text>
    </Space>
    
    </Row>
        {record.other.length>0&& record.other.map((item,index)=>{
          return (<Row gutter={16} className='mt-2'>
              <Space direction="vertical">
              <Text strong>《{item.book_name}》</Text>
              <Text>名称: {item.common_name} </Text>
              <Text>别名: {item.other_names} </Text>
              <Text >阿拉丁文: <Text keyboard>{item.scientific_name}</Text>  </Text>
              <Text >来源书籍: <Text keyboard>{item.book_name}</Text>  </Text>
              <Text >拼音: <Text keyboard>{item.pinyin}</Text>  </Text>
              <Space  size="large">
               <Text>性状: {item.medicine_character_name} </Text>  
                <Text>味: {item.medicinal_smell_name} </Text>
                <Text>毒性: {item.toxicity_name} </Text>
             </Space> 
              <Text>功效: {item.efficacy} </Text>
            </Space> </Row>
          )
        })}
    </>
);

export default HerbsDatail;