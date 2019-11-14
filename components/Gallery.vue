<template>
    <b-row>
        <b-col cols="6" v-for="img in block.gallery" :key="img">
            <b-img-lazy :src="img" alt="" />
        </b-col>
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
.row {
    max-width: 750px;
    margin: 0 auto;
}
img {
    max-width: 100%;
    padding: 15px 0;
}
</style>