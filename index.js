const path = require('path')

module.exports = function gtag (moduleOptions) {
  if (this.options.dev && process.env.NODE_ENV !== 'production') return
  const runtimeConfig = this.options.publicRuntimeConfig

  const options = {
    ...this.options.gtag,
    ...moduleOptions,
    ...(runtimeConfig && runtimeConfig.gtag || {})
  }

  const gtagUrl = 'https://www.googletagmanager.com/gtag/js?id=' + options.id

  options.gtagUrl = gtagUrl

  this.options.head.link.push({
    href: gtagUrl,
    rel: 'preload',
    as: 'script'
  })

  this.addPlugin({ src: path.resolve(__dirname, 'plugin.js'), ssr: false, options })
}

module.exports.meta = require('./package.json')
