<template>
    <div>
        <HeaderView />
        <div>
            <router-view></router-view>
        </div>
        <Footer />
    </div>
</template>
<script setup>
import HeaderView from '@/components/HeaderView.vue'
import Footer from '@/components/footer.vue';

</script>