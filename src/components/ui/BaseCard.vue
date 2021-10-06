<template>
    <div class="container card">
        <slot></slot>
    </div>
</template>

<style scoped>
.card {
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 1rem auto;
  background-color: white;
}
@media (max-width: 978px) {
  .card {
    padding: 0px;
  }
}
</style>