const { request, response } = require("express")
const bodyParser = require('body-parser')
const express = require("express")
const app =express()
const cors =require('cors')
const bcrypt=require('bcrypt')
app.use(bodyParser.json())
app.use(cors())
const knex = require('knex')
const db=knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'realmadrid1999;;',
      database : 'khalil'
    }
  });


app.get('/',(request,response)=>{
    db.select('*').from('users').then(data=>{
        response.json(data)
    })
    .catch(err=>{
        response.status(404).json("error")
    })
})
app.post('/signin',(request,response)=>{
    db.select('email','hash').from('login').
    where('email','=',request.body.email)
    .then(data=>{
        if(request.body.password===data[0].hash){
            db.select('*').from('users')
            .where('email','=',request.body.email)
            .then(user=>{
                response.json(user)
            })
            .catch(err=>{
                response.status(404).json('failed')
            })
        }
    })

})
app.post('/register',(request,response)=>{
    const {password,email,name}=request.body
    var temoin=true
    
    if(name==='' || email==='' || password===''){

        return response.json("empty shamps is not allowed")
    }

    if (temoin===true){
        db.transaction(trx=>{
            trx.insert({
                hash:password,
                email:email
            })

        .into('login')
        .returning('email')
        .then(e=>{
            return trx('users')
            .returning('*')
        .insert({
            email:e[0],
            name:name,
            joined:new Date
        }).then(resp=>{
            response.json(resp[0])
            console.log(resp)
        })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
        .catch(err=>{
            response.json('email already in use')
        })
    
    
}
})

app.put('/image',(request,response)=>{
    const id=request.body.id;
    db('users').where('id',id).increment('entries',1).then(resp =>{
        console.log(resp)
    }) .catch(err=>{
        response.status(404).json("user not found")  
    }) 

})
app.listen(3000,()=>{
    console.log("app is runing")
})