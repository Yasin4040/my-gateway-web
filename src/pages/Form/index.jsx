import React from 'react';
import amisRenderer from '@/utils/AmisRenderer';
import "./index.css"
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
      "api": "/api/formConfig/edit",
      "body": [
        {
          "label": "id",
          "name": "id",
          "type": "hidden"
        },
        {
          "label": "表单名",
          "name": "name",
          "type": "input-text",
          "required": true
        },
        {
          "label": "数据库配置",
          "name": "databaseId",
          "type": "select",
          "required": true,
          "source": {
            "method": "get",
            "url": "/api/databaseConfig/getDatabaseOptions",
          },
          "autoFill": {
            "databaseName": "${label}"
          },
        },
        {
          "name": "databaseName",
          "type": "hidden"
        },
        {
          "label": "项目配置",
          "name": "projectId",
          "type": "select",
          "required": true,
          "source": {
            "method": "get",
            "url": "/api/projectConfig/getProjectOptions",
          },
          "autoFill": {
            "projectName": "${label}"
          },
        },
        {
          "name": "projectName",
          "type": "hidden"
        },
        {
          "label": "表名",
          "name": "tableName",
          "type": "select",
          "required": true,
          "searchable": true,
          "source": {
            "method": "get",
            "url": "/api/databaseConfig/tableList?id=${databaseId}",
            "adaptor":  "const options =  payload.data.map(v => ({label: v.name + ' ' + v.comment, value: v.name}));\n" +
              "return {\n" +
              "    \"status\": payload.status,\n" +
              "    \"msg\": payload.msg,\n" +
              "    \"data\": {\n" +
              "        \"options\": options\n" +
              "    }\n" +
              "}",
          },
        }
      ]
    }
  }
};

const validationConfig = [
  {
    "type": "select",
    "name": "name",
    "label": "字段名",
    "labelField": "field",
    "valueField": "field",
    "required": true,
    //"unique": true,
    "source": {
      "method": "get",
      "url": "/api/viewCodeConfig/getFieldInfoList?id=${databaseId}&tableName=${tableName}",
    },
  },
  {
    "type": "select",
    "name": "validation",
    "required": true,
    "options": [
      {
        "label": "非空字符串",
        "value": "NotBlank"
      },
      {
        "label": "非空集合",
        "value": "NotEmpty"
      },
      {
        "label": "非空",
        "value": "NotNull"
      },
      {
        "label": "为空",
        "value": "Null"
      },
      {
        "label": "字符串长度",
        "value": "Length"
      },
      {
        "label": "数值范围",
        "value": "Range"
      },
      {
        "label": "不大于",
        "value": "Max"
      },
      {
        "label": "不小于",
        "value": "Min"
      },
      {
        "label": "Email",
        "value": "Email"
      },
      {
        "label": "正则",
        "value": "Pattern"
      }
    ]
  },
  {
    "name": "value",
    "label": "值",
    "type": "input-number",
    "visibleOn": "['Min','Max'].includes(this.validation)",
    "requiredOn": "['Min','Max'].includes(this.validation)"
  },
  {
    "name": "regexp",
    "label": "表达式",
    "type": "input-text",
    "visibleOn": "['Pattern'].includes(this.validation)",
    "requiredOn": "['Pattern'].includes(this.validation)"
  },
  {
    "name": "min",
    "label": "大于",
    "type": "input-number",
    "visibleOn": "['Length', 'Range'].includes(this.validation)",
    "requiredOn": "['Length', 'Range'].includes(this.validation)",
  },
  {
    "name": "max",
    "label": "小于",
    "type": "input-number",
    "visibleOn": "['Length', 'Range'].includes(this.validation)",
    "requiredOn": "['Length', 'Range'].includes(this.validation)",
  },
  {
    "name": "message",
    "label": "错误提示",
    "type": "input-text",
    "placeholder": "不填则使用默认提示"
  },
]

