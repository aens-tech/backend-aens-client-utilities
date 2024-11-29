import contactActionsController from "@/controllers/contactActions.controller";
import { Router } from "express";

const contactActionsRouter = Router()

contactActionsRouter.get(
    "/",
    contactActionsController.getAllContactActions
)

contactActionsRouter.get(
    "/:slug",
    contactActionsController.getContactActions
)

export default contactActionsRouter