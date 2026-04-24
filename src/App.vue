<template>
  <div class="app">
    <header class="header">
      <h1 class="greeting">
        Good<br /><span>morning</span>
      </h1>
      <div class="date-badge">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
        {{ today }}
      </div>
    </header>

    <section class="hero-card">
      <p class="hero-label">Today's Brew</p>
      <h2 class="hero-title">Brew Progress</h2>
      <div class="hero-stats">
        <div class="hero-stat">
          <span class="hero-stat-value">3</span>
          <span class="hero-stat-label">Cups</span>
        </div>
        <div class="hero-stat">
          <span class="hero-stat-value">2</span>
          <span class="hero-stat-label">Recipes</span>
        </div>
      </div>
      <div class="hero-bar">
        <div class="hero-bar-fill"></div>
      </div>
    </section>

    <section class="inputs-card">
      <h2 class="section-title">New Entry</h2>
      <div class="inputs">
        <div class="input-group">
          <label for="beans">Beans (g)</label>
          <input type="number" id="beans" v-model="form.beans" min="0" step="0.1" placeholder="0.0" />
        </div>

        <div class="input-group">
          <label for="milk">Milk (ml)</label>
          <input type="number" id="milk" v-model="form.milk" min="0" step="1" placeholder="0" />
        </div>

        <div class="input-group">
          <label for="water">Water (g)</label>
          <input type="number" id="water" v-model="form.water" min="0" step="1" placeholder="0" />
        </div>

        <div class="input-group">
          <label for="temp">Water Temp (°C)</label>
          <input type="number" id="temp" v-model="form.temp" min="0" max="100" step="1" placeholder="92" />
        </div>

        <button @click="saveEntry" class="save-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Save Entry
        </button>
      </div>
    </section>

    <History />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import History from './components/History.vue'

const today = ref('')
const form = ref({
  beans: '',
  milk: '',
  water: '',
  temp: ''
})

function pad(n) {
  return n < 10 ? '0' + n : n
}

onMounted(() => {
  const now = new Date()
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  today.value = `${now.getDate()} ${months[now.getMonth()]}, ${days[now.getDay()]}`
})

function saveEntry() {
  console.log('Saving entry:', { ...form.value, date: today.value })
  // Reset form after save
  form.value = { beans: '', milk: '', water: '', temp: '' }
}
</script>
