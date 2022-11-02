window.addEventListener('DOMContentLoaded', function () {
    //TODO: Fetch all modules in the database from the Backend
    //TODO: Add each row returned onto the HTML table using the addToTable function found in ../helper.js
        return this.fetch(`/modules`).then(function(response){
            return response.json();
        }).then(function(body){
            const table = document.querySelector("table");
            for (let i = 0; i < body.result.length; i++) {
                var row = table.insertRow(-1);
                var codeCell = row.insertCell(0);
                var nameCell = row.insertCell(1);
                var creditCell = row.insertCell(2);
                codeCell.innerHTML = body.result[i].code + "";
                nameCell.innerHTML = body.result[i].name;
                creditCell.innerHTML = body.result[i].credit;
            }
        }
        )

});
