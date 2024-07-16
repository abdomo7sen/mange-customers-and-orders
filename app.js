import express from 'express'
import customerRouter from './modules/customer/customer.router.js'
import productRouter from './modules/product/product.router.js'
import orderRouter from './modules/orders/orders.router.js'
const app = express()
const port = 3000

app.use(express.json())
app.use('/auth',customerRouter)
app.use('/products',productRouter)
app.use('/orders',orderRouter)
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
