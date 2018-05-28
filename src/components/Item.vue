<template>
  <li class="news-item">
      <a :href="item.url">{{ item.title }}</a>
      {{ item.by }} {{ item.url }} {{ item.score }}
  </li>
</template>
<script>
export default {
  props: ['item']
}
</script>