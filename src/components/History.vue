<template>
  <section class="history-card">
    <div class="history-header">
      <h2 class="section-title">History</h2>
      <span class="history-count">{{ entries.length }}</span>
    </div>

    <ul v-if="entries.length > 0" class="entry-list">
      <li v-for="entry in entries" :key="entry.date" class="entry-item">
        <div>
          <div class="entry-date">{{ entry.date }}</div>
          <div class="entry-title">Moka Brew</div>
          <div class="entry-meta">
            <span>{{ entry.beans }}g beans</span>
            <span>{{ entry.milk }}ml milk</span>
            <span>{{ entry.water }}g water</span>
            <span>{{ entry.temp }}°C</span>
          </div>
        </div>
        <div class="entry-arrow">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </div>
      </li>
    </ul>

    <div v-else class="empty-state">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 0.5rem; opacity: 0.4;"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
      <div>No brews yet.</div>
      <div style="font-size: 0.8rem; margin-top: 0.25rem; opacity: 0.7;">Your first cup is waiting.</div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const entries = ref([
  // Demo entries for visual reference – remove in production
  {
    date: '23 Apr, Wed',
    beans: '18.5',
    milk: '120',
    water: '250',
    temp: '92'
  },
  {
    date: '22 Apr, Tue',
    beans: '20.0',
    milk: '0',
    water: '280',
    temp: '94'
  }
])
</script>
