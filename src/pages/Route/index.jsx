import amisRenderer from '@/utils/AmisRenderer';
import { AlertComponent, ToastComponent } from 'amis';
import React from 'react';

const editButton = {
  label: '编辑',
  type: 'button',
  actionType: 'dialog',
  level: 'link',
  dialog: {
    title: '编辑',
    body: {
      type: 'form',
      api: '/api/databaseConfig/edit',
      body: [
        {
          label: '服务id',
          name: 'serviceId',
          type: 'input-text',
        },
        {
          label: '转发地址',
          name: 'uri',
          type: 'input-text',
        },
        {
          label: '访问路径',
          name: 'predicates',
          type: 'input-text',
        },
        {
          label: '过滤',
          name: 'filters',
          type: 'input-text',
        },
        {
          label: '顺序',
          name: 'sort',
          type: 'input-text',
        },
        {
          label: '备注信息',
          name: 'remarks',
          type: 'input-text',
        },
      ],
    },
  },
};

// const viewButton = {
//   "label": "查看表",
//   "type": "button",
//   "actionType": "dialog",
//   "level": "link",
//   "dialog": {
//     "title": "查看详情",
//     "body": {
//       "type": "crud",
//       "api": {
//         "method": "get",
//         "url": "/api/databaseConfig/tableList?id=$id",
//         "responseData": {
//           "total": "total",
//           "items": "${records}"
//         }
//       },
//       "syncLocation": false,
//       "columns": [
//         {
//           "name": "name",
//           "label": "表名"
//         },
//         {
//           "name": "comment",
//           "label": "注释"
//         }
//       ]
//     }
//   }
// };

const deleteButton = {
  type: 'button',
  label: '删除',
  actionType: 'ajax',
  level: 'link',
  className: 'text-danger',
  confirmText: '确定要删除？',
  api: {
    method: 'post',
    url: '/gateway/route/deleteRoute',
    dataType: 'form',
    data: {
      id: '${serviceId}',
    },
  },
};

// const exportButton = {
//   "type": "button",
//   "label": "导出数据库文档",
//   "actionType": "download",
//   "level": "link",
//   "api": {
//     "method": "get",
//     "url": "/api/databaseConfig/exportDatabase",
//     "dataType": "form",
//     "responseType":"blob",
//     "data": {
//       "id":"${id}"
//     }
//   }
// };

const tableList = [
  {
    label: '序列id',
    name: 'id',
    type: 'text',
  },
  {
    label: '服务id',
    name: 'serviceId',
    type: 'text',
  },
  {
    label: '转发地址',
    name: 'uri',
    type: 'text',
  },
  {
    label: '访问路径',
    name: 'predicates',
    type: 'text',
  },
  {
    label: '过滤',
    name: 'filters',
    type: 'text',
  },
  {
    label: '顺序',
    name: 'sort',
    type: 'text',
  },
  {
    label: '备注信息',
    name: 'remarks',
    type: 'text',
  },

  {
    label: '创建人',
    name: 'createBy',
    type: 'text',
  },
  {
    label: '创建时间',
    name: 'createTime',
    type: 'text',
  },
  {
    label: '更新人',
    name: 'updateBy',
    type: 'text',
  },
  {
    label: '更新时间',
    name: 'updateTime',
    type: 'text',
  },
  {
    type: 'operation',
    label: '操作',
    buttons: [
      editButton,
      // viewButton,
      // exportButton,
      deleteButton,
    ],
  },
];

const addButton = {
  label: '新增',
  type: 'button',
  actionType: 'dialog',
  level: 'primary',
  dialog: {
    title: '新增',
    body: {
      type: 'form',
      api: 'POST:/gateway/route/addRoute',
      data: {
        name: '',
      },
      body: [
        {
          label: '服务id',
          name: 'serviceId',
          type: 'input-text',
        },
        {
          label: '转发地址',
          name: 'uri',
          type: 'input-text',
        },
        {
          name: 'predicates',
          label: '访问路径',
          type: 'input-array',
          inline: true,
          items: {
            type: 'input-text',
          },
        },
        {
          name: 'filters',
          label: '过滤',
          type: 'input-array',
          inline: true,
          items: {
            type: 'input-text',
          },
        },
        {
          label: '顺序',
          name: 'sort',
          type: 'input-text',
        },
        {
          label: '备注信息',
          name: 'remarks',
          type: 'input-text',
        },
      ],
    },
  },
};
const syncButton = {
  label: '刷新路由配置',
  type: 'button',
  actionType: 'ajax',
  api: '/gateway/route/reloadConfig',
};
const queryButton = {
  title: '查询条件',
  columnCount: 3,
  type: 'form',
  mode: 'horizontal',
  body: [
    {
      label: '服务id',
      name: 'serviceId',
      type: 'input-text',
    },
    {
      label: '转发地址',
      name: 'uri',
      type: 'input-text',
    },
    {
      label: '访问路径',
      name: 'predicates',
      type: 'input-text',
    },
    {
      label: '过滤',
      name: 'filters',
      type: 'input-text',
    },
    {
      label: '备注信息',
      name: 'remarks',
      type: 'input-text',
    },
  ],
};

export default class List extends React.Component {
  render() {
    return (
      <div>
        <ToastComponent key="toast" />
        <AlertComponent key="alert" />
        {amisRenderer({
          title: '路由配置管理',
          body: {
            type: 'crud',
            syncLocation: false,
            api: {
              method: 'get',
              url: '/gateway/route/selectRoutePageVo',
              responseData: {
                total: '${total}',
                items: '${records}',
              },
            },
            columns: tableList,
            headerToolbar: [addButton, syncButton, 'bulkActions'],
            filter: queryButton,
            perPage: 20,
            pageField: 'pageNum',
            perPageField: 'pageSize',
            keepItemSelectionOnPageChange: true,
            footerToolbar: ['switch-per-page', 'pagination'],
          },
        })}
      </div>
    );
  }
}
