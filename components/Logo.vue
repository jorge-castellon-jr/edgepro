<template>
  <div class="VueToNuxtLogo">
    <img :src="company.company_logo" :alt="`${company.company_name} Logo`" />
  </div>
</template>

<script>
import companyJSON from '~/content/data/company.json'

export default {
  data () {
    return {
      company: companyJSON
    }
  }
}
</script>
