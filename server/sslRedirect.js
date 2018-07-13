export default function (req, res, next) {
  const isGraphQL = false;
  // const isGraphQL = req.url.includes('graphql');
  if (!isGraphQL && process.env.NODE_ENV === 'production' &&
    (!req.secure || req.headers['x-forwarded-proto'] !== 'https')) {
    const sslUrl = ['https://', req.hostname, req.url].join('');
    return res.redirect(sslUrl);
  }

  return next();
}
