
const fetch = require("node-fetch");

const API_ENDPOINT = "https://v2018.api2pdf.com/wkhtmltopdf/html";

exports.handler = async (event, context) => {


    var cpdfHTMLStr = JSON.parse(event.body.name)
    return {
        statusCode: 200,
        body: JSON.stringify(cpdfHTMLStr)
    };

    // const cnpdfObj = JSON.parse(cpdfHTMLStr)
    console.log(cpdfHTMLStr);

    const pdfName = 'Online Psychotherapy Contract';
    const payload = {
        "html": "cpdfHTMLStr",
        "inlinePdf": false,
        "fileName": pdfName,
        "options": {
            "marginBottom": 1.3
        }
    };
    return fetch(API_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", Authorization: "234f8d16-47c7-469a-a9cc-f40d1c445fd9" },
        body: JSON.stringify(payload)
    })
        .then((response) => response.json())
        .then((data) => ({
            statusCode: 200,
            body: JSON.stringify(data.pdf)
        }))
        .catch((error) => ({ statusCode: 422, body: String(error) }));

};
