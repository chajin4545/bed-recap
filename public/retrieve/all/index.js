function addToTable(code, name, credit) {
    // Read more about HTML template here: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template
    const template = document.querySelector('#row-template');
    const row = template.content.firstElementChild.cloneNode(true);

    row.querySelector('.code').textContent = code;
    row.querySelector('.name').textContent = name;
    row.querySelector('.credit').textContent = credit;

    document.querySelector('#module-tbody').appendChild(row);
}

window.addEventListener('DOMContentLoaded', function () {
    //TODO: Fetch all modules in the database from the Backend
    //TODO: Add each row returned onto the HTML table using the addToTable function
});
