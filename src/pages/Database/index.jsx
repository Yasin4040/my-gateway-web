import React from 'react';
import amisRenderer from '@/utils/AmisRenderer';
import {ToastComponent, AlertComponent} from 'amis';

const editButton = {
  "label": "编辑",
  "type": "button",
  "actionType": "dialog",
  "level": "link",
  "dialog": {
    "title": "编辑",
    "body": {
      "type": "form",
      "api": "/api/databaseConfig/edit",
      "body": [
        {
          "label": "id",
          "name": "id",
          "type": "hidden"
        },
        {
          "label": "数据库说明",
          "name": "name",
          "type": "input-text"
        },
        {
          "label": "数据库地址",
          "name": "url",
          "type": "input-text"
        },
        {
          "label": "用户名",
          "name": "username",
          "type": "input-text"
        },
        {
          "label": "密码",
          "name": "password",
          "type": "input-text"
        }
      ]
    }
  }
};

const viewButton = {
  "label": "查看表",
  "type": "button",
  "actionType": "dialog",
  "level": "link",
  "dialog": {
    "title": "查看详情",
    "body": {
      "type": "crud",
      "api": {
        "method": "get",
        "url": "/api/databaseConfig/tableList?id=$id",
        "responseData": {
          "total": "total",
          "items": "${records}"
        }
      },
      "syncLocation": false,
      "columns": [
        {
          "name": "name",
          "label": "表名"
        },
        {
          "name": "comment",
          "label": "注释"
        }
      ]
    }
  }
};

const deleteButton = {
  "type": "button",
  "label": "删除",
  "actionType": "ajax",
  "level": "link",
  "className": "text-danger",
  "confirmText": "确定要删除？",
  "api": {
    "method": "post",
    "url": "/api/databaseConfig/delete",
    "dataType": "form",
    "data": {
      "id":"${id}"
    }
  }
};

const exportButton = {
  "type": "button",
  "label": "导出数据库文档",
  "actionType": "download",
  "level": "link",
  "api": {
    "method": "get",
    "url": "/api/databaseConfig/exportDatabase",
    "dataType": "form",
    "responseType":"blob",
    "data": {
      "id":"${id}"
    }
  }
};

const tableList = [
  {
    "label": "id",
    "name": "id",
    "type": "text"
  },
  {
    "label": "数据库说明",
    "name": "name",
    "type": "text",
  },
  {
    "label": "数据库地址",
    "name": "url",
    "type": "text"
  },
  {
    "label": "用户名",
    "name": "username",
    "type": "text"
  },
  {
    "type": "operation",
    "label": "操作",
    "buttons": [
      editButton,
      viewButton,
      exportButton,
      deleteButton,
    ]
  }
];

const addButton = {
  "label": "新增",
  "type": "button",
  "actionType": "dialog",
  "level": "primary",
  "dialog": {
    "title": "新增",
    "body": {
      "type": "form",
      "api": "POST:/api/databaseConfig/add",
      "data":{
        "name": ""
      },
      "body": [
        {
          "label": "数据库说明",
          "name": "name",
          "type": "input-text"
        },
        {
          "label": "数据库地址",
          "name": "url",
          "type": "input-text"
        },
        {
          "label": "用户名",
          "name": "username",
          "type": "input-text"
        },
        {
          "label": "密码",
          "name": "password",
          "type": "input-text"
        }
      ]
    }
  }
};

const queryButton = {
  "title": "查询条件",
  "columnCount": 3,
  "type": "form",
  "mode": "horizontal",
  "body": [
    {
      "type": "input-text",
      "label": "数据库说明",
      "name": "name"
    }
  ]
};

export default class List extends React.Component {
  render() {
    return (
      <div>
        <ToastComponent key="toast" />
        <AlertComponent key="alert" />
        {amisRenderer({
          "title": "数据库配置管理",
          "body":{
            "type": "crud",
            "syncLocation": false,
            "api": {
              "method": "get",
              "url": "/api/databaseConfig/page",
              "responseData": {
                "total": "total",
                "items": "${records}"
              }
            },
            "columns": tableList,
            "headerToolbar": [
              addButton,
              "bulkActions"
            ],
            "filter": queryButton,
            "perPage": 20,
            "pageField": "pageNum",
            "perPageField": "pageSize",
            "keepItemSelectionOnPageChange": true,
            "footerToolbar": [
              "switch-per-page", "pagination"
            ]
          }
        })}

      </div>
    );
  }
}
