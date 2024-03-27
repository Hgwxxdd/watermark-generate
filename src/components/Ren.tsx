import { defineComponent, reactive } from 'vue'
import Select from './Select.vue'

// 如何实时收集内部组件的数据
// 如何对组件的数据进行校验
// 如何更新组件数据  // 调用 api

// a ? 直接创建一个 reactive 大对象

export default defineComponent({
  setup() {
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
      loanMethods: ''
    })

    function text(value, str = 'span') {
      if (str === 'block') {
        return <div>{value}</div>
      }
      return <str>{value}</str>
    }

    function input(name, display) {
      const handleInput = (event) => {
        console.log(form)
        form[name] = event.target.value
      }

      if (display === 'block') {
        return (
          <input
            style={{ display: 'block' }}
            type="text"
            value={form[name]}
            onInput={handleInput}
          />
        )
      }
      return <input type="text" value={form[name]} onInput={handleInput} />
    }

    function select(item) {
      // if (item.options) {
      //   item.options.forEach((item) => {
      //     if (item.emits.length) {
      //       item.emits.forEach((item) => {
      //         // 用 proxy，拦截set，然后每次 set, 的时候触发依赖数组
      //         // 观察者模式
      //       })
      //     }
      //   })
      // }

      return <Select name={item.name} options={item.options} {...item.on} />
    }

    function changedata(oldData, name, property, value) {
      const newData = oldData

      // diff 算法

      return newData
    }

    let arr = [
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
        componentName: 'radio'
      },
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
            readonly: true,
            name: 'buyerPaymentMethod',
            options: [
              {
                label: '1',
                value: '1',
                emits: [
                  {
                    name: 'b1',
                    property: 'visible',
                    value: false
                  },
                  {
                    name: 'b2',
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
                    name: 'b1',
                    property: 'visible',
                    value: true
                  },
                  {
                    name: 'b2',
                    property: 'visible',
                    value: false
                  }
                ]
              }
            ],
            on: {
              onChange: (options) => {
                console.log(options)
                // form[options.name] = options.value
                // console.log(form)
                // 通知订阅
                // setdata([], options)
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
            console.log(options)
            form[options.name] = options.value
            console.log(form)
            // 通知订阅
            // setdata([], options)
          }
        }
      },
      {
        componentName: 'text',
        content: '买受人应当于'
      },
      {
        componentName: 'input',
        name: 'buyerMonth'
      },
      {
        componentName: 'text',
        content: '月'
      },
      {
        componentName: 'input',
        name: 'buyerDay'
      },
      {
        componentName: 'text',
        content: '日支付首期房款价'
      },
      {
        componentName: 'input',
        name: 'currency'
      },
      {
        componentName: 'text',
        content: '（币种）'
      },
      {
        componentName: 'input',
        name: 'payment'
      },
      {
        componentName: 'text',
        content: '元（大写'
      },
      {
        componentName: 'input',
        name: 'capitalizeMoney'
      },
      {
        componentName: 'text',
        content: '元整）'
      }
    ]

    function setdata(data, options) {
      console.log(options)

      let arr = replaceValueInNestedStructure(data, name, property, newValue)

      // key -> name-value -> fn
    }
    // 找到属性然后改掉
    function replaceValueInNestedStructure(data, name, property, newValue) {
      if (Array.isArray(data)) {
        // 如果是数组，递归处理每个元素
        data.forEach((item) => {
          replaceValueInNestedStructure(item, name, property, newValue)
        })
      } else if (typeof data === 'object' && data !== null) {
        // 如果是对象，并且满足指定的name属性值，才替换目标键的值
        if (data.hasOwnProperty('name') && data['name'] === name && data.hasOwnProperty(property)) {
          data[property] = newValue
        }
        // 无论是否找到匹配项，都继续递归搜索
        Object.keys(data).forEach((key) => {
          if (typeof data[key] === 'object') {
            replaceValueInNestedStructure(data[key], name, property, newValue)
          }
        })
      }
      return data
    }

    let component = arr.map((item) => {
      if (item.componentName === 'text') {
        return text(item.content, item.display)
      } else if (item.componentName === 'input') {
        return input(item.name, item.display)
      } else if (item.componentName === 'radio') {
      } else if (item.componentName === 'select') {
        return select(item)
      }
      if (item.componentName === 'block') {
        if (item.visible) {
          return display(item)
        }
        return
      }
    })

    function display(block) {
      return (
        <div>
          {block.children.map((item) => {
            if (item.componentName === 'text') {
              return text(item.content, item.display)
            } else if (item.componentName === 'input') {
              return input(item.name, item.display)
            } else if (item.componentName === 'radio') {
            } else if (item.componentName === 'select') {
              return select(item)
            }

            return null
          })}
        </div>
      )
    }

    let map = {
      clientList: [],
      listen: function (key, fn) {
        if (!this.clientList[key]) {
          this.clientList[key] = []
        }
        this.clientList[key].push(fn)
      },
      trigger: function (key) {
        for (const fn of this.clientList[key]) {
          fn()
        }
      }
    }

    function handleSubmit() {
      console.log(arr)
    }

    return () => (
      <div>
        <div>{component}</div>
        <button onClick={handleSubmit}>提交</button>
      </div>
    )
  }
})
