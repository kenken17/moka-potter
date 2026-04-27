<template>
  <section class="history-card">
    <div class="history-header">
      <h2 class="section-title">History</h2>
      <span class="history-count">{{ entries.length }}</span>
    </div>

    <!-- Calendar -->
    <div class="calendar">
      <div class="calendar-header">
        <button class="calendar-nav" @click="prevMonth">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <span class="calendar-month">{{ monthLabel }}</span>
        <button class="calendar-nav" @click="nextMonth">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>

      <div class="calendar-weekdays">
        <span v-for="d in weekdays" :key="d">{{ d }}</span>
      </div>

      <div class="calendar-days">
        <button
          v-for="day in days"
          :key="day.key"
          class="calendar-day"
          :class="{
            'other-month': !day.isCurrentMonth,
            'today': day.isToday,
            'has-brew': day.hasBrew
          }"
          @click="goToDay(day.dateStr)"
        >
          <span class="day-number">{{ day.number }}</span>
          <span v-if="day.hasBrew" class="day-dot"></span>
        </button>
      </div>
    </div>

    <!-- Recent Brews -->
    <div class="recent-brews" v-if="entries.length">
      <h3 class="recent-title">Recent</h3>
      <ul class="entry-list">
        <li v-for="entry in recentEntries" :key="entry.id" class="entry-item" @click="goToDetail(entry.id)">
          <div>
            <div class="entry-date">{{ entry.displayDate || entry.date }} <span v-if="entry.time" class="entry-time">{{ entry.time }}</span></div>
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
          <div class="entry-arrow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  parseISO
} from 'date-fns'

const router = useRouter()

const props = defineProps({
  entries: {
    type: Array,
    default: () => []
  }
})

const currentMonth = ref(new Date())
const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const monthLabel = computed(() => {
  return format(currentMonth.value, 'MMMM yyyy')
})

const brewDates = computed(() => {
  const set = new Set()
  props.entries.forEach(e => {
    if (e.date) set.add(e.date)
  })
  return set
})

const days = computed(() => {
  const start = startOfWeek(startOfMonth(currentMonth.value))
  const end = endOfWeek(endOfMonth(currentMonth.value))
  const allDays = eachDayOfInterval({ start, end })

  return allDays.map(d => {
    const dateStr = format(d, 'yyyy-MM-dd')
    return {
      key: dateStr,
      number: format(d, 'd'),
      dateStr,
      isCurrentMonth: isSameMonth(d, currentMonth.value),
      isToday: isSameDay(d, new Date()),
      hasBrew: brewDates.value.has(dateStr)
    }
  })
})

const recentEntries = computed(() => {
  return props.entries.slice(0, 5)
})

function prevMonth() {
  currentMonth.value = subMonths(currentMonth.value, 1)
}

function nextMonth() {
  currentMonth.value = addMonths(currentMonth.value, 1)
}

function goToDay(dateStr) {
  router.push('/day/' + dateStr)
}

function goToDetail(id) {
  router.push('/brew/' + id)
}
</script>
