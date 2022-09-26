var db = require('../config/connection');
var collection = require('../config/collections');
var objectId = require('mongodb').ObjectID;

module.exports = {
    addProduct:(product, callback) => {
        //console.log(product);
        db.get().collection('product').insertOne(product).then((data) => {
            //console.log(data);
            callback(data.insertedId);
        })
    },
    getAllProducts:() => {
        return new Promise(async (resolve, reject) =>{
            let products = await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray();
            resolve(products)
        })
    },
    deleteProduct: (prodId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({_id:objectId(prodId)}).then((response) => {
                resolve(response);
            });
        });
    },
    getProductDetails: (prodId) => {
        return new Promise ((resolve, reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:objectId(prodId)}).then((product) => {
                resolve(product);
            })
        })
    },
    updateProduct: (prodId, proDetails) => {
        return new Promise ((resolve, reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION).updateOne({_id:objectId(prodId)}, {$set:{
                Name: proDetails.Name,
                Description: proDetails.Description,
                Price: proDetails.Price,
                Category: proDetails.Category
            }
            }).then((response)=> {
                resolve()
            })
        })
    }
}
// everything is going to be exported