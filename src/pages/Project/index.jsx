import React from 'react';
import amisRenderer from '@/utils/AmisRenderer';

window.enableAMISDebug = true

const editButton = {
  "label": "编辑",
  "type": "button",
  "actionType": "dialog",
  "level": "link",
  "dialog": {
    "title": "编辑",
    "body": {
      "type": "form",
      "api": "/api/projectConfig/edit",
      "body": [
        {
          "label": "id",
          "name": "id",
          "type": "hidden"
        },
        {
          "label": "项目模块名称",
          "name": "projectName",
          "type": "input-text"
        },
        {
          "label": "作者",
          "name": "author",
          "type": "input-text"
        },
        {
          "label": "配置父包名",
          "name": "parent",
          "type": "input-text",
          "placeholder": "com.jtyjy"
        },
        {
          "label": "配置entity包名",
          "name": "entityPackage",
          "type": "input-text"
        },
        {
          "label": "配置mapper包名",
          "name": "mapperPackage",
          "type": "input-text"
        },
        {
          "label": "配置service包名",
          "name": "servicePackage",
          "type": "input-text"
        },
        {
          "label": "配置controller包名",
          "name": "controllerPackage",
          "type": "input-text"
        },
        {
          "label": "配置xml目录",
          "name": "xmlDir",
          "type": "input-text"
        },
        {
          "label": "配置java源码目录",
          "name": "javaDir",
          "type": "input-text"
        },
        {
          "label": "配置queryVO包名",
          "name": "queryPackage",
          "type": "input-text"
        },
        {
          "label": "配置vo包名",
          "name": "voPackage",
          "type": "input-text"
        },
        {
          "label": "配置convert包名",
          "name": "convertPackage",
          "type": "input-text"
        },
        {
          "label": "controller path前缀",
          "name": "controllerParentPath",
          "type": "input-text"
        },
        {
          "label": "页面源码目录",
          "name": "viewDir",
          "type": "input-text"
        },
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
    "url": "/api/projectConfig/delete",
    "dataType": "form",
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
    "label": "项目模块名称",
    "name": "projectName",
    "type": "text"
  },
  {
    "label": "作者",
    "name": "author",
    "type": "text"
  },
  {
    "label": "配置父包名",
    "name": "parent",
    "type": "text",
  },
  {
    "type": "operation",
    "label": "操作",
    "buttons": [
      editButton,
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
      "api": "POST:/api/projectConfig/add",
      "data":{
        "projectName": "",
        "entityPackage": "model",
        "mapperPackage": "mapper",
        "servicePackage": "service",
        "controllerPackage": "controller",
        "xmlDir": "/src/main/resources/mapper",
        "javaDir": "/src/main/java",
        "queryPackage": "vo",
        "voPackage": "vo",
        "convertPackage": "convert",

      },
      "body": [
        {
          "label": "项目模块名称",
          "name": "projectName",
          "type": "input-text"
        },
        {
          "label": "作者",
          "name": "author",
          "type": "input-text"
        },
        {
          "label": "配置父包名",
          "name": "parent",
          "type": "input-text",
          "placeholder": "com.jtyjy"
        },
        {
          "label": "配置entity包名",
          "name": "entityPackage",
          "type": "input-text"
        },
        {
          "label": "配置mapper包名",
          "name": "mapperPackage",
          "type": "input-text"
        },
        {
          "label": "配置service包名",
          "name": "servicePackage",
          "type": "input-text"
        },
        {
          "label": "配置controller包名",
          "name": "controllerPackage",
          "type": "input-text"
        },
        {
          "label": "配置xml目录",
          "name": "xmlDir",
          "type": "input-text"
        },
        {
          "label": "配置java源码目录",
          "name": "javaDir",
          "type": "input-text"
        },
        {
          "label": "配置queryVO包名",
          "name": "queryPackage",
          "type": "input-text"
        },
        {
          "label": "配置vo包名",
          "name": "voPackage",
          "type": "input-text"
        },
        {
          "label": "配置convert包名",
          "name": "convertPackage",
          "type": "input-text"
        },
        {
          "label": "controller path前缀",
          "name": "controllerParentPath",
          "type": "input-text"
        },
        {
          "label": "页面源码目录",
          "name": "viewDir",
          "type": "input-text"
        },
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
      "label": "项目名称",
      "name": "projectName"
    }
  ]
};

export default class List extends React.Component {
  render() {
    return (
      <div>
        {amisRenderer({
          "title": "项目配置管理",
          "body":{
            "type": "crud",
            "syncLocation": false,
            "api": {
              "method": "get",
              "url": "/api/projectConfig/page",
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