const genJavaCodeBtn = {
  "label": "JAVA代码生成",
  "type": "button",
  "actionType": "dialog",
  "level": "link",
  "dialog": {
    "size": "lg",
    "title": "JAVA代码生成",
    "body": {
      "type": "form",
      "api": "/api/javaCodeConfig/genJavaCode",
      "initApi": "/api/javaCodeConfig/getJavaCodeConfig?formId=${formId}",
      "data": {
        "tablePrefix": '${SPLIT(tableName, "_")[0]}',
        "formId": "${id}",
        "id":null
      },
      "body": [
        {
          "name": "id",
          "type": "hidden"
        },
        {
          "name": "formId",
          "type": "hidden"
        },
        {
          "label": "表名",
          "name": "tableName",
          "type": "static"
        },
        {
          "label": "表名前缀",
          "name": "tablePrefix",
          "type": "input-text",
          "required": true,
        },
        {
          "label": "查询字段",
          "name": "queryFieldList",
          "type": "combo",
          "multiple": true,
          "draggable": true,
          "items": [
            {
              "name": "field",
              "label": "字段名",
              "type": "select",
              "unique": true,
              "source": {
                "method": "get",
                "url": "/api/databaseConfig/getTableFieldOptions?id=${databaseId}&tableName=${tableName}",
              },
            },
            {
              "name": "sqlKeyword",
              "label": "操作类型",
              "type": "select",
              "options": [
                {"label":"=", "value": "EQ"},
                {"label":"<>", "value": "NE"},
                {"label":">", "value": "GT"},
                {"label":">=", "value": "GE"},
                {"label":"<", "value": "LT"},
                {"label":"<=", "value": "LE"},
                {"label":"LIKE", "value": "LIKE"},
                {"label":"NOT_LIKE", "value": "NOT LIKE"}
              ]
            }
          ]
        },
        {
          "label": "表单验证",
          "name": "validationList",
          "type": "combo",
          "multiple": true,
          "draggable": true,
          "items": validationConfig
        },
      ]
    },
    "actions": [
      {
        "type": "button",
        "actionType": "cancel",
        "label": "取消",
      },
      {
        "type": "button",
        "actionType": "confirm",
        "label": "生成",
        "primary": true
      }
    ],
  }
};

