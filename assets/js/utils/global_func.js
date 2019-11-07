const util = {

    getAllPages () {
        const resolve = await require.context(`~/content/pages/`, true, /\.md$/)

        const imports = resolve.keys().map((key) => {
          const [, name] = key.match(/\/(.+)\.md$/)
          return resolve(key)
        })

        return imports
    },
    getPage ( source ) {
        const resolve = await import(`~/content/products/${source}.md`);
        
        return resolve
    }
}

export default util