import { defineComponent, reactive, computed, watch, watchEffect, onMounted } from 'vue'
import Select from './Select.vue'
import Radio from './Radio.vue'
import Input from './input.vue'

export default defineComponent({
  setup() {
    // TODO 根据 json 生成一个文件

    onMounted(() => {
      getData()
    })

    const form = reactive({
      contractNumber: '',
      sellers: '',
      buyers: '',
      roomNumber: '',
      area: '',
      houseQuality: '',
      rentFromYear: '',
      rentFromMonth: '',
      rentFromDay: '',
      rentToYear: '',
      rentToMonth: '',
      rentToDay: '',
      // 抵押人
      mortgagor: '',
      // 抵押权人
      mortgagee: '',
      // 抵押登记机构
      mortgageRegistrationAgency: '',
      // 抵押登记日期
      mortgageDate: '',
      // 债务履行权限
      debtPerformanceAuthority: '',
      // 买受人付款
      buyerPaymentMethod: '',
      oneTimePaymentYear: '',
      oneTimePaymentMonth: '',
      oneTimePaymentDay: '',
      instalmentYear: '',
      instalmentMonth: '',
      instalmentDay: '',
      buyerMonth: '',
      buyerDay: '',
      currency: '',
      payment: '',
      capitalizeMoney: '',
      // 贷款方式
      loanMethods: '',
      diya: ''
    })

    const tree = reactive([
      {
        componentName: 'block',
        visible: true,
        children: [
          {
            componentName: 'text',
            content: 'GF-2014'
          }
        ]
      },
      {
        componentName: 'block',
        visible: true,
        children: [
          {
            componentName: 'text',
            content: '合同编号 '
          },
          {
            componentName: 'input',
            name: 'contractNumber'
          }
        ]
      },
      {
        componentName: 'block',
        visible: true,
        children: [
          {
            componentName: 'text',
            content: '出卖人'
          },
          {
            componentName: 'input',
            name: 'sellers'
          }
        ]
      },
      {
        componentName: 'block',
        visible: true,
        children: [
          {
            componentName: 'text',
            content: '买受人 '
          },
          {
            componentName: 'input',
            name: 'buyers'
          }
        ]
      },
      {
        componentName: 'block',
        visible: true,
        children: [
          {
            componentName: 'text',
            content: '中华人民共和国住房和城乡建设部'
          }
        ]
      },
      {
        componentName: 'block',
        visible: true,
        children: [
          {
            componentName: 'text',
            content: '中华人民共和国国家工商行政管理总局'
          }
        ]
      },
      {
        componentName: 'block',
        visible: true,
        children: [
          {
            componentName: 'text',
            content: '二〇一四年四月 '
          }
        ]
      },
      {
        componentName: 'text',
        content: '第一条，房屋坐落在间数'
      },
      {
        componentName: 'input',
        name: 'roomNumber'
      },
      {
        componentName: 'text',
        content: '建筑面积'
      },
      {
        componentName: 'input',
        name: 'area'
      },
      {
        componentName: 'text',
        content: '房屋质量'
      },
      {
        componentName: 'input',
        name: 'houseQuality'
      },
      {
        componentName: 'text',
        content: '。'
      },
      {
        componentName: 'text',
        content: '第二条 租赁期限从'
      },
      {
        componentName: 'input',
        name: 'rentFromYear'
      },
      {
        componentName: 'text',
        content: '年'
      },
      {
        componentName: 'input',
        name: 'rentFromMonth'
      },
      {
        componentName: 'text',
        content: '月'
      },
      {
        componentName: 'input',
        name: 'rentFromDay'
      },
      {
        componentName: 'text',
        content: '日至'
      },
      {
        componentName: 'input',
        name: 'rentToYear'
      },
      {
        componentName: 'text',
        content: '年'
      },
      {
        componentName: 'input',
        name: 'rentToMonth'
      },
      {
        componentName: 'text',
        content: '月'
      },
      {
        componentName: 'input',
        name: 'rentToDay'
      },
      {
        componentName: 'text',
        content: '日。 （提示：租赁期限不得超过二十年。超过二十年的，超过部分无效）'
      },
      {
        componentName: 'text',
        content:
          '3.套内建筑面积：是指成套房屋的套内建筑面积，由套内使用面积、套内墙体面积、套内阳台建筑面积三部分组成。'
      },
      {
        componentName: 'text',
        content: '第四条 抵押情况'
      },
      {
        componentName: 'text',
        content: '与该商品房有关的抵押情况为'
      },
      {
        componentName: 'radio',
        disabled: false,
        visible: true,
        name: 'diya',
        options: [
          {
            label: '抵押',
            value: '1',
            emits: [
              {
                uniqueName: 'name',
                uniqueValue: 's1',
                property: 'visible',
                value: false
              }
            ]
          },
          {
            label: '未抵押',
            value: '2',
            emits: [
              {
                uniqueName: 'name',
                uniqueValue: 's1',
                property: 'visible',
                value: true
              }
            ]
          }
        ],
        on: {
          onChange: (options) => {
            console.log(options)
            form[options.name] = options.value

            // 通知订阅
            handleSubscribe(options.emits)
          }
        }
      },
      {
        componentName: 'block',
        name: 's1',
        visible: true,
        children: [
          {
            componentName: 'text',
            content: '抵押人'
          },
          {
            componentName: 'input',
            name: 'mortgagor'
          },
          {
            componentName: 'text',
            content: '，抵押权人：'
          },
          {
            componentName: 'input',
            name: 'mortgagee'
          },
          {
            componentName: 'text',
            content: '抵押登记机构：'
          },
          {
            componentName: 'input',
            name: 'mortgageRegistrationAgency'
          },
          {
            componentName: 'text',
            content: '，抵押登记日期：'
          },
          {
            componentName: 'input',
            name: 'mortgageDate'
          },
          {
            componentName: 'text',
            content: '债务履行权限：'
          },
          {
            componentName: 'input',
            name: 'debtPerformanceAuthority'
          }
        ]
      },
      {
        componentName: 'block',
        visible: true,
        children: [
          {
            componentName: 'text',
            content: '第八条 买受人将采取第'
          },
          {
            componentName: 'select',
            disabled: false,
            visible: false,
            name: 'buyerPaymentMethod',
            options: [
              {
                label: '1',
                value: '1',
                emits: [
                  {
                    uniqueName: 'name',
                    uniqueValue: 'b1',
                    property: 'visible',
                    value: false
                  },
                  {
                    uniqueName: 'name',
                    uniqueValue: 'b2',
                    property: 'visible',
                    value: true
                  }
                ]
              },
              {
                label: '2',
                value: '2',
                emits: [
                  {
                    uniqueName: 'name',
                    uniqueValue: 'b1',
                    property: 'visible',
                    value: true
                  },
                  {
                    uniqueName: 'name',
                    uniqueValue: 'b2',
                    property: 'visible',
                    value: false
                  }
                ]
              }
            ],
            on: {
              onChange: (options) => {
                form[options.name] = options.value

                // 通知订阅
                handleSubscribe(options.emits)
              }
            }
          },
          {
            componentName: 'text',
            content: '种方式付款'
          }
        ]
      },
      {
        componentName: 'block',
        name: 'b1',
        visible: true,
        children: [
          {
            componentName: 'text',
            content: '1. 一次性付款。买受人应当在'
          },
          {
            componentName: 'input',
            name: 'oneTimePaymentYear'
          },
          {
            componentName: 'text',
            content: '年'
          },
          {
            componentName: 'input',
            name: 'oneTimePaymentMonth'
          },
          {
            componentName: 'text',
            content: '月'
          },
          {
            componentName: 'input',
            name: 'oneTimePaymentDay'
          },
          {
            componentName: 'text',
            content: '日前支付该商品房全部价款。'
          }
        ]
      },
      {
        componentName: 'block',
        name: 'b2',
        visible: true,
        children: [
          {
            componentName: 'text',
            content: '2. 分期付款。买受人应当在'
          },
          {
            componentName: 'input',
            name: 'instalmentYear'
          },
          {
            componentName: 'text',
            content: '年'
          },
          {
            componentName: 'input',
            name: 'instalmentMonth'
          },
          {
            componentName: 'text',
            content: '月'
          },
          {
            componentName: 'input',
            name: 'instalmentDay'
          },
          {
            componentName: 'text',
            content: '日前支付该商品房全部价款。'
          }
        ]
      },
      {
        componentName: 'text',
        content: '3. 贷款方式付款'
      },
      {
        componentName: 'select',
        disabled: true,
        visible: false,
        name: 'loanMethods',
        options: [
          {
            label: '公积金贷款',
            value: '1'
          },
          {
            label: '商业贷款',
            value: '2'
          }
        ],
        on: {
          onChange: (options) => {
            form[options.name] = options.value
          }
        }
      },
      {
        componentName: 'text',
        content: '买受人应当于'
      },
      {
        componentName: 'input',
        name: 'buyerMonth',
        disabled: false
      },
      {
        componentName: 'text',
        content: '月'
      },
      {
        componentName: 'input',
        name: 'buyerDay',
        disabled: false
      },
      {
        componentName: 'text',
        content: '日支付首期房款价'
      },
      {
        componentName: 'input',
        name: 'currency',
        disabled: false
      },
      {
        componentName: 'text',
        content: '（币种）'
      },
      {
        componentName: 'input',
        name: 'payment',
        disabled: false
      },
      {
        componentName: 'text',
        content: '元（大写'
      },
      {
        componentName: 'input',
        name: 'capitalizeMoney',
        disabled: false
      },
      {
        componentName: 'text',
        content: '元整）'
      }
    ])

    // TODO 用一个算法筛选黑名单出来
    const blackList = []

    function mockData() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            contractNumber: '1',
            sellers: '2',
            buyers: '3',
            roomNumber: '4',
            area: '5',
            houseQuality: '6',
            rentFromYear: '7',
            rentFromMonth: '8',
            rentFromDay: '9',
            rentToYear: '10',
            rentToMonth: '11',
            rentToDay: '12',
            // 抵押人
            mortgagor: '13',
            // 抵押权人
            mortgagee: '14',
            // 抵押登记机构
            mortgageRegistrationAgency: '15',
            // 抵押登记日期
            mortgageDate: '16',
            // 债务履行权限
            debtPerformanceAuthority: '17',
            // 买受人付款
            buyerPaymentMethod: '1',
            oneTimePaymentYear: '19',
            oneTimePaymentMonth: '20',
            oneTimePaymentDay: '21',
            instalmentYear: '22',
            instalmentMonth: '23',
            instalmentDay: '24',
            buyerMonth: '25',
            buyerDay: '26',
            currency: '27',
            payment: '28',
            capitalizeMoney: '29',
            // 贷款方式
            loanMethods: '2',
            diya: '1'
          })
        }, 2000)
      })
    }

    function getData() {
      mockData().then((response) => {
        Object.keys(response).forEach((key) => {
          let obj = findPropertyByName('name', key)
          if (obj) {
            obj.defaultValue = response[key]
          }
        })
      })
    }

    function text(value, str = 'span') {
      if (str === 'block') {
        return <div>{value}</div>
      }
      return <str>{value}</str>
    }

    function handleInput(obj) {
      const { name, value } = obj
      form[name] = value
    }

    function input(item) {
      return (
        <Input
          name={item.name}
          defaultValue={item.defaultValue}
          disabled={item.disabled}
          onInput={handleInput}
        />
      )
    }

    function select(item) {
      return (
        <Select
          name={item.name}
          defaultValue={item.defaultValue}
          options={item.options}
          {...item.on}
          disabled={item.disabled}
        />
      )
    }

    function radio(item) {
      return (
        <Radio
          name={item.name}
          defaultValue={item.defaultValue}
          options={item.options}
          {...item.on}
          disabled={item.disabled}
        />
      )
    }

    function handleSubscribe(emits) {
      console.log(emits)
      emits.forEach((item) => {
        // 找到对应的属性然后更改
        let obj = findPropertyByName(item.uniqueName, item.uniqueValue)
        if (obj) {
          setNewValue(obj, item.property, item.value)
          // 如果不可见，把里面的提交项全部删掉
          if (!obj.visible) {
            // TODO dfs 找到 obj 里所有的 name, 加入 blacklist
          }
        }
      })
    }
    // 找到属性然后改掉
    function setNewValue(obj, property, value) {
      obj[property] = value
    }
    function findPropertyByName(uniqueName, uniqueValue) {
      // 声明一个内部递归函数，用于执行深度优先搜索
      function dfs(arr) {
        for (const obj of arr) {
          if (obj[uniqueName] === uniqueValue) {
            return obj // 找到目标对象，返回结果
          }
          // 如果当前对象有 children 属性且为数组，则递归搜索其子对象
          if (Array.isArray(obj.children)) {
            const found = dfs(obj.children)
            if (found) {
              return found // 如果在子对象中找到目标对象，返回结果
            }
          }
        }
        return null // 如果遍历完整个数组都没有找到目标对象，返回 null
      }

      // 调用内部的递归函数开始搜索
      return dfs(tree)
    }

    function display(block) {
      return (
        <div>
          {block.children.map((item) => {
            if (item.componentName === 'text') {
              return text(item.content, item.display)
            } else if (item.componentName === 'input') {
              return input(item)
            } else if (item.componentName === 'radio') {
              return radio(item)
            } else if (item.componentName === 'select') {
              return select(item)
            }
            return null
          })}
        </div>
      )
    }

    // 待定 观察者模式
    // let map = {
    //   clientList: [],
    //   listen: function (key, fn) {
    //     if (!this.clientList[key]) {
    //       this.clientList[key] = []
    //     }
    //     this.clientList[key].push(fn)
    //   },
    //   trigger: function (key) {
    //     for (const fn of this.clientList[key]) {
    //       fn()
    //     }
    //   }
    // }

    function handleSubmit() {}

    return () => (
      <div>
        <div>
          {tree.map((item) => {
            if (item.componentName === 'text') {
              return text(item.content, item.display)
            } else if (item.componentName === 'input') {
              return input(item)
            } else if (item.componentName === 'radio') {
              return radio(item)
            } else if (item.componentName === 'select') {
              return select(item)
            }
            if (item.componentName === 'block') {
              if (item.visible) {
                return display(item)
              }
              return
            }
          })}
        </div>
        <button onClick={handleSubmit}>提交</button>
      </div>
    )
  }
})
