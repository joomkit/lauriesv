






document.addEventListener('DOMContentLoaded', function (event) {

    var childContainer = document.getElementById('formData');
    var ul = document.getElementById('clientDetails');
    var formDetail = document.getElementById('pdfForm');
    var createButton = document.getElementById('agreed');
    var cName = document.getElementById('name');
    var email = document.getElementById('emailAddress');
    var clientsReference = document.getElementById('clientsReference');
    var mobile = document.getElementById('mobile');
    var landline = document.getElementById('landline');
    var address = document.getElementById('address');
    var dob = document.getElementById('dob');
    var referringAgent = document.getElementById('referringAgent');
    var insuranceNo = document.getElementById('insuranceNo');
    var authorisationNo = document.getElementById('authorisationNo');
    var insuranceCompanyName = document.getElementById('insuranceCompanyName');
    var insuranceOrSelfFunding;
    var funding;

    // cName.addEventListener('input', function (evt) {
    //     console.log(this.value);
    //     cName.nodeValue = this.value;
    // });

    // call netlify function to get api data
    async function api2pdf(html,cName) {
        console.log(cName.value);
        console.log(html);
        const url = '/.netlify/functions/api2pdf';
        try {
            const response = await fetch(url,{
               method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                //body: JSON.stringify(user)
                body: JSON.stringify({
                    html: html,
                    name: cName.value
                })
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (err) {
            console.log(err);
        }
    }

    createButton.addEventListener("click", function (e) {
        e.preventDefault();

        // set html to pass to api via netlfiy function
        hidePdfElements();
        buildClientDetail();
        showClientDetails();
        childContainer.removeChild(formDetail);
        var html =  document.documentElement.outerHTML;
        // var html = $('html').html();
        // console.log("pureXHR " + html);
        //printHtmlToPdfXHR(html);
        // printHtmlToPdf(html);
        var download = api2pdf(html,cName);
        console.log(download)

    });

    function buildClientDetail() {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode("Name: " + cName.value)); ul.appendChild(li);




        let ref = document.createElement("li");
        ref.appendChild(document.createTextNode("Reference:" + clientsReference.value));  ul.appendChild(ref);

        // or do custom editable
        // var input = document.createElement("input");
        // input.setAttribute('type', 'text');
        // this will render editable field !!!
        // ref.appendChild(input); ul.appendChild(ref);

        let cEmail = document.createElement("li");
        cEmail.appendChild(document.createTextNode("Email: " + email.value));  ul.appendChild(cEmail);

        let cMobile = document.createElement("li");
        cMobile.appendChild(document.createTextNode("Mobile: " + mobile.value));  ul.appendChild(cMobile);

        let cLandline = document.createElement("li");
        cLandline.appendChild(document.createTextNode("Landline: " + landline.value));  ul.appendChild(cLandline);

        let cAddress = document.createElement("li");
        cAddress.appendChild(document.createTextNode("Address: " + address.value));  ul.appendChild(cAddress);

        let cDob = document.createElement("li");
        cDob.appendChild(document.createTextNode("DOB: " + dob.value));  ul.appendChild(cDob);

        let cReferringAgent = document.createElement("li");
        cReferringAgent.appendChild(document.createTextNode("Referring agent: " + referringAgent.value));  ul.appendChild(cReferringAgent);

        let cInsuranceOrSelfFunding = document.createElement("li");
        cInsuranceOrSelfFunding.appendChild(document.createTextNode("Funding: " + getRadioValue()));  ul.appendChild(cInsuranceOrSelfFunding);


        let cInsuranceCompanyName = document.createElement("li");
        cInsuranceCompanyName.appendChild(document.createTextNode("Insurance Company: " + insuranceCompanyName.value));  ul.appendChild(cInsuranceCompanyName);

        let cInsuranceNo = document.createElement("li");
        cInsuranceNo.appendChild(document.createTextNode("Insurance no.: " + insuranceNo.value));  ul.appendChild(cInsuranceNo);

        let cAuthorisationNo = document.createElement("li");
        cAuthorisationNo.appendChild(document.createTextNode("Authorisation no.: " + authorisationNo.value));  ul.appendChild(cAuthorisationNo);



    }


    if (document.querySelector('input[name="insuranceOrSelfFunding"]')) {
        document.querySelectorAll('input[name="insuranceOrSelfFunding"]').forEach((elem) => {
            elem.addEventListener("change", function(event) {
                var item = event.target.value;
                // //fundingn switch
                if(item == "Insurance"){
                    el = document.getElementById('insurance-wrapper');
                    el.setAttribute("style", "display:block;");

                    //should add required to these when shown!
                }
                if(item == "Self funding"){
                    el = document.getElementById('insurance-wrapper');
                    el.setAttribute("style", "display:none;");
                }

            });
        });
    }
    function getRadioValue() {
        for (index=0; index < document.pdfForm.insuranceOrSelfFunding.length; index++) {
            if (document.pdfForm.insuranceOrSelfFunding[index].checked) {
               funding = document.pdfForm.insuranceOrSelfFunding[index].value;

                return funding;
                break;
            }
        }
    }
    function hidePdfElements() {
        for (let el of document.querySelectorAll('.pdf-hide')) el.setAttribute("style", "display:none;");
    }

    function showClientDetails() {
        el = document.getElementById('details');
        el.setAttribute("style", "display:block;");

    }


    function printHtmlToPdfXHR(html) {
        var pdfName = 'Online Psychotherapy Contract for ' + cName.value
        var endpoint = 'https://v2018.api2pdf.com/wkhtmltopdf/html';
        var cookie = '234f8d16-47c7-469a-a9cc-f40d1c445fd9'; //replace this with your own from portal.api2pdf.com
        var payload = {
            "html": html,
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

        xhr.onreadystatechange = function() { // Call a function when the state changes.
            if (xhr.readyState === 4 && this.status === 200) {
                // Request finished. Do processing here.
                var xhr_response = xhr.response;
                console.log(xhr.response.pdf);
            }
        }

// xhr.send(new Int8Array());
// xhr.send(document);
    }

    function printHtmlToPdf(html) {

        var pdfName = 'Online Psychotherapy Contract for ' + cName.value
        var endpoint = 'https://v2018.api2pdf.com/wkhtmltopdf/html';
        var cookie = '234f8d16-47c7-469a-a9cc-f40d1c445fd9'; //replace this with your own from portal.api2pdf.com
        var payload = {
            "html": html,
            "inlinePdf": false,
            "fileName": pdfName,
            "options": {
                "marginBottom": 1.3
            }
        };
        $.ajax({
            url: endpoint,
            method: "POST",
            dataType: "json",
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(payload),
            cache: false,
            beforeSend: function (xhr) {
                /* Authorization header */
                xhr.setRequestHeader("Authorization", cookie);
            },
            success: function (data) {
                console.log(data.pdf); //this is the url to the pdf, do something with it
                //window.location = data.pdf;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    }

    // validatino routine
    let postBtn = document.querySelector('.post-btn');
    let wrapper = document.querySelector('.form-wrapper');
    let inputs = [...wrapper.querySelectorAll('.form-control')];

    function validate() {
        let isIncomplete = inputs.some(input => !input.value);
        postBtn.disabled = isIncomplete;
        postBtn.style.cursor = isIncomplete ? 'not-allowed' : 'pointer';
    }

    wrapper.addEventListener('input', validate);
    validate();

});
