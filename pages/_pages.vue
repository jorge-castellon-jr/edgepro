<template>
    <b-container>
        <b-row>
            <b-col>
                <h1>{{ page.attributes.title }}</h1>
            </b-col>
            <b-col v-html="page.html">
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import util from '~/assets/js/utils/global_func'

export default {
    head() {
        return {
            title: this.title,
            meta: [
                { hid: 'description', name: 'description', content: this.page.attributes.description || '' }
            ],
            __dangerouslyDisableSanitizers: ['script'],
            script: [{ innerHTML: JSON.stringify(this.structuredData), type: 'application/ld+json' }]
        }
    },
    async asyncData ({ params }) {
        try {
            let singlePage = await util.getPage( 'pages/' + params.pages ),
                url = "https://edge-pro.netlify.com/" + params.pages
            console.log(url)
            return {
                page: singlePage,
                structuredData: {
                    "@context": "http://schema.org",
                    "@type": "Organization",
                    "url": url,
                    "contactPoint": {
                        "@type": "ContactPoint",
                        "telephone": "+1-916-582-2335",
                        "contactType": "Customer service"
                    }
                },
            }
        } catch (err) {
            console.error(err)
            return false
        }
    }
}
</script>