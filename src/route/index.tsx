import React, { ReactNode, lazy } from "react";
import Books from "../pages/index/Books/Books";

//Test 和 Detail分别对应你的组件
export interface IRoute {
    exact?: boolean
    path: string
    icon?: ReactNode
    key?: string
    lable?: string
    component?: ReactNode
    children?: IRoute[]
}

export const routes: IRoute[] = [
    {
        path: "/books",
        lable: "书籍",
        key: "1",
        component: <Books />
    },
    {
        path: "/prescription",
        lable: "药方",
        key: "1",
        children: [
            {
                path: "/books",
                lable: "书籍",
                key: "1",
                component: <Books />
            }
        ]
    }
]


const MenuList = [
    {key:'1',label:'书籍',title:"Book"},
    {key:'2',label:'药方',children:[
        {key:'10',label:'药方列表'},
        {key:'11',label:'药方查询'}
    ]},
  ]