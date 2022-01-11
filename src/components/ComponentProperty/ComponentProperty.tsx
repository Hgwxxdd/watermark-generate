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
            props: {
              options: [
                {
                  label: '宋体',
                  value: '宋体'
                },
                {
                  label: '微软雅黑',
                  value: 'Microsoft Yahei'
                }
              ]
            },
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
            value: 'innerWidth',
            on: {
              onInput: (e: InputEvent) =>
                emit('componentPropertyChange', 'innerWidth', (e.target as HTMLInputElement).value)
            }
          }
        ]
      }

      if (!Array.isArray(strategy[currentComponent.type])) {
        return
      }

      if (!currentComponent.type || !currentComponent.value) {
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
