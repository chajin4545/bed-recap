//const { response } = require("../../../app");
window.addEventListener('DOMContentLoaded', function () {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    function randomInt(min, max) {
        //get random integer that is between min and max.
        return Math.floor(Math.random() * (max - min) + min);
    }

    function randomWord(length) {
        //get random combinations of words that is made from characters (I can decide the length of the word)
        let word = '';
        for (let i = 0; i < length; i++) {
            word += characters[randomInt(0, characters.length)];
        }

        return word;
    }

    function randomModule() {
        //run random word function and retrive random word length of 6
        let code = randomWord(6);
        
        const name = code;
        const credit = randomInt(2, 7);
        //return json that contains code name and credit.(code and name are equal)
        return { code, name, credit };
    }

    function addNewEntry() {
        const template = document.querySelector('#input-template');
        //clone the input template and create another one at the bottom
        const fieldset = template.content.firstElementChild.cloneNode(true);
        //create new random module
        const module = randomModule();
        //now insert all the values according to the values
        fieldset.querySelector('input[name=code]').value = module.code;
        fieldset.querySelector('input[name=name]').value = module.name;
        fieldset.querySelector('input[name=credit]').value = module.credit;

        const fieldSetContainer = document.querySelector('#fieldset-container');
        //create new input fields
        fieldSetContainer.appendChild(fieldset);
    }
    function searchByCode(codes){
        return fetch(`/bulkModules/code/${codes}`)
    }
    function searchByName(names){
        return fetch(`/bulkModules/name/${names}`)
    }
    function searchByCodeName(codeNames){
        return fetch(`/bulkModules/codeNames/${codeNames}`)
    }
    function postModule(body){
        return fetch("/modules/bulk",{
            method : "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bulkData : body                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
            }),
        })
    }
    //as the dom content is loaded, add a new input fields with random module.
    addNewEntry();

    const addRowButton = document.querySelector('#add-row');
    // TODO: onclick of addRowButton, call the addNewEntry function
    addRowButton.onclick = function () {
        addNewEntry();
        return false;
    };

    const form = document.querySelector('form'); // Only have 1 form in this HTML
    form.onsubmit = function (e) {
        e.preventDefault(); // prevent using the default submit behavior(which is reloading the whole page)
        
        //each field set contains 3 input fields: code name and credit
        const allFieldset = form.querySelectorAll('fieldset');
        
        const body = [];
        const codes =[];
        const names = [];
        const codeNames = [];
        allFieldset.forEach(function (fieldset) {
            const code = fieldset.querySelector('input[name=code]').value;
            const name = fieldset.querySelector('input[name=name]').value;
            const credit = fieldset.querySelector('input[name=credit]').value;

            // Push code, name, and credit in an array (in that order) into body
            body.push([code,name,credit]);
            codes.push(code)
            names.push(name)
            codeNames.push([code,name])
        });

        Promise.all([searchByCode(codes.join(",")),searchByName(names.join(",")),searchByCodeName(codeNames.join("/"))])
        .then(function(response){
            const codesResults = response[0];
            const namesResults = response[1];
            const codesNamesResults = response[2];

            console.log(response);
            // codesResults.forEach(element => {
                
            // });
        })
        //TODO send body to backend to perform bulk insert
        // return fetch("/modules/bulk",{
        //     method : "POST",
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         bulkData : body                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        //     }),
        // })
        // .then(function (response) {
        //     if(response.status == 404){
        //         throw Error('Duplicate error')
        //     }
        //     else if(response.status != 201){
        //         throw Error('Unknown Error')
        //     }

        //     alert("Bulk create successfull!")
        //     window.location.reload();
        //     return;
        // })
        // .catch(function(error){
        //     if(error.message == 'Duplicate error'){
        //         alert("Duplication Error! Please try again");
        //     }
        //     else{
        //         alert('Unknown Error!');
        //     }
            
        // })
    };
});
