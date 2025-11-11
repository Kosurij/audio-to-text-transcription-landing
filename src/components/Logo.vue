<template>
  <div class="logo" :class="{ 'logo-compact': compact }">
    <img :src="logoImage" alt="Audio To Text" class="logo-image" />
  </div>
</template>

<script setup lang="ts">
import logoImage from '../../assets/logo.png?url';

interface Props {
  compact?: boolean;
}

withDefaults(defineProps<Props>(), {
  compact: false,
});
</script>

<style scoped>
.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo-image {
  height: 32px;
  width: auto;
  display: block;
}

.logo-compact .logo-image {
  height: 40px;
}
</style>

