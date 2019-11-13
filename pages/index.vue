<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        edgepro
      </h1>
      <h2 class="subtitle">
        My mathematical Nuxt.js project
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >
          GitHub
        </a>
        <p v-for="page in pages" :key="page.attributes.title"><a :href="`/${util.formatSlug(page.attributes.title)}`">{{ page.attributes.title }}</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import util from '~/assets/js/utils/global_func'
import companyJSON from '~/content/data/company.json'

export default {
  head () {
    return {
      title: 'home',
      __dangerouslyDisableSanitizers: ['script'],
      script: [{ innerHTML: JSON.stringify(this.structuredData), type: 'application/ld+json' }]
    }
  },
  async asyncData () {
    let url = "https://edge-pro.netlify.com",
        logoURL = url + companyJSON.company_logo

    return {
      pages: await util.getAllPages(),
      headTitle: "Title placed here",
      headDesc: "Description goes here and blah blah blah blah blah blah",
      util: util,
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
            "@type": "WebSite",
            "@id": url,
            "url": url,
            "name": this.headTitle,
            "description": this.headDesc
          },
          {
            "@type": "WebPage",
            "url": url,
            "isPartOf": {
              "@id": url,
              "name": companyJSON.company_name || ''
            }
          }
        ]
      },
    }
  },
  components: {
    Logo
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
