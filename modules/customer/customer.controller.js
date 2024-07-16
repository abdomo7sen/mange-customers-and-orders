import { dbconnection } from '../../database/dbConnection.js';
const conn=dbconnection()
const signUp=(req,res)=>{
    conn.query("Insert into customers set ?",req.body)
    res.send("customer added").status(201)

}

const signIn=(req,res)=>{
    conn.query("select * customers where email=?",req.body.email)
    res.send("login successfully").status(200)

}



export{
    signIn,
    signUp
}