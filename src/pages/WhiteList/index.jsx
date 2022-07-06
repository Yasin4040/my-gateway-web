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
      api: '/gateway/permit/editWhiteList',
      body: [
        {
          label: '序列id',
          name: 'id',
          type: 'input-text',
        },
        {
          label: 'url路径',
          name: 'path',
          type: 'input-text',
        },
        {
          label: '说明',
          name: 'description',
          type: 'input-text',
        },
      ],
    },
  },
};
const syncButton = {
  label: '刷新白名单',
  type: 'button',
  actionType: 'ajax',
  api: '/gateway/permit/refreshWhiteList',
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
    url: '/gateway/permit/delWhiteList',
    dataType: 'form',
    data: {
      path: '${path}',
    },
  },
};

const tableList = [
  {
    label: '序列id',
    name: 'id',
    type: 'text',
  },
  {
    label: 'url路径',
    name: 'path',
    type: 'text',
  },
  {
    label: '说明',
    name: 'description',
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
      api: 'POST:/gateway/permit/addWhiteList',
      data: {
        name: '',
      },
      body: [
        {
          label: '序列id',
          name: 'id',
          type: 'input-text',
        },
        {
          label: 'url路径',
          name: 'path',
          type: 'input-text',
        },
        {
          label: '说明',
          name: 'description',
          type: 'input-text',
        },
      ],
    },
  },
};

const queryButton = {
  title: '查询条件',
  columnCount: 1,
  type: 'form',
  mode: 'horizontal',
  body: [
    {
      label: '序列id',
      name: 'id',
      type: 'input-text',
    },
    {
      label: 'url路径',
      name: 'path',
      type: 'input-text',
    },
    {
      label: '说明',
      name: 'description',
      type: 'input-text',
    },
    {
      label: '搜索',
      level: 'primary',
      type: 'submit',
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
          title: '白名单管理',
          body: {
            type: 'crud',
            syncLocation: false,
            api: {
              method: 'get',
              url: '/gateway/permit/selectWhiteListPageVo',
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
