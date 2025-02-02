const fs = require('fs')


/* Synchronus way to read file */
console.log(fs.readFileSync('./sample1.txt','utf-8'))

/* Asynchronus way to read file */
fs.readFile('./sample1.txt','utf-8',(err,result)=>{
    err ? console.log(err) : console.log(result)
})

/* Synchronus way to write into a file */
fs.writeFileSync('./example.txt','Hey there i am node js\n')

/* Asynchronus way to write into a file */
fs.writeFile('./example.txt','Hey there i am soumyajit\n',(err,result)=>{
    err ? console.log("There is some issue") : console.log("Operation successfull!")
})


/* Write method just overwrite the existing file content with new one */

/* Append method */

/* Asynchronus method to append into a file */
fs.appendFile('./example.txt','I am software developer',(err,result)=>{
    err ? console.log("Something went wrong") : console.log("Append operation successfull")
})

/* Delete method */

fs.unlink('./sample2.txt',(err,res)=>{
    err ? console.log("Failed to delete the file") : console.log("File deleted successfully")
})

/* Create directory */

fs.mkdir('./myFolder',(err,res)=>{
    err ? console.log("Failed to create folder") : console.log("Folder created successfully")
})

/* Delete directory */

fs.rmdir('./myFolder',(err,res)=>{
    err ? console.log("Failed to delete folder") : console.log("Folder deleted successfully")
})