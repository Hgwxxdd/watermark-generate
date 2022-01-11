<template>
  <draggable :list="list" item-key="id" group="row">
    <template #item="{ element }">
      <div class="card-item">
        <draggable :list="element.children" item-key="id" group="col">
          <template #item="{ element }">
            <div>
              <div v-if="element.type === 'text'">
                <p>{{ element.value }}</p>
              </div>
              <div v-if="element.type === 'input'">
                <input type="text" />
              </div>
            </div>
          </template>
        </draggable>
      </div>
    </template>
  </draggable>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import draggable from 'vuedraggable'

const props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.card-item {
  border: 1px dashed #292;

  margin: 10px 0;
  min-height: 30px;
}
</style>
