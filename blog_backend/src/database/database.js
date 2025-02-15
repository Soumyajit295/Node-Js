const mongoose = require('mongoose')

const databaseConnect = async()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log(`Databse connection successfull!`))
    .catch(()=>{
        console.log(`Database connction failed`)
        process.exit(1)
    })
}

module.exports = databaseConnect