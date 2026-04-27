<template>
  <div class="app">
    <header class="header">
      <h1 class="greeting">Good <span>{{ greeting }}</span></h1>
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
          <span class="hero-stat-value">{{ totalBrews }}</span>
          <span class="hero-stat-label">Total Brews</span>
        </div>
        <div class="hero-stat">
          <span class="hero-stat-value">{{ todayBrews }}</span>
          <span class="hero-stat-label">Today</span>
        </div>
      </div>
      <div class="hero-bar">
        <div class="hero-bar-fill" :style="{ width: progressPercent + '%' }"></div>
      </div>
    </section>

    <section class="inputs-card">
      <h2 class="section-title">New Brew</h2>
      <div class="inputs">
        <div class="input-row">
          <div class="input-group">
            <label for="water">Water (g)</label>
            <input type="number" id="water" v-model="form.water" min="0" step="1" placeholder="0" />
          </div>

          <div class="input-group">
            <label for="temp">Temp (&deg;C)</label>
            <input type="number" id="temp" v-model="form.temp" min="0" max="100" step="1" placeholder="92" />
          </div>
        </div>

        <div class="input-row row-bean">
          <div class="input-group">
            <label for="beanName">Bean</label>
            <input type="text" id="beanName" v-model="form.beanName" placeholder="e.g. Ethiopia Yirgacheffe" />
          </div>

          <div class="input-group">
            <label for="weight">Weight (g)</label>
            <input type="number" id="weight" v-model="form.weight" min="0" step="0.1" placeholder="0.0" />
          </div>
        </div>

        <div class="input-row full-width">
          <div class="input-group">
            <label for="grindSize">Grind Size</label>
            <select id="grindSize" v-model="form.grindSize">
              <option value="" disabled>Select grind</option>
              <option value="Coarse">Coarse</option>
              <option value="Medium Coarse">Medium Coarse</option>
              <option value="Medium">Medium</option>
              <option value="Medium Fine">Medium Fine</option>
              <option value="Fine">Fine</option>
              <option value="Extra Fine (Espresso)">Extra Fine (Espresso)</option>
            </select>
          </div>
        </div>

        <div class="cups-section">
          <div class="cups-header">
            <h3 class="cups-title">Cups</h3>
            <button type="button" class="add-cup-btn" @click="addCup" title="Add cup">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
          </div>

          <div class="cup-list">
            <div v-for="(cup, index) in form.cups" :key="index" class="cup-card">
              <div class="cup-card-header">
                <span class="cup-number">Cup {{ index + 1 }}</span>
                <button v-if="form.cups.length > 1" type="button" class="cup-remove" @click="removeCup(index)" title="Remove cup">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
              <div class="cup-fields">
                <div class="input-group">
                  <label :for="'coffee-' + index">Coffee (ml)</label>
                  <input type="number" :id="'coffee-' + index" v-model="cup.coffee" min="0" step="1" placeholder="0" />
                </div>
                <div class="input-group">
                  <label :for="'sugar-' + index">Sugar (g)</label>
                  <input type="number" :id="'sugar-' + index" v-model="cup.sugar" min="0" step="0.5" placeholder="0" />
                </div>
                <div class="input-group">
                  <label :for="'milk-' + index">Milk (ml)</label>
                  <input type="number" :id="'milk-' + index" v-model="cup.milk" min="0" step="1" placeholder="0" />
                </div>
                <div class="input-group checkbox-inline">
                  <div class="checkbox-row">
                    <input type="checkbox" :id="'frothed-' + index" v-model="cup.frothed" />
                    <label :for="'frothed-' + index">Frothed</label>
                  </div>
                </div>
              </div>

              <div class="cup-rating">
                <label>Rating</label>
                <div class="rating-hearts">
                  <button
                    v-for="n in 10"
                    :key="n"
                    type="button"
                    class="rating-heart"
                    :class="{ active: n <= cup.rating }"
                    @click="cup.rating = n"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" :fill="n <= cup.rating ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                  </button>
                </div>
              </div>

              <div class="input-group cup-comments">
                <label :for="'comments-' + index">Comments</label>
                <textarea
                  :id="'comments-' + index"
                  v-model="cup.comments"
                  rows="3"
                  placeholder="Notes on this cup..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <button @click="saveEntry" class="save-btn" :disabled="saving">
          <svg v-if="!saving" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          <span v-else class="spinner"></span>
          {{ saving ? 'Saving...' : 'Save Entry' }}
        </button>
      </div>
    </section>

    <History :entries="entries" @deleted="loadEntries" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import History from '../components/History.vue'
import { addBrew, getAllBrews } from '../db.js'

const today = ref('')
const greeting = ref('morning')
const form = ref({
  beanName: '',
  weight: '',
  water: '',
  temp: '',
  grindSize: '',
  cups: [{ coffee: '', sugar: '', milk: '', frothed: false, rating: 0, comments: '' }]
})
const entries = ref([])
const saving = ref(false)

const totalBrews = computed(() => entries.value.length)

const todayStr = ref('')
const todayBrews = computed(() => {
  return entries.value.filter(e => e.date === todayStr.value).length
})

const progressPercent = computed(() => {
  return Math.min((todayBrews.value / 5) * 100, 100)
})

function pad(n) {
  return n < 10 ? '0' + n : n
}

function addCup() {
  form.value.cups.push({ coffee: '', sugar: '', milk: '', frothed: false, rating: 0, comments: '' })
}

function removeCup(index) {
  if (form.value.cups.length > 1) {
    form.value.cups.splice(index, 1)
  }
}

onMounted(() => {
  const now = new Date()
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  today.value = `${now.getDate()} ${months[now.getMonth()]}, ${days[now.getDay()]}`
  todayStr.value = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
  const hour = now.getHours()
  if (hour >= 5 && hour < 12) greeting.value = 'morning'
  else if (hour >= 12 && hour < 17) greeting.value = 'afternoon'
  else if (hour >= 17 && hour < 24) greeting.value = 'evening'
  else greeting.value = 'night'
  loadEntries()
})

async function loadEntries() {
  entries.value = await getAllBrews()
}

async function saveEntry() {
  if (!form.value.weight && !form.value.water) return
  saving.value = true
  try {
    await addBrew({
      date: todayStr.value,
      displayDate: today.value,
      beanName: form.value.beanName || 'Moka Brew',
      weight: form.value.weight || '0',
      water: form.value.water || '0',
      temp: form.value.temp || '',
      grindSize: form.value.grindSize || 'Medium',
      cups: form.value.cups.map(c => ({
        coffee: c.coffee || '0',
        sugar: c.sugar || '0',
        milk: c.milk || '0',
        frothed: c.frothed,
        rating: c.rating || 0,
        comments: c.comments || ''
      }))
    })
    form.value = {
      beanName: '',
      weight: '',
      water: '',
      temp: '',
      grindSize: '',
      cups: [{ coffee: '', sugar: '', milk: '', frothed: false, rating: 0, comments: '' }]
    }
    await loadEntries()
  } finally {
    saving.value = false
  }
}
</script>
