
const fetch = require("node-fetch");

const API_ENDPOINT = "https://v2018.api2pdf.com/wkhtmltopdf/html";

exports.handler = async (event, context) => {


    var fbody = JSON.parse(event.body)
    var pname = fbody.name;
    var pageHtml = fbody.pdfhtml;
    // return {
    //     statusCode: 200,
    //     body: JSON.stringify(pageHtml)
    // };

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
