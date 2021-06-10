
const fetch = require("node-fetch");

const API_ENDPOINT = "https://v2018.api2pdf.com/wkhtmltopdf/html";

exports.handler = async (event, context) => {


    var fbody = JSON.parse(event.body)
    var pname = fbody.name;
    var pageHtml = fbody.pdfhtml;

    const pdfName = 'Online Psychotherapy Contract for ' + pname;
    const payload = {
        "html": pageHtml,
        "inlinePdf": false,
        "fileName": pdfName,
        "options": {
            "marginBottom": 1.3
        }
    };
    return fetch(API_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", Authorization: "9f1aad5a-ee04-44c9-9282-f9e851646382" },
        body: JSON.stringify(payload)
    })
        .then((response) => response.json())
        .then((data) => ({
            statusCode: 200,
            body: JSON.stringify(data.pdf)
        }))
        .catch((error) => ({ statusCode: 422, body: String(error) }));

};
