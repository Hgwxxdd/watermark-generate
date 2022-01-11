<template>
  <div class="wrapper">
    <div class="sidebar-left">
      <ComponentMenu :list="componentMenuList" @addComponent="addComponent" />
    </div>
    <div class="content">
      <div class="window-shell">
        <div class="shell-status-bar">
          <span class="status-bar-button close-button"></span>
          <span class="status-bar-button min-button"></span>
          <span class="status-bar-button max-button"></span>
        </div>
        <div class="shell-wrapper">
          <div class="shell-content">
            <NestedDraggable :list="componentList" />
          </div>
        </div>
      </div>
    </div>
    <div class="sidebar-right">
      <a-tabs v-model="activeKey">
        <a-tab-pane key="1" tab="组件属性">
          <ComponentProperty
            :currentComponent="state.currentComponent"
            @componentPropertyChange="componentPropertyChange"
          />
        </a-tab-pane>
        <a-tab-pane key="2" tab="施工中 🚧"></a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import ComponentMenu from '../components/ComponentMenu/ComponentMenu'
import ComponentProperty from '../components/ComponentProperty/ComponentProperty'
import NestedDraggable from '../components/NestedDraggable/hello'
import { componentMenuList } from '../components/data'
const activeKey = ref('1')

const componentList = reactive<Array<Record<string, any>>>([])

const state = reactive({
  currentComponent: {},
  count: 0
})

function getNewComponentSetting(type: string): Record<string, any> {
  let newSetting = {}

  // 共有属性 默认值
  const defaultSetting = {
    name: '',
    required: true,
    disabled: false,
    grid: 24,
    id: Date.now()
  }

  // input 默认值
  const inputDefault = {
    type: 'input',
    maxLength: '',
    value: '',
    innerWidth: 150
  }

  // text 默认值
  const textDefault = {
    type: 'text',
    letterSpacing: 0,
    fontSize: 18,
    paddingTop: 0,
    paddingBottom: 0,
    fontFamily: '宋体',
    value: '这是一段默认文字',
    preset: 'main'
  }

  // 行容器默认值
  const containerDefault = {
    type: 'container'
  }

  const strategy = {
    text: () => Object.assign(defaultSetting, textDefault),
    input: () => Object.assign(defaultSetting, inputDefault),
    container: () => Object.assign(defaultSetting, containerDefault)
  }

  switch (type) {
    case 'text':
      newSetting = strategy.text()
      break
    case 'input':
      newSetting = strategy.input()
      break
    case 'container':
      newSetting = strategy.container()
      break
    default:
      throw new Error('Component not exist')
  }
  return newSetting
}

function addComponent(item: string) {
  const length = componentList.length
  const settings = getNewComponentSetting(item)
  componentList.push({
    _isHover: false,
    type: 'container',
    id: Date.now().toString(),
    children: [settings]
  })
  console.log(componentList)
  state.currentComponent = componentList[length]
  state.count++
}

function componentPropertyChange(target: string, value: string) {
  state.currentComponent[target] = value
}
</script>

<style lang="scss" scoped>
$border-color: #ebedf0;
$contract-border-color: #999;
.wrapper {
  position: relative;
  z-index: 1;

  display: flex;

  margin-top: 64px;
  height: calc(100vh - 64px);
}

.sidebar-left {
  flex: 0 0 300px;
  border-right: 1px solid $border-color;
  padding: 10px;
}

.sidebar-right {
  flex: 0 0 350px;
  padding: 10px;
  border-left: 1px solid $border-color;
  overflow-y: scroll;
}

.content {
  position: relative;
  flex: 1 1 auto;
  .window-shell {
    position: relative;

    margin: 40px 60px;
    border-radius: 7px;
    box-shadow: 0px 5px 40px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(167, 167, 167, 0.7);
    border-top-color: rgba(167, 167, 167, 0.5);
    background-color: #f5f2f0;

    .shell-status-bar {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      height: 36px;
      border-top-left-radius: 7px;
      border-top-right-radius: 7px;
      background-image: linear-gradient(#e6e2e6, #cdcbcd);
      border-top: 1px solid #f3f1f3;
      border-bottom: 1px solid rgba(167, 167, 167, 0.7);

      .status-bar-button {
        margin-left: 10px;
        cursor: pointer;
      }
      .close-button {
        height: 12px;
        width: 12px;

        border-radius: 50%;
        border: 1px solid #f21111;
        background-color: #ff4443;
      }

      .min-button {
        width: 12px;
        height: 12px;

        border-radius: 50%;
        border: 1px solid #e9a113;
        background-color: #ffbe00;
      }

      .max-button {
        width: 12px;
        height: 12px;
        border-radius: 50%;

        border: 1px solid #12b52e;
        background-color: #00da47;
      }
    }

    .shell-wrapper {
      display: flex;
      justify-content: center;
      align-items: flex-start;

      height: calc(100vh - 200px);
      overflow-y: scroll;
      .shell-content {
        min-height: calc(100vh - 200px);

        width: 640px;
        box-sizing: content-box;
        margin: 70px 0;
        padding: 60px;
        background-color: #fff;
        border: 1px solid #ccc;
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
      }
    }
  }
}
</style>

<style>
.ant-tabs .ant-tabs-nav-container {
  text-align: center;
}
</style>
