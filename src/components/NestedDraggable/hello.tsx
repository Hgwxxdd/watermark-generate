import { defineComponent, ref, watch, reactive, computed, toRefs } from 'vue'
import type { PropType } from 'vue'
import Icon from '../Icon.vue'
import draggable from 'vuedraggable'
import { cloneDeep, debounce } from 'lodash'
import './index.scss'

export default defineComponent({
  emits: ['componentListChange'],
  props: {
    list: {
      type: Array as PropType<Array<Record<string, any>>>,
      default: () => []
    }
  },
  components: {
    draggable,
    Icon
  },
  setup(props, { emit }) {
    // 保持单向数据流

    // let innerList = reactive(cloneDeep(props.list))

    let currentActive = ref<number>(-1)

    // watch(innerList, (val) => {
    //   console.log('props.list', props.list)
    //   console.log('val', val)
    //   emit('componentListChange', val)
    // })

    function handleCardDelete(event: MouseEvent, index: number) {
      event.stopPropagation()
      props.list.splice(index, 1)
    }

    function handleCardCopy(event: MouseEvent, index: number) {
      event.stopPropagation()
    }

    function handleChildrenCopy(event: MouseEvent, containerIndex: number, childIndex: number) {
      event.stopPropagation()
    }

    function handleChildrenDelete(event: MouseEvent, containerIndex: number, childIndex: number) {
      event.stopPropagation()
      ;(props.list[containerIndex] as Record<string, any>).children.splice(childIndex, 1)
    }

    function handleItemActive(event: MouseEvent, index: number) {
      event.stopPropagation()
      if (currentActive.value !== index) {
        currentActive.value = index
      }
    }

    function handleNestedClick(event: MouseEvent, index: number) {
      event.stopPropagation()
      console.log(index)
    }

    function generateButtonGroup(index: number, _isHover: boolean) {
      console.log('isHover', _isHover)
      if (index === currentActive.value || _isHover) {
        return (
          <div class="button-group">
            <Icon
              type="copy-one"
              fill="#1890ff"
              size="18"
              class="card-copy"
              onClick={(event: MouseEvent) => handleCardCopy(event, index)}
            />

            <Icon
              type="delete"
              class="card-delete"
              fill="#f56c6c"
              size="18"
              onClick={(event: MouseEvent) => handleCardDelete(event, index)}
            />
          </div>
        )
      }
    }

    function generateChildren(element, index) {
      switch (element.type) {
        case 'text':
          return (
            <p
              onClick={(event) => {
                handleNestedClick(event, index)
              }}
            >
              {element.value}
            </p>
          )
        case 'input':
          return <input type="text" />
      }
    }

    return () => (
      <draggable
        list={props.list}
        item-key="id"
        grpup="row"
        animation={300}
        v-slots={{
          item: ({ element, index }) => {
            const containerIndex = index
            let { _isHover } = toRefs(element)
            const className =
              containerIndex === currentActive.value || _isHover.value
                ? 'card-item card-item--active'
                : 'card-item'
            return (
              <div
                class={className}
                onClick={(event) => {
                  handleItemActive(event, index)
                }}
                onMousemove={debounce(() => {
                  if (!_isHover.value) {
                    _isHover.value = true
                  }
                }, 100)}
                onMouseleave={debounce(() => {
                  if (_isHover.value) {
                    _isHover.value = false
                  }
                }, 100)}
              >
                <draggable
                  list={element.children}
                  item-key="id"
                  animation={300}
                  group="col"
                  v-slots={{
                    item: ({ element, index }) => {
                      const childIndex = index
                      const child = element
                      return (
                        <div class="draggable-children">
                          {generateChildren(element, index)}
                          <Icon
                            type="copy-one"
                            fill="#1890ff"
                            size="18"
                            class="child-copy"
                            onClick={(event: MouseEvent) =>
                              handleChildrenCopy(event, containerIndex, childIndex)
                            }
                          />
                          <Icon
                            type="delete"
                            class="child-delete"
                            fill="#f56c6c"
                            size="18"
                            onClick={(event: MouseEvent) =>
                              handleChildrenDelete(event, containerIndex, childIndex)
                            }
                          />
                        </div>
                      )
                    }
                  }}
                />
                {generateButtonGroup(containerIndex, _isHover.value)}
              </div>
            )
          }
        }}
      />
    )
  }
})
