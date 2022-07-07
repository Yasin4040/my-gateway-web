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

const getInterfaceButton = {
  label: '获取服务接口',
  type: 'button',
  actionType: 'drawer',
  level: 'link',
  drawer: {
    closeOnEsc: true,
    position: 'right',
    size: 'lg',
    title: '获取服务接口',
    body: {
      type: 'crud',
      syncLocation: false,
      loadDataOnce: true,
      // source: "${rows | filter:path:match:path}",
      api: {
        method: 'get',
        url: '/gateway/route/getAllInterface?serviceUrl=${uri}',
        responseData: {
          total: '${total}',
          items: '${records}',
        },
        data: {
          path: '${path}',
          summary: '${summary}',
        },
      },
      columns: [
        {
          name: 'path',
          label: '请求路径',
        },
        {
          name: 'summary',
          label: '请求名称',
        },
        {
          name: 'type',
          label: 'http类型',
        },
        {
          name: 'tag',
          label: '标志分组',
        },
        {
          type: 'operation',
          label: '操作',
          buttons: [
            {
              type: 'button',
              label: '添加到白名单',
              actionType: 'ajax',
              level: 'link',
              className: 'text-danger',
              confirmText: '确定要添加？',
              api: {
                method: 'post',
                url: '/gateway/permit/addWhiteList',
                data: {
                  path: '${path}',
                  description: '${summary}',
                },
              },
            },
          ],
        },
      ],
      filter: {
        title: '条件搜索',
        body: [
          {
            label: '请求路径',
            name: 'path',
            type: 'input-text',
          },
          {
            label: '请求名称',
            name: 'summary',
            type: 'input-text',
          },
          {
            type: 'submit',
            label: '搜索',
            level: 'primary',
          },
        ],
      },
    },
  },
};

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
      id: '${id}',
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

      getInterfaceButton,
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
  size: 'md',
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
  columnCount: 2,
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
    {
      type: 'submit',
      label: '搜索',
      level: 'primary',
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
