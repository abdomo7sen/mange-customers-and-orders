import { dbconnection } from "../database/dbConnection.js";
import bcrypt from "bcrypt"
const conn=dbconnection()

export const emailExist=(req,res,next)=>{
    const {email}=req.body
    conn.query("SELECT email FROM customers WHERE email=?",[email],(err,data)=>{
        if(err) return console.log(err);
        if(data.length>0){
            res.status(409).json({msg:"Email Must be unique"})
        }
        else{
            req.body.password=bcrypt.hashSync(req.body.password,8)
            next()
        }
    })
}
export const emailLogin=(req,res,next)=>{
    const {email,password}=req.body
    // console.log(req.body);
    conn.query("SELECT email, password FROM customers WHERE email=?",[email],(err,data)=>{
        if(err) return console.log(err);
        if(data.length==0){
            res.status(404).json({msg:"customer Not Found"})
        }
        else{
            let match=bcrypt.compareSync(password,data[0].password)
            if (match) {
                return next()
            }else{
                res.status(401).json({msg:"Wrong Password"})
            }
        }
    })
}
