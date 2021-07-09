const { request, response } = require("express")
const bodyParser = require('body-parser')
const express = require("express")
const app =express()
const cors =require('cors')
app.use(bodyParser.json())
app.use(cors())
const database={
    users:[
        {
            id:1,
            name : "john",
            email :"john@gmail.com",
            password :"password",
            entries :0,
            joined :new Date()


    },
    {
        id:2,
        name : "khalil",
        email :"khalil@gmail.com",
        password :"password",
        entries :0,
        joined :new Date()


}

    ]
}
app.get('/',(request,response)=>{
    response.send(database.users)
})
app.post('/signin',(request,response)=>{
    var temoin=false
    let index=0
    for (let k=0;k<database.users.length;k++){
        if(request.body.email===database.users[k].email && request.body.password === database.users[k].password){
            temoin=true
            index=k

        }
    }
    if (temoin===true){
        response.json(database.users[index])
    }
    else{
        response.json('failed')
    }

})
app.post('/register',(request,response)=>{
    const {password,email,name}=request.body
    var temoin=true
    for(var k=0;k<database.users.length;k++){
        if(email===database.users[k].email){

            temoin=false
        }
    

    }
    if(name==='' || email==='' || password===''){

        return response.json("empty shamps is not allowed")
    }
    if (temoin===true){
        const user={
            id:database.users[database.users.length-1].id+1,
            name:name,
            email:email,
            password:password,
            entries:0,
            joined:new Date(),

        }
        database.users.push({
            id:database.users[database.users.length-1].id+1,
            name:name,
            email:email,
            password:password,
            entries:0,
            joined:new Date(),
        });
        response.json(user)
    }
    else
    {
        response.json('email already in use')
    }
    
})
app.get('/register',(request,response)=> {
    response.json(database)
})
app.get('/profile/:id',(request,response)=>{
    const id=request.params.id;
    let temoin=false;
    database.users.forEach(user =>{
        if(user.id ==id){
            temoin=true;
            return response.json(user);
        }
    })
    if(temoin===false){
        response.status(404).json("user not found")
    }

})
app.put('/image',(request,response)=>{
    const id=request.body.id;
    let temoin=false;
    database.users.forEach(user =>{
        if(user.id ==id){
            temoin=true;
            user.entries=user.entries+1
            response.json(user)
        }
    })
    if(temoin===false){
        response.status(404).json("user not found")
    }

})
app.listen(3000,()=>{
    console.log("app is runing")
})