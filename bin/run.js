import fs from "fs"
import axios from "axios"
import FormData from "form-data"

function IntegrationTest() {
    var data = JSON.parse(fs.readFileSync('data/pypefy_return_expected.json'))

    data = JSON.stringify(data)

    let form = new FormData()
    form.append('data', data)

    return axios({
        method: 'post',
        url: "http://localhost:3000/register",
        headers: { ...form.getHeaders() },
        data: form
    })
        .then((response) => {
            return response.data
        })
}

export default IntegrationTest
