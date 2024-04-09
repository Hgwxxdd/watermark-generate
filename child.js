export const str = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>子页面</title>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  </head>

  <body>
    <div id="app">
      <custom-select :options="options" :default-value="'option2'"></custom-select>
    </div>

    <button id="sendMessage">提交</button>

    <script>

     const { createApp, ref, watch } = Vue;

    const app = createApp({
      data() {
        return {
          options: [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' }
          ]
        };
      }
    })

    app.component('custom-select', {
      template:\`
        <select @change="handleChange" v-model="selectedValue" :disabled="disabled">
          <option v-for="option in options" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      \`,
      props: {
        defaultValue: {
          type: String,
          default: ''
        },
        disabled: {
          type: Boolean,
          default: false
        },
        options: {
          type: Array,
          default: () => []
        },
        name: {
          type: String
        }
      },
      setup(props, { emit }) {
        const selectedValue = ref(props.defaultValue);

        const handleChange = (event) => {
          emitData(event.target.value);
        }

        function emitData(value) {
          const selectedOption = props.options.find((option) => option.value === value);
          emit('change', { ...selectedOption, name: props.name });
        }

        watch(
          () => props.defaultValue,
          (newValue) => {
            selectedValue.value = newValue;
            emitData(newValue);
          },
          { immediate: true }
        );

        return { selectedValue, handleChange };
      }
    });

    app.mount("#app");

      const button = document.getElementById('sendMessage')

      // 点击按钮时向父页面发送消息
      button.addEventListener('click', () => {
        const message = 'Hello from child!'
        window.parent.postMessage(message, '*')
      })

      // 接收来自父页面的消息
      window.addEventListener('message', (event) => {
        console.log(event.data)
      })

    </script>
  </body>
</html>`
