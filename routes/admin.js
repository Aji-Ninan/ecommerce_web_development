var express = require('express');
const { render } = require('../app');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
const verifyLogin = (req, res, next) => {
  if (req.session.admin.loggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
};
//var productHelpers = require('../helpers/product-helpers');
/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelpers.getAllProducts().then((products) =>{
    res.render('admin/view-products', {admin: true, products});
  })
});
router.get('/add-product', (req, res) => {
  res.render('admin/add-product')
})
router.post('/add-product', (req, res) => {
  // console.log(req.body);
  // console.log(req.files.Image);
  productHelpers.addProduct(req.body, (id) => {
    let image = req.files.Image;
    image.mv('./public/product-images/'+id+'.jpg', (err, done) => {
      if(!err) {
        res.render("admin/add-product");
      }else {
        console.log(err);
      }
    });
  });
})
router.get('/delete-product/:id', (req, res) => {
  let proId = req.params.id;
  productHelpers.deleteProduct(proId).then((response) => {
    res.redirect('/admin/');
  })
})
router.get('/edit-product/:id', async (req, res) => {
  let product = await productHelpers.getProductDetails(req.params.id);
  res.render('admin/edit-product', {product});
})
router.post('/edit-product/:id', (req, res) => {
  let id = req.params.id;
  productHelpers.updateProduct(req.params.id, req.body).then(() => {
    res.redirect('/admin');
    if(req.files.Image){
      let image = req.files.Image;
      image.mv('./public/product-images/'+id+'.jpg');
    }
  });
})
router.get("/login", (req, res) => {
  if (req.session.admin) {
    res.redirect("/");
  } else {
    res.render("admin/login", { loginErr: req.session.userLoginErr });
    req.session.user.userLoginErr = false;
  }
});
module.exports = router;
