// 接口：查询条条件Interface: Query Condition
export interface IPagination {
    search: string|number;
    page: number;
    pagesize: number;
    sortBy: string;
    [key:string]:any,
    sortOrder: 'asc' | 'desc';
  }