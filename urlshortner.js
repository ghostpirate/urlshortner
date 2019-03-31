let express = require('express')
let app = express()
let sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database(':memory:')

db.serialize(()=>{
    db.run("CREATE TABLE IF NOT EXISTS shortner(shorter VARCHAR(5),longer VARCHAR(256))")
})

db.run("INSERT INTO shortner values('abcd','https://google.com'),('efgh','https://facebook.com')")





app.get('/:long',(req,res)=>{
    let longUrl = 'http://'+req.params.long
    let shortUrl = 's'+Math.round(Math.random()*10000)

    db.run(`INSERT INTO shortner values('${shortUrl}','${longUrl}')`)
    res.send('short URL: '+shortUrl)
})

app.get('/s/:short',(req,res)=>{
    let shortUrl = req.params.short
    db.each(`SELECT longer FROM shortner WHERE shorter='${shortUrl}'`,(err,row)=>{
        res.redirect(row.longer)
        return
    })

})

app.listen(3000)
