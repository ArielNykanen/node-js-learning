exports.getMainPage = (req, res, next) => {
  res.render('shop/index', {pageTitle: 'Marker', path: '/shop'});
}