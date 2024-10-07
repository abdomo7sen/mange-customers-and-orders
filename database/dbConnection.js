import mysql from "mysql2"
import {configDotenv} from 'dotenv'
configDotenv({path:"./config/.env"})
export const dbconnection = ()=>{
    const connection = mysql.createConnection({
        host:process.env.HOST,  
        user: process.env.USER, 
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    })
    connection.connect((err)=>{
        if(err){
            console.log(err.message)
        }
        else{
            console.log("Database connected")
        }
    })
    return connection
}