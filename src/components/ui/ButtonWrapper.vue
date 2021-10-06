<template>
    <div class="button-wrapper">
        <slot></slot>
    </div>
</template>

<style scoped>
.button-wrapper {
  border-radius: 5px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 26%);
  display: inline-block;
  background-color: white;
  padding: 0.3rem;
}

.button-wrapper:hover {
  color: blue;
  border: blue solid 1px;
  background:#fff;
}

.button-wrapper:hover > button,
.button-wrapper:hover > button > div{
  color: blue;
  background:#fff;
}
</style>