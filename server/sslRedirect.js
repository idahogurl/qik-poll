export default function (req, res, next) {
  if (process.env.NODE_ENV === 'production' && req.url !== '/graphql' && !req.secure) {
    const sslUrl = `https://${req.hostname}${req.url}`;
    console.log('redirect');
    return res.redirect(301, sslUrl);
  }

  return next();
}
