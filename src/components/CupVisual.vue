<template>
  <div class="cup-visual">
    <svg viewBox="0 0 140 120" class="cup-svg">
      <defs>
        <clipPath id="cup-interior">
          <path d="M35 25 L37 90 Q37 100 70 100 Q103 100 103 90 L105 25 Z" />
        </clipPath>
      </defs>

      <!-- Liquid layers (clipped to cup interior) -->
      <g clip-path="url(#cup-interior)">
        <!-- Coffee layer -->
        <rect
          v-if="coffeeHeight > 0"
          :x="35"
          :y="100 - coffeeHeight"
          :width="70"
          :height="coffeeHeight"
          fill="#3C2A1E"
        />
        <!-- Milk layer -->
        <rect
          v-if="milkHeight > 0"
          :x="35"
          :y="100 - coffeeHeight - milkHeight"
          :width="70"
          :height="milkHeight"
          fill="#F5E6D3"
        />
        <!-- Foam layer -->
        <rect
          v-if="foamHeight > 0"
          :x="35"
          :y="100 - coffeeHeight - milkHeight - foamHeight"
          :width="70"
          :height="foamHeight"
          fill="#FFF5E6"
        />
      </g>

      <!-- Sugar layer (at the bottom) -->
      <g clip-path="url(#cup-interior)">
        <rect
          v-if="sugarHeight > 0"
          :x="35"
          :y="100 - sugarHeight"
          :width="70"
          :height="sugarHeight"
          fill="#C5E8F7"
        />
      </g>

      <!-- Cup body outline -->
      <path
        d="M35 25 L37 90 Q37 100 70 100 Q103 100 103 90 L105 25"
        fill="none"
        stroke="#0a0a0a"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <!-- Cup rim -->
      <ellipse cx="70" cy="25" rx="35" ry="4" fill="#fff" stroke="#0a0a0a" stroke-width="2.5" />
    </svg>

    <!-- Legend below cup -->
    <div class="cup-legend">
      <span v-if="coffee > 0" class="legend-item">
        <span class="legend-dot" style="background: #3C2A1E"></span>{{ coffee }}ml
      </span>
      <span v-if="milk > 0" class="legend-item">
        <span class="legend-dot" style="background: #F5E6D3; border: 1px solid rgba(0,0,0,0.1)"></span>{{ milk }}ml
      </span>
      <span v-if="sugar > 0" class="legend-item">
        <span class="legend-dot" style="background: #C5E8F7; border: 1px solid rgba(0,0,0,0.1)"></span>{{ sugar }}g
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  coffee: { type: Number, default: 0 },
  milk: { type: Number, default: 0 },
  sugar: { type: Number, default: 0 },
  frothed: { type: Boolean, default: false }
})

const total = computed(() => props.coffee + props.milk)
const maxLiquid = 70

const sugarHeight = computed(() => {
  if (props.sugar <= 0) return 0
  return Math.min(props.sugar * 1.2, 18)
})

const coffeeHeight = computed(() => {
  if (total.value === 0) return 0
  return (props.coffee / total.value) * Math.min(total.value, 200) / 200 * maxLiquid
})

const milkHeight = computed(() => {
  if (total.value === 0) return 0
  return (props.milk / total.value) * Math.min(total.value, 200) / 200 * maxLiquid
})

const foamHeight = computed(() => {
  return props.frothed && total.value > 0 ? 8 : 0
})
</script>

<style scoped>
.cup-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.cup-svg {
  width: 100px;
  height: 86px;
}

.cup-legend {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 2px;
}
</style>
