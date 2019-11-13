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
import companyJSON from '~/content/data/company.json'

export default {
    head() {
        return {
            title: this.page.attributes.title || '',
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
                url = "https://edge-pro.netlify.com/",
                currentPage = url + params.pages,
                logoURL = url + companyJSON.company_logo
            
            return {
                page: singlePage,
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
                            "name": singlePage.attributes.title || "Did not work",
                            "description": singlePage.attributes.desc || "Did not work",
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
    }
}
</script>