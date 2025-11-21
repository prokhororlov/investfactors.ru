<template>
  <iframe :src="src" :style="style" />
</template>

<script>
import unionProps from '../helpers/unionProps'

const formatSize = (value, preset) => {
  const intVal = parseInt(value, 10)
  const isMeasured = ['px', '%'].includes(`${value}`.replace(intVal, ''))

  if (intVal > 0 && isMeasured) return value
  if (intVal > 0) return `${intVal}px`
  return preset
}

export default {
  name: 'TradingViewShell',
  props: {
    width: unionProps.width,
    height: unionProps.height,
    frameUrl: String,
    options: Object,
    params: Object,
  },
  computed: {
    src() {
      const params = Object.keys(this.params || {}).length
        ? `?${new URLSearchParams(this.params)}`
        : ''

      const options = Object.keys(this.options || {}).length
        ? `#${encodeURI(JSON.stringify(this.options))}`
        : ''

      return `${this.frameUrl}${params}${options}`
    },
    style() {
      return {
        width: formatSize(this.width, '100%'),
        height: formatSize(this.height, '450px'),
        margin: '0!important',
        padding: '0!important',
        border: '0',
        boxShadow: '0 0 10px 10px #ededed',
        borderRadius: '3px',
      }
    },
  },
}
</script>
