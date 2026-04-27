<template>
  <div class="app">
    <header class="header detail-header">
      <button class="back-btn" @click="goBack">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      <h1 class="greeting">Brew <span>Detail</span></h1>
    </header>

    <section v-if="brew" class="detail-card">
      <div class="detail-date">{{ brew.displayDate || brew.date }}</div>
      <h2 class="detail-title">{{ brew.beanName || 'Moka Brew' }}</h2>

      <div class="detail-stats">
        <div class="detail-stat">
          <span class="detail-stat-value">{{ brew.weight }}g</span>
          <span class="detail-stat-label">Dose</span>
        </div>
        <div class="detail-stat">
          <span class="detail-stat-value">{{ brew.water }}g</span>
          <span class="detail-stat-label">Water</span>
        </div>
        <div class="detail-stat" v-if="brew.temp">
          <span class="detail-stat-value">{{ brew.temp }}&deg;C</span>
          <span class="detail-stat-label">Temp</span>
        </div>
        <div class="detail-stat" v-if="brew.grindSize">
          <span class="detail-stat-value">{{ brew.grindSize }}</span>
          <span class="detail-stat-label">Grind</span>
        </div>
      </div>
    </section>

    <section v-if="brew && brew.cups && brew.cups.length" class="cups-detail">
      <div class="cups-detail-header">
        <h3 class="section-title">Cups</h3>
        <span class="history-count">{{ brew.cups.length }}</span>
      </div>

      <div class="cup-detail-list">
        <div v-for="(cup, index) in brew.cups" :key="index" class="cup-detail-card">
          <div class="cup-detail-header">
            <span class="cup-number">Cup {{ index + 1 }}</span>
            <div v-if="cup.rating" class="cup-rating-display">
              <svg v-for="n in cup.rating" :key="n" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </div>
          </div>

          <div class="cup-detail-meta">
            <span v-if="cup.coffee && cup.coffee !== '0'">{{ cup.coffee }}ml coffee</span>
            <span v-if="cup.sugar && cup.sugar !== '0'">{{ cup.sugar }}g sugar</span>
            <span v-if="cup.milk && cup.milk !== '0'">{{ cup.milk }}ml milk</span>
            <span v-if="cup.frothed">Frothed</span>
          </div>

          <p v-if="cup.comments" class="cup-detail-comments">{{ cup.comments }}</p>
        </div>
      </div>
    </section>

    <div v-else-if="!loading" class="empty-state">
      <div>Brew not found.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getBrewById } from '../db.js'

const route = useRoute()
const router = useRouter()
const brew = ref(null)
const loading = ref(true)

onMounted(async () => {
  const id = route.params.id
  if (id) {
    brew.value = await getBrewById(id)
  }
  loading.value = false
})

function goBack() {
  router.push('/')
}
</script>
