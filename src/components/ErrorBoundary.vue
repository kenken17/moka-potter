<template>
  <div v-if="error" class="error">
    <h2>Error in {{ errorComponent }}</h2>
    <p>{{ error }}</p>
  </div>
  <slot v-else />
</template>

<script setup>
import { ref, onErrorCaptured } from 'vue'
const error = ref(null)
const errorComponent = ref('')

onErrorCaptured((err, instance, info) => {
  error.value = err
  errorComponent.value = info
  return false
})
</script>

<style scoped>
.error {
  padding: 1rem;
  background: #fee;
  border: 1px solid #fcc;
  border-radius: 4px;
}
</style>