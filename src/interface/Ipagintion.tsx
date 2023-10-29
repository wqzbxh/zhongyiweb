// 接口：查询条条件Interface: Query Condition
export interface IPagination {
    search: string|number;
    page: number;
    limit: number;
  }