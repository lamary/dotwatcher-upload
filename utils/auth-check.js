import nextCookie from 'next-cookies'

const auth = ctx => {
  const { membership } = nextCookie(ctx)

  /*
   * If `ctx.req` is available it means we are on the server.
   * Additionally if there's no token it means the user is not logged in.
   */
  if (ctx.req && !membership) {
    ctx.res.writeHead(302, { Location: '/' })
    ctx.res.end()
  }

  // We already checked for server. This should only happen on client.
  if (!membership) {
    Router.push('/')
  }

  return membership
}

export default auth
