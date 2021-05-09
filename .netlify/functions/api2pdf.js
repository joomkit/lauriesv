//
// const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//
//
// const html = "<p>hello john</p>"
//
// function printHtmlToPdfXHR(html) {
//     var pdfName = 'Online Psychotherapy Contract for john';
//     var endpoint = 'https://v2018.api2pdf.com/wkhtmltopdf/html';
//     var cookie = '234f8d16-47c7-469a-a9cc-f40d1c445fd9'; //replace this with your own from portal.api2pdf.com
//     var payload = {
//         "html": "<p>hello john</p>",
//         "inlinePdf": false,
//         "fileName": pdfName,
//         "options": {
//             "marginBottom": 1.3
//         }
//     };
//     const xhr = new XMLHttpRequest();
//     xhr.open("POST", endpoint, true);
//
//     //Send the proper header information along with the request
//     xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//     /* Authorization header */
//     xhr.setRequestHeader("Authorization", cookie);
//
//     xhr.send(JSON.stringify(payload));
//
//     xhr.onreadystatechange = function () { // Call a function when the state changes.
//         if (xhr.readyState === 4 && this.status === 200) {
//             // Request finished. Do processing here.
//             var xhr_response = xhr.response;
//             console.log(xhr.response.pdf);
//             return xhr_response;
//         }else{
//             return xhr.status;
//         }
//     }
// }
//
// exports.handler = async (event, context) => {
//
//     return {
//         statusCode: 200,
//         body: JSON.stringify({
//             data: printHtmlToPdfXHR(html)
//         })
//     }
// }
//
const fetch = require("node-fetch");

// const API_ENDPOINT = "https://icanhazdadjoke.com/";

const API_ENDPOINT = "https://v2018.api2pdf.com/wkhtmltopdf/html";

exports.handler = async (event, context) => {
    // const html = JSON.parse(event.body.html)
    const submittedData = event.body.split('&')
    const html = decodeURIComponent(submittedData[0].substr(5).replace(/\+/g, '%20'))

    return {
        statusCode: 200,
        body: JSON.stringify(submittedData),

    }
    // const pdfName = 'Online Psychotherapy Contract';
    // const payload = {
    //     "html": "<p>"+event.body+"</p>",
    //     "inlinePdf": false,
    //     "fileName": pdfName,
    //     "options": {
    //         "marginBottom": 1.3
    //     }
    // };
    // return fetch(API_ENDPOINT, {
    //     method: "POST",
    //     headers: { Accept: "application/json", Authorization: "234f8d16-47c7-469a-a9cc-f40d1c445fd9" },
    //     body: JSON.stringify(payload)
    // })
    //     .then((response) => response.json())
    //     .then((data) => ({
    //         statusCode: 200,
    //         body: data.pdf,
    //     }))
    //     .catch((error) => ({ statusCode: 422, body: String(error) }));
};
