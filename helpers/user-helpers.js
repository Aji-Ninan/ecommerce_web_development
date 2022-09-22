var db = require('../config/connection');
var collection = require('../config/collections');
const bcrypt = require('bcrypt');
module.exports = {
    doSignup: (userData) => {
        return new Promise(async(resolve, reject) => {
            userData.Password = await bcrypt.hash(userData.Password, 10);
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data) => {
                resolve(data.insertedId);
            })
        })

    },
    doLogin: (userData) => {
        let loginStatus = false;
        let response = {};
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({Email:userData.Email})
            if(user){
                bcrypt.compare(userData.Password, user.Password).then((status) => {
                    // this will automatically compare we don't have to do it manually
                    if(status){
                        console.log("login success");
                        response.user = user;
                        response.status = true;
                        resolve(response);
                    }else{
                        console.log("login failed");
                        resolve({ status:false });
                    }
                })
            }else{
                console.log("Email not registered");
                resolve({ status:false });
            }
        })
    } 
}
