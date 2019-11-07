<template>
    
</template>

<script>
import util from '~/assets/js/utils/global_func'

export default {
    async asyncData ({ params }) {
        try {
            let singlePage = util.getPage( params.slug )
            return {
                page: singlePage
            }
        } catch (err) {
            console.error(err)
            return false
        }
    }
}
</script>