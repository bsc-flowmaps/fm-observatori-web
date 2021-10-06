<template>
  <button>
    <div id="calendar__summary__section" @click="toggleCalendarVisibility">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-calendar-week" viewBox="0 0 16 16"><path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/><path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/></svg>
      {{ dash_for_slash(start_date) }} - {{ dash_for_slash(end_date) }}
    </div>
    <div v-show="showCalendar" class="calendar__detail">
      <v-date-picker is-range
                     :value="date_range"
                     @input="changeSelectedDates"
                     :min-date="min_date"
                     :max-date="max_date"
                     :columns="$screens({ default: 1, md: 2, xl: 3 })"
      ></v-date-picker>
    </div>
  </button>
</template>
                     <!-- :popover="{ placement: $screens({ default: 'bottom', md: 'left-start' }) }" -->

<script>
export default {
  emits: ['change_dates'],
  props: ['start_date', 'end_date', 'min_date', 'max_date'],
  data() {
    return {
      showCalendar: false,
    };     
  },
  computed: {
    date_range() {
      return {
        start: this.start_date,
        end: this.end_date,
      }
    }
  },
  methods: {
    dash_for_slash(date) {
      let string_date = date;
      if (date instanceof Date) {
        string_date = date.toISOString().split('T')[0];
      }
      return string_date.replace(/-/g, '/')
    },
    toggleCalendarVisibility() {
      this.showCalendar = !this.showCalendar;
    },
    changeSelectedDates(date_range) {
      const start_date = date_range.start.toISOString().split('T')[0];
      const end_date = date_range.end.toISOString().split('T')[0];
      this.toggleCalendarVisibility();
      this.$emit('change_dates', {start_date, end_date});
    }
  },
}
</script>

<style scoped>
button {
  padding: 0.3rem;
  border: none;
  background: none;
}
.calendar__detail {
  margin-top: 0.5rem;
  position: absolute;
  right: 10px;
  z-index: 999;
}
</style>