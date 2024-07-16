import {Router} from 'express'
import { addProduct, totalItems, totalRevenue } from './product.controller.js';

const productRouter=Router()

productRouter.route("/").post(addProduct).get(totalRevenue)
productRouter.get("/totalitem",totalItems)



export default productRouter;