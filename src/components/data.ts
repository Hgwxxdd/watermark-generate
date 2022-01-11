// 所有的菜单都在这里配置

type GroupItem = {
  type: string
  name: string
}

type ComponentMenuList = {
  type: string
  name: string
  groupItem: Array<GroupItem>
}

// 左侧组件菜单
const componentMenuList: Array<ComponentMenuList> = [
  {
    type: 'group',
    name: '纯文本',
    groupItem: [
      {
        type: 'text',
        name: '文字'
      }
    ]
  },
  {
    type: 'group',
    name: '交互组件',
    groupItem: [
      {
        name: '单行输入框',
        type: 'input'
      },
      {
        name: '多行输入框',
        type: 'contentEditable'
      },
      {
        name: '多选框组',
        type: 'checkbox'
      },
      {
        name: '下拉列表',
        type: 'select'
      }
    ]
  },
  {
    type: 'group',
    name: '附件上传',
    groupItem: [
      {
        name: '图片上传',
        type: 'image'
      }
    ]
  }
]

// 右侧组件属性

const componentProperty = {}

export { componentMenuList, componentProperty }
export type { ComponentMenuList, GroupItem }
