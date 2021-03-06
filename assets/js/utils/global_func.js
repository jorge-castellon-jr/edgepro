const util = {

    getAllPages () {
        const resolve = require.context(`~/content/pages/`, true, /\.md$/)

        const imports = resolve.keys().map((key) => {
            return resolve(key)
        })

        return imports
    },
    getPage ( source ) {
        const resolve = import(`~/content/${source}.md`);

        return resolve
    },
    formatSlug(title) {
        const regex = / /gi;
        return title.toLowerCase().trim().replace(regex, "-")
    }
}

export default util