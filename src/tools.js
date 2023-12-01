import axios from "axios"
import FormData from "form-data"

function PreprocessingReq(reqData) {
    var req = JSON.parse(reqData)["data"]["cards"]["edges"]

    var dict_base = {
        "motorista_nascimento": "",
        "motorista_rg": "",
        "motorista_cnh_cat": "",
        "motorista_cnh_tipo": "",
        "motorista_cnh_trab": "",
        "motorista_cnh_data1": "",
        "motorista_cnh_data2": "",
        "motorista_cnh_data3": "",
        "motorista_obs": "",
        "motorista_email": "",
        "motorista_sexo": "",
        "id_estado_civil": "",
        "id_instrucao": "",
        "motorista_profissao": "",
        "motorista_cargo": "",
        "motorista_naturalidade": "",
        "motorista_nacionalidade": "",
        "motorista_mae_nome": "",
        "motorista_mae_cpf": "",
        "motorista_pai_nome": "",
        "motorista_pai_cpf": "",
        "motorista_cep": "",
        "motorista_end": "",
        "motorista_end_num": "",
        "motorista_end_comp": "",
        "motorista_end_bairro": "",
        "motorista_end_cidade": "",
        "motorista_end_uf": ""
    }

    var data = []
    for (var i in req) {
        var dict = dict_base
        for (var j in req[i]["node"]["fields"]) {
            var row = req[i]["node"]["fields"][j]
            dict[row["name"]] = row["value"]
        }
        data.push(JSON.stringify(dict))
    }

    return data
}

function RegisterDriver(reqData) {
    var string_data = JSON.stringify(reqData)

    var string_data = reqData.substring(1)

    let form = new FormData()
    form.append('data', process.env.CREDENTIALS + string_data)

    return axios({
        method: 'post',
        url: 'http://www.datadrive.com.br/api/dd-api/mot-cad',
        headers: { ...form.getHeaders() },
        data: form
    })
        .then((response) => {
            return response.data.data.id
        })
}

function RegisterFollowUP(id) {
    var idDriver = `"motorista": "${id}",`

    let form = new FormData()
    form.append('data', process.env.CREDENTIALS + idDriver + '"acomp_tipo": "6","acomp_periodo": "quinzenal"}')

    return axios({
        method: 'post',
        url: 'http://www.datadrive.com.br/api/dd-api/acomp-cad',
        headers: { ...form.getHeaders() },
        data: form
    })
        .then((response) => {
            return response.data.data.id
        })
}

async function Register(reqData) {
    return await RegisterDriver(reqData)
        .then((idDriver) => {
            return RegisterFollowUP(idDriver).then((idFollowUp) => {
                return {
                    "idDriver": idDriver,
                    "idFollowUp": idFollowUp
                }
            })
        })
}

function TestEnv(){
    return process.env.CREDENTIALS
}

export { PreprocessingReq, Register, TestEnv}