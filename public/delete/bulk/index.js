// str is expected to be a comma delimited string
// e.g. "st0507,st1234,abcde,12345"
//
// Return an array of string
// e.g. ["st0507", "st1234", "abcde", "12345"]
function splitByComma(str) {
    // TODO implement split by comma
    var modulesArr = str.split(",");
    return modulesArr;
}

window.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form'); // Only have 1 form in this HTML
    form.onsubmit = function (e) {
        e.preventDefault(); // prevent using the default submit behavior

        const codesCsv = form.querySelector('input[name=code]').value;

        // TODO: Implement splitByComma to split codesCsv string into an array of module codes.
        const codes = splitByComma(codesCsv);
        
        // TODO: Send the codes to backend to perform bulk deletion
        return fetch("/modules/bulk",{
            method : "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                modulesArr : codes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
            }),
        })
        .then(function (response) {
            if(response.status == 404){
                throw Error('Duplicate error')
            }
            else if(response.status != 200){
                throw Error('Unknown Error')
            }

            alert("Bulk delete successfull!")
            window.location.reload();
            return;
        })
        .catch(function(error){
            if(error.message == 'Duplicate error'){
                alert("Duplication Error! Please try again");
            }
            else{
                alert('Unknown Error!');
            }
            
        })
    };
});
