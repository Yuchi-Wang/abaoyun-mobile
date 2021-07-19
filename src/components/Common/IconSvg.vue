<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'Icon-svg',
  props: {
    iconClass: {
      type: String,
      required: true
    }
  },
  computed: {
    iconName() {
      return `#${this.iconClass}`
    }
  }
}
</script>

<style>
.svg-icon {
  width: 1rem;
  height: 1rem;
  font-size: 1rem;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  color:#d8d8d8;
}
</style>
