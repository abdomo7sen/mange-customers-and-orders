import { dbconnection } from "../../database/dbConnection.js"

const conn=dbconnection()

const addorder = (req,res,next)=>{
    const {customer_id,orderdetails}=req.body
    let productIds=[]
    orderdetails.forEach(item=>{
        productIds.push(item.product_id)
    })
    console.log(productIds);
    let productIdsString=productIds.join(",")
    console.log(productIdsString);
    const query=(`SELECT unitPrice FROM products WHERE id in (${productIdsString}) order by field (id,${productIdsString})`)
    conn.execute(query,(err,result)=>{
        for (let index = 0; index < orderdetails.length; index++) {
            if (!result[index]) {
                res.status(404).send("Not found")
            }
            orderdetails[index].price = result[index].unitPrice
        }
        const total_amount=orderdetails.reduce((total,item)=>total+item.quantity*item.price,0)
        const cDate=new Date().toISOString().slice(0,10)
        const query2=(`insert into orders (customer_id,order_date,total_amount) values(${customer_id},${cDate},${total_amount})`)
        conn.execute(query2,(err,result)=>{
            const values=orderdetails.map((item)=>`(${result.insertId},${item.product_id},${item.quantity},${item.price})`)
            conn.query(`insert into orderdetails (order_id, product_id, quantity, price) values ${values}`,(err,result)=>{
                if(err) return console.log(err)
                if(result){
                    res.status(201).json({"message":"order added successfully"})
                }else{
                    res.status(500).json({"message":"error in adding order"})
                }
            })
        })
    })
}

//API to calculate the average order value. 
const getAverage= (req,res,next)=>{
    conn.query(`SELECT avg(orders.total_amount) AS avg_price FROM orders where customer_id=${req.params.id}`,(err,data)=>{
        if(data.length){
        res.status(200).json({"avg_price":data})
        }else{
            res.status(404).json({"message":"customer not found"})
        }
    })
    }

//Write a query to list all customers who have not made any orders.

const notordered= (req,res,next)=>{
    conn.query("SELECT customers.id,customers.fName FROM `customers`  LEFT JOIN orders on customers.id=orders.customer_id WHERE orders.customer_id is null GROUP BY customers.fName;",(err,data)=>{
        if(err) return console.log(err);
        res.status(200).json({"customer not ordered yet":data})
    })
    
}

// API to find the customer who has purchased the most items in total

const mostCustomerPurchased =(req,res)=>{
    conn.query(`SELECT customers.id,customers.fName,SUM(orders.quantity) AS total_purchased FROM customers join orders on customers.id=orders.customer_id  join orderdetails on orders.id=orderdetails.order_id GROUP BY customers.fName ORDER BY total_purchased DESC LIMIT 1`,(err,data)=>{
        if(err) return console.log(err);
        res.status(200).json({"customer who has purchased the most items in total":data})
    })
}

//API to list the top 10 customers based on total money spent.
const topTen =(req,res)=>{
        conn.query(`SELECT orders.id as order_id,customers.fName,customers.id,sum(orders.total_amount)AS total_money FROM orders JOIN customers on customers.id=orders.customer_id GROUP BY customers.fName ORDER BY total_money desc limit 10;`,(err,data)=>{
        if(err) return console.log(err);
        res.status(200).json({"customer who has purchased the most items in total":data})
    })
}

//API to list all customers who have made at least 5 orders. 

const atLeastFive=(req,res)=>{
    conn.query(`SELECT orders.id as order_id,customers.fName,customers.id,COUNT(orders.id)AS numOfOrders FROM orders JOIN customers on customers.id=orders.customer_id GROUP BY customers.fName HAVING numOfOrders>5;`,(err,data)=>{
        if(err) return console.log(err);
        res.status(200).json({"customer who has made at least 5 orders":data})
    })
}
//API to find the percentage of customers who have made more than one order.

const percentage=(req,res)=>{
    conn.query(`select (count(distinct multiple_orders.customer_id)/count(distinct all_customer.id))*100 as precentage from customers as all_customer
        left join (select customer_id from orders group by customer_id having count(id)>1) as multiple_orders
        on all_customer.id= multiple_orders.customer_id;`,(err,data)=>{
            if(err) return console.log(err);
            res.status(200).json({"percentage of customers who have made more than one order":data})
        })
}



//API to find the customer who has made the earliest order
const earliestOrder=(req, res)=>{
    conn.query(`SELECT customers.id,customers.fName,orders.order_date FROM customers join orders on customers.id=orders.customer_id ORDER BY orders.order_date ASC LIMIT 1;`,(err,data)=>{
        if(err) return console.log(err);
        res.status(200).json({"customer who has made the earliest order":data})
    })
}
export{
    percentage,addorder,getAverage,notordered,mostCustomerPurchased,topTen,atLeastFive,earliestOrder
}