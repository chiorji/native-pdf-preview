var Fetcher = (function() {
    async function getBlob(url) {
      return await fetch(url).then(function(data) {
           if (data.ok) return data.blob()
           Promise.reject(Object.assign({}, data, {
               message: data.message
           }))
        })
  }
    
    function displayToPage(elemId, blob) {
        const iframe = document.querySelector(`#${elemId}`)
        const objUrl = URL.createObjectURL(blob)
        iframe.setAttribute('src', objUrl)
        URL.revokeObjectURL(objUrl)
    }

    async function fetchFile() {
        try {
            const file = await getBlob('http://localhost:4000/file/doc1')
            displayToPage('preview', file)
        } catch (error) {
            throw new Error('Cannot fetch resource')
        }
    }

    return {
        fetchFile
    }
}())