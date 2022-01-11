import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { ComponentMenuList } from '../data'
import Icon from '../Icon.vue'
import './ComponentMenu.css'

const generateIcon = (iconType: string) => {
  const iconMap = new Map([
    ['text', 'add-text'],
    ['input', 'enter-the-keyboard'],
    ['checkbox', 'full-selection'],
    ['select', 'list-checkbox'],
    ['form', 'table-file'],
    ['image', 'upload-one'],
    ['contentEditable', 'expand-text-input']
  ])

  let defaultSetting = {
    size: 24
  }

  if (iconMap.has(iconType)) {
    //  TODO 增加 icon style配置
    Object.assign(defaultSetting, { type: iconMap.get(iconType) })

    return <Icon {...defaultSetting} />
  }

  return <></>
}

export default defineComponent({
  props: {
    list: {
      type: Array as PropType<Array<ComponentMenuList>>,
      default: () => []
    }
  },
  setup(props, { emit }) {
    return () => (
      <div class="component-menu">
        {props.list.map((item: ComponentMenuList) => (
          <div class="component-group">
            <div class="group-title">{item.name}</div>
            <div class="group-item">
              {item.groupItem.map((item) => (
                <div class="card" onClick={() => emit('addComponent', item.type)} draggable>
                  {generateIcon(item.type)}
                  <div class="card-title">{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }
})
