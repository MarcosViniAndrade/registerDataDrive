import express from "express"
import formidableMiddleware from "express-formidable"
import { PreprocessingReq, Register} from "./tools.js"

const app = express()
app.use(formidableMiddleware())

app.post("/register", (req, res) => {

    StartRegisterProcess(PreprocessingReq(req.fields.data))

    async function StartRegisterProcess(reqData){
        var response = []
        for (var i in reqData) {
            response.push(await Register(reqData[i]))
        }
        res.status(200).send(response)
    }
})

export default app