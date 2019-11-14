<template>
    <b-row>
        <!-- {{ block }} -->
        <b-col class="th__left" v-if="block.image_left_">
            <img :src="block.left_image" alt="">
        </b-col>
        <b-col class="th__left" v-else v-html="block.left_content"></b-col>

        <b-col class="th__right" v-if="block.image_right_">
            <img :src="block.right_image" alt="">
        </b-col>
        <b-col class="th__right" v-else v-html="block.right_content"></b-col>
    </b-row>
</template>

<script>
export default {
    props: {
        block: Object
    }
}
</script>

<style lang="scss" scoped>
img {
    max-width: 100%;
    margin-bottom: 15px;
}
.row {
    max-width: 750px;
    margin: 0 auto;
}
</style>