const formItemConfigItems = [
  {
    "type": "group",
    "body": [
      {
        "type": "select",
        "name": "name",
        "label": "字段名",
        "labelField": "field",
        "valueField": "field",
        "required": true,
        "unique": true,
        "source": {
          "method": "get",
          "url": "/api/viewCodeConfig/getFieldInfoList?id=${databaseId}&tableName=${tableName}",
        },
      },
      {
        "type": "input-text",
        "name": "label",
        "label": "字段标签",
        "required": true,
        "placeholder": "label"
      },
      {
        "name": "type",
        "label": "类型",
        "type": "select",
        "value": "input-text",
        "required": true,
        "options": [
          "input-text",
          "select",
          "chained-select",
          "checkbox",
          "checkboxes",
          "editor",
          "hidden",
          "input-date",
          "input-date-range",
          "input-datetime",
          "input-datetime-range",
          "input-file",
          "input-image",
          "input-month",
          "input-month-range",
          "input-number",
          "input-password",
          "list-select",
          "radios",
          "static",
          "switch",
          "textarea"
        ]
      },
      {
        "type": "input-text",
        "name": "placeholder",
        "label": "字段说明",
        "placeholder": "placeholder"
      },
      {
        "name": "required",
        "type": "switch",
        "label": "必填"
      },
    ]
  },
  {
    "type": "fieldSet",
    "title": "更多设置",
    "collapseTitle": "收起设置",
    "titlePosition": "bottom",
    "collapsable": true,
    "collapsed": true,
    "mode": "inline",
    "body": [
      {
        "type": "group",
        "label": "数据源",
        "visibleOn": "['chained-select','checkboxes','list-select','radios','select'].includes(this.type)",
        "gap": "xs",
        "body": [
          {
            "type": "input-text",
            "name": "source.url",
            "label": false
          },
          {
            "type": "input-sub-form",
            "name": "source",
            "label": false,
            "btnLabel": "更多source配置",
            "form": {
              "title": "更多source配置",
              "body": [
                {
                  "name": "method",
                  "label": "method",
                  "type": "select",
                  "options": [
                    "get",
                    "post",
                    "put",
                    "delete"
                  ]
                },
                {
                  "name": "url",
                  "label": "url",
                  "type": "input-text"
                },
                {
                  "name": "dataType",
                  "label": "数据提交类型",
                  "type": "input-text"
                },
                {
                  "type": "json-schema",
                  "name": "data",
                  "label": "数据",
                  "schema": {
                    "type": "object",
                  }
                }
              ]
            }
          },
        ]
      },
      {
        "type": "input-tag",
        "name": "options",
        "label": "选项组",
        "visibleOn": "['checkboxes','list-select','radios','select'].includes(this.type)",
      },
      {
        "name": "checkAll",
        "type": "checkbox",
        "label": "支持全选",
        "visibleOn": "['checkboxes'].includes(this.type)",
      },
      {
        "name": "option",
        "type": "input-text",
        "label": "选型说明",
        "visibleOn": "['checkbox'].includes(this.type)",
      },
      {
        "name": "optionType",
        "type": "select",
        "label": "选型类型",
        "visibleOn": "['checkbox'].includes(this.type)",
        "options": [
          "default",
          "button"
        ]
      },
      {
        "name": "language",
        "type": "select",
        "label": "编辑语言",
        "visibleOn": "['editor'].includes(this.type)",
        "options": [
          "bat",
          "c",
          "coffeescript",
          "cpp",
          "csharp",
          "css",
          "dockerfile",
          "fsharp",
          "go",
          "handlebars",
          "html",
          "ini",
          "java",
          "javascript",
          "json",
          "less",
          "lua",
          "markdown",
          "msdax",
          "objective-c",
          "php",
          "plaintext",
          "postiats",
          "powershell",
          "pug",
          "python",
          "r",
          "razor",
          "ruby",
          "sb",
          "scss",
          "shell",
          "sol",
          "sql",
          "swift",
          "typescript",
          "vb",
          "xml",
          "yaml"
        ]
      },
      {
        "name": "allowFullscreen",
        "type": "checkbox",
        "label": "全屏模式开关",
        "visibleOn": "['editor'].includes(this.type)",
      },
      {
        "name": "format",
        "type": "input-text",
        "label": "format",
        "visibleOn": "['input-date','input-date-range','input-datetime','input-datetime-range','input-month','input-month-range'].includes(this.type)",
      },
      {
        "type": "group",
        "label": "上传接口",
        "visibleOn": "['input-file','input-image'].includes(this.type)",
        "gap": "xs",
        "body": [
          {
            "type": "input-text",
            "name": "receiver.url",
            "label": false
          },
          {
            "type": "input-sub-form",
            "name": "receiver",
            "label": false,
            "btnLabel": "更多source配置",
            "form": {
              "title": "更多source配置",
              "body": [
                {
                  "name": "method",
                  "label": "method",
                  "type": "select",
                  "options": [
                    "get",
                    "post",
                    "put",
                    "delete"
                  ]
                },
                {
                  "name": "url",
                  "label": "url",
                  "type": "input-text"
                },
                {
                  "name": "dataType",
                  "label": "数据提交类型",
                  "type": "input-text"
                },
                {
                  "type": "json-schema",
                  "name": "data",
                  "label": "数据",
                  "schema": {
                    "type": "object",
                  }
                }
              ]
            }
          },
        ]
      },
      {
        "name": "accept",
        "type": "input-text",
        "label": "接受类型",
        "visibleOn": "['input-file','input-image'].includes(this.type)",
      },
      {
        "name": "multiple",
        "type": "checkbox",
        "label": "多选",
        "visibleOn": "['input-file','input-image','list-select','select'].includes(this.type)",
      },
      {
        "name": "drag",
        "type": "checkbox",
        "label": "拖拽上传",
        "visibleOn": "['input-file','input-image','list-select','select'].includes(this.type)",
      },
      {
        "name": "btnLabel",
        "type": "input-text",
        "label": "上传按钮文字",
        "visibleOn": "['input-file','input-image','list-select','select'].includes(this.type)",
      },
      {
        "name": "crop",
        "type": "checkbox",
        "label": "支持裁剪",
        "visibleOn": "['input-image'].includes(this.type)",
      },
      {
        "name": "trimContents",
        "type": "checkbox",
        "label": "去首尾空白",
        "visibleOn": "['input-text','textarea'].includes(this.type)",
      },

      {
        "name": "disabled",
        "type": "checkbox",
        "label": "禁用"
      },
      {
        "name": "hidden",
        "type": "checkbox",
        "label": "隐藏"
      }
    ]
  }
]

