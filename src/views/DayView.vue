<template>
  <div class="app" @touchstart="onTouchStart" @touchend="onTouchEnd">
    <header class="header detail-header">
      <button class="back-btn" @click="goBack">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      <h1 class="greeting">{{ dayDate }}<span>, {{ dayName }}</span></h1>
    </header>

    <section v-if="brews.length" class="day-brews">
      <div class="day-brews-header">
        <h2 class="section-title">{{ brews.length }} {{ brews.length === 1 ? 'Brew' : 'Brews' }}</h2>
      </div>

      <ul class="entry-list">
        <li v-for="brew in brews" :key="brew.id" class="entry-item" @click="goToBrew(brew.id)">
          <div>
            <div class="entry-title">
              <span class="entry-title-text">{{ brew.beanName || 'Moka Brew' }}</span>
              <span v-if="brew.cups && brew.cups.length" class="entry-cups">
                {{ brew.cups.length }} {{ brew.cups.length === 1 ? 'cup' : 'cups' }}
              </span>
            </div>
            <div class="entry-date" v-if="brew.time">{{ brew.time }}</div>
            <div class="entry-meta">
              <span>{{ brew.weight }}g dose</span>
              <span>{{ brew.water }}g water</span>
              <span v-if="brew.temp">{{ brew.temp }}&deg;C</span>
              <span v-if="brew.grindSize">{{ brew.grindSize }}</span>
            </div>
          </div>
          <div class="entry-arrow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </div>
        </li>
      </ul>
    </section>

    <div v-else class="empty-state">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 0.5rem; opacity: 0.4;"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
      <div>No brews on this day.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { format, parseISO } from 'date-fns'
import { getAllBrews } from '../db.js'

const route = useRoute()
const router = useRouter()
const brews = ref([])

const dayDate = computed(() => {
  const dateStr = route.params.date
  if (!dateStr) return ''
  try {
    return format(parseISO(dateStr), 'd MMM yyyy')
  } catch {
    return dateStr
  }
})

const dayName = computed(() => {
  const dateStr = route.params.date
  if (!dateStr) return ''
  try {
    return format(parseISO(dateStr), 'EEE')
  } catch {
    return ''
  }
})

onMounted(async () => {
  const dateStr = route.params.date
  if (!dateStr) return
  const all = await getAllBrews()
  brews.value = all.filter(b => b.date === dateStr)
})

let touchStartX = 0
let touchStartY = 0

function onTouchStart(e) {
  touchStartX = e.changedTouches[0].screenX
  touchStartY = e.changedTouches[0].screenY
}

function onTouchEnd(e) {
  const endX = e.changedTouches[0].screenX
  const endY = e.changedTouches[0].screenY
  const diffX = endX - touchStartX
  const diffY = endY - touchStartY
  if (diffX > 80 && Math.abs(diffY) < 60) {
    router.back()
  }
}

function goBack() {
  router.back()
}

function goToBrew(id) {
  router.push('/brew/' + id)
}
</script>
