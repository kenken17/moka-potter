<template>
  <section class="history-card">
    <div class="history-header">
      <h2 class="section-title">History</h2>
      <span class="history-count">{{ entries.length }}</span>
    </div>

    <ul v-if="entries.length > 0" class="entry-list">
      <li v-for="entry in entries" :key="entry.id" class="entry-item" @click="goToDetail(entry.id)">
        <div>
          <div class="entry-date">{{ entry.displayDate || entry.date }}</div>
          <div class="entry-title">
            {{ entry.beanName || 'Moka Brew' }}
            <span v-if="entry.cups && entry.cups.length" class="entry-cups">
              {{ entry.cups.length }} {{ entry.cups.length === 1 ? 'cup' : 'cups' }}
            </span>
          </div>
          <div class="entry-meta">
            <span>{{ entry.weight }}g dose</span>
            <span>{{ entry.water }}g water</span>
            <span v-if="entry.temp">{{ entry.temp }}&deg;C</span>
            <span v-if="entry.grindSize">{{ entry.grindSize }}</span>
          </div>
        </div>
        <div class="entry-actions">
          <button class="entry-delete" @click.stop="remove(entry.id)" title="Delete">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          <div class="entry-arrow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </div>
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
import { useRouter } from 'vue-router'
import { deleteBrew } from '../db.js'

const router = useRouter()

const props = defineProps({
  entries: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['deleted'])

function goToDetail(id) {
  router.push('/brew/' + id)
}

async function remove(id) {
  await deleteBrew(id)
  emit('deleted')
}
</script>
