<template>
  <nav class="navbar">
    <div class="navbar-content">
      <Logo />
      <InstallButton variant="outline" class="nav-button">
        Install Now
      </InstallButton>
    </div>
  </nav>
</template>

<script setup lang="ts">
import InstallButton from './InstallButton.vue';
import Logo from './Logo.vue';
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: var(--navbar-bg);
  border-bottom: 1px solid var(--color-border);
  padding: 12px 24px;
  box-shadow: var(--shadow-sm);
}

.navbar-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-button {
  font-size: 14px;
  padding: 8px 24px;
  height: 36px;
  border-radius: 4px;
  font-weight: 500;
}

@media (max-width: 768px) {
  .navbar {
    padding: 12px 16px;
  }
}
</style>
