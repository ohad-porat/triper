import express from "express"
import userSessionsRouter from "./api/v1/userSessionsRouter.js"
import usersRouter from "./api/v1/usersRouter.js"
import tripsRouter from "./api/v1/tripsRouter.js"
import clientRouter from "./clientRouter.js"

const rootRouter = new express.Router()
rootRouter.use("/", clientRouter)

rootRouter.use("/api/v1/user-sessions", userSessionsRouter)
rootRouter.use("/api/v1/users", usersRouter)
rootRouter.use("/api/v1/trips", tripsRouter)

export default rootRouter
