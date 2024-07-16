import { dbconnection } from "../../database/dbConnection.js";

const conn=dbconnection()

//1- addProduct
const addProduct=(req,res,next)=>{
    const {product_name,category,unit_price}=req.body;
    conn.query(`INSERT INTO products (product_name,category,unit_price) VALUES ('${product_name}','${category}','${unit_price}')`,(err,data)=>{
        if(err)  console.log(err);
        res.status(201).json({
            message:"Product added successfully"
        })
    })
}

//2-total revenue for each category

const totalRevenue=(req,res,next)=>{
    conn.query(`SELECT DISTINCT category,SUM(unit_price) AS total_revenue FROM products GROUP BY category`,(err,data)=>{
        if(err)  console.log(err);
        res.status(200).json(data)

    })
}

//3-API to find the total number of items sold for each product.
const totalItems=(req,res)=>{
    conn.query(`SELECT products.product_name,SUM(orders.quantity) AS total_items FROM products join orders on products.id=orders.product_id GROUP BY product_name`,(err,data)=>{
        if(err)  console.log(err);
        res.status(200).json(data)
    })
}
export{
    addProduct,totalRevenue,totalItems
}