import { defineComponent, ref, watchEffect } from 'vue'
import type { PropType } from 'vue'
import Icon from '../Icon.vue'
import draggable from 'vuedraggable'
import './index.scss'
import Text from '../text.vue'
import Input from '../Input.vue'

export default defineComponent({
  emits: ['currentComponentChange'],
  props: {
    list: {
      type: Array as PropType<Array<Record<string, any>>>,
      default: () => []
    }
  },
  components: {
    Icon,
    Input,
    draggable
  },
  setup(props, { emit }) {
    // 保持单向数据流

    // let innerList = reactive(cloneDeep(props.list))

    watchEffect(() => {
      console.log(props.list)
    })

    let currentActiveContainer = ref<number>(-1)
    let currentActiveChild = ref<number>(-1)

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

    function handleCardActive(event: MouseEvent, index: number, emit: any) {
      let currentNode = document.querySelector(`[data-target='container${index}']`)

      if (currentActiveContainer.value !== index) {
        currentActiveContainer.value = index

        // 判断点击的元素是否是当前元素， 因为点击子元素会冒泡到父元素
        if (currentNode === (event.target as HTMLElement)) {
          currentActiveChild.value = -1
        }
      }
    }

    function moveEnd() {
      console.log('move')
    }

    function handleChildActive(
      event: MouseEvent,
      index: number,
      element: Record<string, any>,
      emit: Function
    ) {
      // 先比较是不是同一个父元素，
      if (currentActiveChild.value !== index) {
        currentActiveChild.value = index
        emit('currentComponentChange', element)
      }
    }

    function generateChildren(element, index) {
      switch (element.type) {
        case 'text':
          return <Text {...element}></Text>
        case 'input':
          return <Input {...element} type="text" />
      }
    }

    return () => (
      <draggable
        list={props.list}
        item-key="id"
        grpup="row"
        animation={300}
        onEnd={moveEnd}
        v-slots={{
          item: ({ element, index }) => {
            const containerIndex = index
            const className =
              containerIndex === currentActiveContainer.value
                ? 'card-item card-item--active'
                : 'card-item'
            const target = `container${containerIndex}`
            return (
              <div
                data-target={target}
                class={className}
                onClick={(event) => {
                  handleCardActive(event, element._containerId, emit)
                }}
              >
                <draggable
                  list={element.children}
                  onEnd={moveEnd}
                  item-key="id"
                  animation={300}
                  group="col"
                  v-slots={{
                    item: ({ element, index }) => {
                      const childIndex = index
                      const child = element

                      const childClassName = () => {
                        if (currentActiveContainer.value !== containerIndex) {
                          return 'card-children'
                        }
                        if (currentActiveChild.value !== childIndex) {
                          return 'card-children'
                        } else {
                          return 'card-children card-children--active'
                        }
                      }

                      return (
                        <div
                          class={childClassName()}
                          onClick={(event) => {
                            handleChildActive(event, element.id, element, emit)
                          }}
                        >
                          {generateChildren(element, index)}
                          <div class="child-button-group">
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
                        </div>
                      )
                    }
                  }}
                />
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
              </div>
            )
          }
        }}
      />
    )
  }
})
