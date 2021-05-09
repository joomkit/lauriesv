
const fetch = require("xmlhttprequest");

const html = "<p>hello john</p>"

function printHtmlToPdfXHR(html) {
    var pdfName = 'Online Psychotherapy Contract for john';
    var endpoint = 'https://v2018.api2pdf.com/wkhtmltopdf/html';
    var cookie = '234f8d16-47c7-469a-a9cc-f40d1c445fd9'; //replace this with your own from portal.api2pdf.com
    var payload = {
        "html": "<p>hello john</p>",
        "inlinePdf": false,
        "fileName": pdfName,
        "options": {
            "marginBottom": 1.3
        }
    };
    const xhr = new XMLHttpRequest();
    xhr.open("POST", endpoint, true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    /* Authorization header */
    xhr.setRequestHeader("Authorization", cookie);

    xhr.send(JSON.stringify(payload));

    xhr.onreadystatechange = function () { // Call a function when the state changes.
        if (xhr.readyState === 4 && this.status === 200) {
            // Request finished. Do processing here.
            var xhr_response = xhr.response;
            console.log(xhr.response.pdf);
            return xhr_response;
        }
    }
}

exports.handler = async (event, context) => {

    const pdf = printHtmlToPdfXHR(html)
    return {
        statusCode: 200,
        body: JSON.stringify({
            data: pdf
        })
    }
}
