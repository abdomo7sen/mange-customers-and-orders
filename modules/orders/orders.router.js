import { Router } from "express";
import { addorder,  atLeastFive,earliestOrder,getAverage,mostCustomerPurchased,  notordered, percentage, topTen } from "./orders.controller.js";

const orderRouter=Router()


orderRouter.post("/addorder",addorder)
orderRouter.get("/avgorder/:id",getAverage)
orderRouter.get("/notordered",notordered)
orderRouter.get("/most",mostCustomerPurchased)
orderRouter.get("/topTen",topTen)
orderRouter.get("/atLeastFive",atLeastFive)
orderRouter.get("/earliestOrder",earliestOrder)
orderRouter.get("/percentage",percentage)


export default orderRouter