let express = require('express')
let app = express()

app.get('/sha',(req,res)=>{
    res.json({name:"Jithin"})
})

app.get('/sha/:age', (req,res) => {

    res.send("My age is " +req.params.age)

})
app.listen(3000)