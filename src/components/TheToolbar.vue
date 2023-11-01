<template>
<Toolbar>
  <template #start>
    <Button
      class="mr-2"
      icon="pi pi-plus"
    />
    <Button
      class="mr-2"
      icon="pi pi-print"
    />
    <Button icon="pi pi-upload" />
  </template>

  <template #center>
    <span class="p-input-icon-left">
      <i class="pi pi-search" />
      <InputText placeholder="Search" />
    </span>
  </template>

  <template #end>
    <Button
      badge="8"
      label="Emails"
      type="button"
    />
  </template>
</Toolbar>
</template>

<script setup lang="ts">
import Toolbar from 'primevue/toolbar'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

</script>

<style scoped>

</style>
