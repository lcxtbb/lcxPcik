<template>
    <div class="header">
        <HeaderLeft />
        <HeaderRight />
    </div>
</template>

<script setup lang="ts">
import HeaderLeft from './header-left/HeaderLeft.vue';
import HeaderRight from './header-right/HeaderRight.vue';


</script>

<style lang="scss" scoped>
.header {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>