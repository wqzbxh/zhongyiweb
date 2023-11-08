export interface PrescriptionInterface {
    prescription_id: number;
    prescription_name: string;
    method_name: string;
    pl: string;
  }


  // 定义症状的接口
  export interface Symptom {
  symptoms: string;
  condition_id: number;
}

// 定义草药成分的接口
export interface Herb {
  common_name: string;
  dosage_number: string;
  unit_symbol: string;
}

// 定义包含症状和草药信息的数据接口
export interface ConditionData {
  conditions_retrult: Symptom[];
  prescription_sku: Herb[];
}
