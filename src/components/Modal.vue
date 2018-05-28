<template>
  <div>
    <button @click="$emit('close-modal')">Close Me</button>
    <slot />
  </div>
</template>