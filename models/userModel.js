const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const UserSchema = new Schema ({
    name:{
        type:String,
        required:"Name is mandatory"
    },
    email:{
        type:String,
        required:"E-mail is mandatory"
    },
    password:{
        type:String,
        required:"Password is mandatory"
    }
})
 
UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
});


const User = mongoose.model('User',UserSchema);
module.exports  = User;