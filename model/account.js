const mongoose = require("mongoose");
var crypto = require("crypto");


const Schema = mongoose.Schema;

var accountSchema = new Schema({
    username: String,
    password: String, 
    accountType: String,
    doctorID: String,
    salt: String
})
// allows to add an account into the database
accountSchema.statics.addAccount = function(account, callback){
    var passwordData = saltHashPassword(account.password);
    account.password = passwordData.hashedPassword;
    account.salt = passwordData.salt;
    account.save().then(callback);
};
// allows to get all accounts
accountSchema.statics.getAllAccounts = async function(){
    return await this.find();
}
// gets a single user
accountSchema.statics.getAccountByUsername = async function(username){
    return await this.findOne({
        username: username
    });
}
// checks if correct info corresponds to the right person
accountSchema.statics.authenticate = async function(username, password, salt){
    var hashed = sha512(password, salt).hashedPassword
    return await this.findOne({
        username: username,
        password: hashed
    });
}
// excludes admin from the search
accountSchema.statics.getAccountWithoutAdmin = async function(){
    return await this.find({
        username: {$ne: "admin"}
    });
}
// deletes a user
accountSchema.statics.delete = async function(accountID){
    return await this.deleteOne({
        _id : accountID
    });
}
//updates information of a user
accountSchema.statics.updateAccount = async function(accountID, password){
    var hashed = saltHashPassword(password)
    return await this.updateOne({
        _id: accountID
    }, {
        password: hashed.hashedPassword,
        salt: hashed.salt
    }, {
        new: true
    }); 
};
//updates the password of a user
accountSchema.statics.updatePassword = async function(accountID, password) {
    var hashed = saltHashPassword(password)
    return await this.updateOne({
        _id: accountID
    }, { $set: {
        password: hashed.hashedPassword,
        salt: hashed.salt
    }})
}

var Account = mongoose.model("account", accountSchema)

var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};

var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        hashedPassword:value
    };
};

function saltHashPassword(userpassword) {
    var salt = genRandomString(16); /** Gives us salt of length 16 */
    var passwordData = sha512(userpassword, salt);
    return {
        hashedPassword: passwordData.hashedPassword,
        salt: salt
    }
}

module.exports = {
    Account
}