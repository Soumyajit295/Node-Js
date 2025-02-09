const mongoose = require('mongoose')

const connectToDataBase = async()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log(`Database connection successfull`))
    .catch(()=>console.log(`Database connection failed`))
}

module.exports = connectToDataBase