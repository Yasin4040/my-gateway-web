import amisRenderer from '@/utils/AmisRenderer';
import { AlertComponent, ToastComponent } from 'amis';
import React from 'react';

const deleteButton = {
  type: 'button',
  label: '删除',
  actionType: 'ajax',
  level: 'link',
  className: 'text-danger',
  confirmText: '确定要删除？',
  api: {
    method: 'post',
    url: '/gateway/ipBlack/delIp',
    dataType: 'form',
    data: {
      ip: '${ip}',
    },
  },
};

const tableList = [
  {
    label: 'ip地址',
    name: 'ip',
    type: 'input-text',
  },
  {
    label: '备注',
    name: 'remark',
    type: 'input-text',
  },
  {
    type: 'operation',
    label: '操作',
    buttons: [deleteButton],
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
      api: 'POST:/gateway/ipBlack/addIp',
      data: {
        name: '',
      },
      body: [
        {
          label: 'ip地址',
          name: 'ip',
          type: 'input-text',
        },
        {
          label: '备注',
          name: 'remark',
          type: 'input-text',
        },
      ],
    },
  },
};

export default class List extends React.Component {
  render() {
    return (
      <div>
        <ToastComponent key="toast" />
        <AlertComponent key="alert" />
        {amisRenderer({
          title: 'Ip黑名单管理',
          body: {
            type: 'crud',
            syncLocation: false,
            api: {
              method: 'get',
              url: '/gateway/ipBlack/getIpBlacklist',
              responseData: {
                total: '${total}',
                items: '${records}',
              },
            },
            loadDataOnce: true,
            columns: tableList,
            headerToolbar: [addButton, 'bulkActions'],
          },
        })}
      </div>
    );
  }
}