const genViewCodeBtn = {
  "label": "页面代码生成",
  "type": "button",
  "actionType": "dialog",
  "level": "link",
  "dialog": {
    "size": "lg",
    "title": "页面代码生成",
    "body": {
      "type": "form",
      "api": "/api/viewCodeConfig/genViewCode",
      "initApi": "/api/viewCodeConfig/getViewCodeConfig?formId=${formId}",
      "data": {
        "tablePrefix": '${SPLIT(tableName, "_")[0]}',
        "formId": "${id}",
        "id":null
      },
      "body": [
        {
          "name": "id",
          "type": "hidden"
        },
        {
          "name": "formId",
          "type": "hidden"
        },
        {
          "label": "表名",
          "name": "tableName",
          "type": "static"
        },
        {
          "label": "表名前缀",
          "name": "tablePrefix",
          "type": "input-text",
          "required": true,
        },
        {
          "label": "列表字段",
          "name": "tableFieldList",
          "type": "combo",
          "multiple": true,
          "draggable": true,
          "items": [
            {
              "name": "name",
              "label": "字段名",
              "type": "select",
              "unique": true,
              "required": true,
              "labelField": "field",
              "valueField": "field",
              "source": {
                "method": "get",
                "url": "/api/viewCodeConfig/getFieldInfoList?id=${databaseId}&tableName=${tableName}",
              },
              "onEvent": {
                "change": {
                  "actions": [
                    {
                      "actionType": "custom",
                      "script": (context,doAction,event)=>{
                        let val;
                        for(let v of event.context.data.options) {
                          if(v.value === event.context.data.value){
                            val = v;
                          }
                        }
                        context.props.onChange(val.label, "label");
                      }
                    }
                  ]
                }
              },
            },
            {
              "name": "label",
              "label": "标签",
              "type": "input-text",
              "required": true,
            },
            {
              "name": "type",
              "label": "类型",
              "type": "select",
              "value": "text",
              "required": true,
              "options": [
                "text",
                "image",
                "date",
                "progress",
                "status",
                "switch"
              ]
            }
          ]
        },
        {
          "label": "开启搜索",
          "name": "searchEnabled",
          "type": "switch"
        },
        {
          "label": "搜索字段",
          "name": "searchSchema",
          "type": "combo",
          "multiple": true,
          "multiLine": true,
          "draggable": true,
          "visibleOn": "this.searchEnabled === true",
          "items": formItemConfigItems
        },
        {
          "label": "添加按钮",
          "name": "addActionEnabled",
          "type": "switch"
        },
        {
          "label": "编辑按钮",
          "name": "editActionEnabled",
          "type": "switch"
        },
        {
          "label": "表单字段",
          "name": "editActionSchema",
          "type": "combo",
          "multiple": true,
          "multiLine": true,
          "draggable": true,
          "visibleOn": "this.addActionEnabled === true || this.editActionEnabled === true",
          "items": formItemConfigItems
        },
        {
          "label": "删除按钮",
          "name": "deleteActionEnabled",
          "type": "switch"
        },
      ]
    },
    "actions": [
      {
        "type": "button",
        "actionType": "cancel",
        "label": "取消",
      },
      {
        "type": "button",
        "actionType": "confirm",
        "label": "生成",
        "primary": true
      }
    ],
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
    "url": "/api/formConfig/delete",
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
    "label": "表单名",
    "name": "name",
    "type": "text",
  },
  {
    "label": "数据库配置",
    "name": "databaseName",
    "type": "text"
  },
  {
    "label": "项目配置",
    "name": "projectName",
    "type": "text"
  },
  {
    "label": "表名",
    "name": "tableName",
    "type": "text"
  },
  {
    "type": "operation",
    "label": "操作",
    "buttons": [
      editButton,
      genJavaCodeBtn,
      genViewCodeBtn,
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
      "api": "POST:/api/formConfig/add",
      "data":{
        "name": ""
      },
      "body": [
        {
          "label": "表单名",
          "name": "name",
          "type": "input-text",
          "required": true,
        },
        {
          "label": "数据库配置",
          "name": "databaseId",
          "type": "select",
          "required": true,
          "source": {
            "method": "get",
            "url": "/api/databaseConfig/getDatabaseOptions",
          },
          "autoFill": {
            "databaseName": "${label}"
          },
        },
        {
          "name": "databaseName",
          "type": "hidden"
        },
        {
          "label": "项目配置",
          "name": "projectId",
          "type": "select",
          "required": true,
          "source": {
            "method": "get",
            "url": "/api/projectConfig/getProjectOptions",
          },
          "autoFill": {
            "projectName": "${label}"
          },
        },
        {
          "name": "projectName",
          "type": "hidden"
        },
        {
          "label": "表名",
          "name": "tableName",
          "type": "select",
          "searchable": true,
          "required": true,
          "source": {
            "method": "get",
            "url": "/api/databaseConfig/tableList?id=${databaseId}",
            "adaptor":  "const options =  payload.data.map(v => ({label: v.name + ' ' + v.comment, value: v.name}));\n" +
              "return {\n" +
              "    \"status\": payload.status,\n" +
              "    \"msg\": payload.msg,\n" +
              "    \"data\": {\n" +
              "        \"options\": options\n" +
              "    }\n" +
              "}",
          },
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
      "label": "表单名",
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
          "title": "表单配置管理",
          "body":{
            "type": "crud",
            "syncLocation": false,
            "api": {
              "method": "get",
              "url": "/api/formConfig/page",
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
