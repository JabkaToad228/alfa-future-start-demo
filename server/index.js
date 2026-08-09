const appBase = '/alfa-future-start-demo'

function assetRequest(request, pathname) {
  const url = new URL(request.url)
  url.pathname = pathname
  return new Request(url, request)
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.pathname === '/') {
      return Response.redirect(`${url.origin}${appBase}/`, 302)
    }

    if (url.pathname === appBase || url.pathname === `${appBase}/`) {
      return env.ASSETS.fetch(assetRequest(request, '/index.html'))
    }

    if (url.pathname.startsWith(`${appBase}/`)) {
      const assetPath = url.pathname.slice(appBase.length)
      const response = await env.ASSETS.fetch(assetRequest(request, assetPath))
      if (response.status !== 404) return response
      return env.ASSETS.fetch(assetRequest(request, '/index.html'))
    }

    return env.ASSETS.fetch(request)
  },
}
