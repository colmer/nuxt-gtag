export default ({ app: { router }, $config }) => {
  const { gtagUrl, ...options } = <%= JSON.stringify(options) %>

  const { id, ...gtagOptions } = options

  let ready = false

  router.onReady(() => {
    ready = true
  })

  function create() {
    if (!ready) {
      ;(function () {
        const tag = document.createElement('script')
        tag.async = 1
        tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + id
        const firstScript = document.getElementsByTagName('script')[0]
        firstScript.parentNode.insertBefore(tag, firstScript)
      })()

      window.dataLayer = window.dataLayer || []
      window.gtag = function() {
        window.dataLayer.push(arguments)
      }
      window.gtag('js', new Date())

      window.gtag('config', id, gtagOptions)
    }
  }

  if (window.gtag === undefined) {
    create()
  }

}
