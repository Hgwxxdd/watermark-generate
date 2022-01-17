import { defineComponent, resolveDynamicComponent } from 'vue'
import './ComponentProperty.css'

type Component = {
  label: string
  type: string
  value: string
  props?: any
  on?: HTMLElement
}

export default defineComponent({
  emits: ['componentPropertyChange'],
  props: {
    currentComponent: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { emit }) {
    // TODO 组件中触发的 DOM 事件不应该与 vue 耦合，后期抽离出单独的方法

    const generateSkeleton = (currentComponent: Record<string, any>) => {
      const strategy: any = {
        text: [
          {
            label: '预设样式',
            type: 'a-select',
            value: 'preset',
            props: {},
            on: {
              onChange: (e: InputEvent) => {
                emit('componentPropertyChange', (e.target as HTMLInputElement).value)
              }
            }
          },
          {
            label: '字体大小',
            type: 'a-input',
            value: 'fontSize',
            on: {
              onInput: (e: InputEvent) => {
                emit('componentPropertyChange', 'fontSize', (e.target as HTMLInputElement).value)
              }
            }
          },
          {
            label: '字体间距',
            type: 'a-input',
            value: 'letterSpacing',
            on: {
              onInput: (e: InputEvent) =>
                emit(
                  'componentPropertyChange',
                  'letterSpacing',
                  (e.target as HTMLInputElement).value
                )
            }
          },
          {
            label: '字体粗细',
            type: 'a-input',
            value: 'fontWeight',
            on: {
              onInput: (e: InputEvent) =>
                emit('componentPropertyChange', 'fontWeight', (e.target as HTMLInputElement).value)
            }
          },
          {
            label: '是否换行',
            type: 'a-select',
            value: 'tag',
            props: {
              options: [
                {
                  label: '换行',
                  value: 'div'
                },
                {
                  label: '不换行',
                  value: 'span'
                }
              ]
            },
            on: {
              onChange: (value: string) => {
                emit('componentPropertyChange', 'tag', value)
              }
            }
          },
          {
            label: '文字对齐',
            type: 'a-select',
            value: 'textAlign',
            props: {
              options: [
                {
                  label: '居中',
                  value: 'center'
                },
                {
                  label: '左对齐',
                  value: 'left'
                },
                {
                  label: '右对齐',
                  value: 'right'
                }
              ]
            },
            on: {
              onChange: (value: string) => {
                emit('componentPropertyChange', 'textAlign', value)
              }
            }
          },
          {
            label: '输入值',
            type: 'a-textarea',
            value: 'value',
            props: {
              autoSize: true
            },
            on: {
              onInput: (e: InputEvent) =>
                emit('componentPropertyChange', 'value', (e.target as HTMLInputElement).value)
            }
          }
        ],
        input: [
          {
            label: '长度',
            type: 'a-input',
            value: 'width',
            on: {
              onInput: (e: InputEvent) =>
                emit('componentPropertyChange', 'width', (e.target as HTMLInputElement).value)
            }
          },
          {
            label: '字段名',
            type: 'a-input',
            value: 'name',
            on: {
              onInput: (e: InputEvent) =>
                emit('componentPropertyChange', 'width', (e.target as HTMLInputElement).value)
            }
          },
          {
            label: '字段值',
            type: 'a-input',
            value: 'value',
            on: {
              onInput: (e: InputEvent) =>
                emit('componentPropertyChange', 'width', (e.target as HTMLInputElement).value)
            }
          },
          {
            label: '是否必填',
            type: 'a-select',
            value: 'isRequired',
            props: {
              options: [
                {
                  label: '是',
                  value: true
                },
                {
                  label: '否',
                  value: false
                }
              ]
            },
            on: {
              onChange: (value: string) => {
                emit('componentPropertyChange', 'isRequired', value)
              }
            }
          },
          {
            label: '能否编辑',
            type: 'a-select',
            value: 'isEditable',
            props: {
              options: [
                {
                  label: '是',
                  value: true
                },
                {
                  label: '否',
                  value: false
                }
              ]
            },
            on: {
              onChange: (value: string) => {
                emit('componentPropertyChange', 'isEditable', value)
              }
            }
          }
        ]
      }

      if (!Array.isArray(strategy[currentComponent.type])) {
        return
      }

      if (!currentComponent.type) {
        throw new Error('检查组件配置 JSON 是否正确')
      }

      return strategy[currentComponent.type].map((item: Record<string, any>) => {
        const tagName = resolveDynamicComponent(item.type)
        const value = currentComponent[item.value]
        const { props, on } = item
        const params = { ...props, ...on, value }
        return (
          <div class="property-card">
            <div class="property-name">{item.label} : </div>
            <tagName {...params} />
          </div>
        )
      })
    }

    return () => generateSkeleton(props.currentComponent)
  }
})
