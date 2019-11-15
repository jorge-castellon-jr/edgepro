<template>
    <b-row class="th__row">
        <navbar :json="company" :pages="pages" />
        <b-row>
            <b-col>
                <h1 class="title">{{ page.title }}</h1>
                <div v-for="block in page.blocks" :key="block.template" class="th__block">
                    <!-- {{ block }} -->
                    <Columns v-if="block.template === '50-50'" :block="block" />
                    <Gallery v-else-if="block.template === 'gallery'" :block="block" />
                    <Generic v-else-if="block.template === 'content'" :block="block" />
                    <Cards v-else-if="block.template === 'cards'" :block="block" />
                </div>
            </b-col>
        </b-row>
        <footerbar :pages="pages" />
    </b-row>
</template>

<script>
import util from '~/assets/js/utils/global_func'
import companyJSON from '~/content/data/company.json'
import navbar from '~/components/navbar.vue'
import footerbar from '~/components/footerbar.vue'
import Generic from '~/components/Generic.vue'
import Columns from '~/components/Columns.vue'
import Gallery from '~/components/Gallery.vue'
import Cards from '~/components/Cards.vue'

export default {
    head() {
        return {
            title: this.page.title || '',
            meta: [
                { hid: 'description', name: 'description', content: this.page.description || '' }
            ],
            __dangerouslyDisableSanitizers: ['script'],
            script: [{ innerHTML: JSON.stringify(this.structuredData), type: 'application/ld+json' }]
        }
    },
    async asyncData ({ params }) {
        try {
            let singlePage = await util.getPage( 'pages/' + params.pages ),
                pages = await util.getAllPages(),
                url = "https://edge-pro.netlify.com/",
                currentPage = url + params.pages,
                logoURL = url + companyJSON.company_logo
                
            return {
                page: singlePage.default.attributes,
                pages: pages,
                company: companyJSON,
                structuredData: {
                    "@context": "http://schema.org",
                    "@graph": [
                        {
                            "@type": "Organization",
                            "name": companyJSON.company_name || '',
                            "address": {
                            "@type": "PostalAddress",
                            "addressLocality": companyJSON.company_city || '',
                            "addressRegion": companyJSON.state || '',
                            "postalCode": companyJSON.company_zip || '',
                            "streetAddress": companyJSON.company_address || '',
                            },
                            "url": url,
                            "logo": logoURL,
                            "contactPoint": {
                                "@type": "ContactPoint",
                                "telephone": "+1-916-582-2335",
                                "contactType": "Customer service"
                            },
                        },
                        {
                            "@type": "WebPage",
                            "url": currentPage,
                            "name": singlePage.default.attributes.title || "Did not work",
                            "description": singlePage.default.attributes.description || "Did not work",
                            "isPartOf": {
                                "@type": "WebSite",
                                "@id": url,
                            }
                        }
                    ]
                },
            }
        } catch (err) {
            console.error(err)
            return false
        }
    },
    components: {
        navbar,
        footerbar,
        Columns,
        Generic,
        Gallery,
        Cards,
    }
}
</script>

<style lang="scss" scoped>
.th {
    &__row {
        flex-direction: column;
        
        .title {
            font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
                'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            display: block;
            font-weight: 300;
            font-size: 100px;
            color: #35495e;
            letter-spacing: 1px;
            text-align: center;
        }
    }

    &__block {
        margin: 75px auto;
        padding: 50px 0;
    }
}
</style>