<template>
    <div id="app">
        <top-header></top-header>
        <router-view></router-view>
    </div>
</template>

<script>
import TopHeader from '@/components/common/Header.vue';
export default {
    components: {
        TopHeader
    }
};
</script>

<style>
body {
    margin: 0;
}

</style>
