window.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form'); // Only have 1 form in this HTML
    form.onsubmit = function (e) {
        e.preventDefault(); // prevent using the default submit behavior

        const code = form.querySelector('input[name=code]').value;

        const codeTd = document.querySelector('table tbody td.code');
        const nameTd = document.querySelector('table tbody td.name');
        const creditTd = document.querySelector('table tbody td.credit');

        function setTableContent(code, name, credit) {
            codeTd.textContent = code;
            nameTd.textContent = name;
            creditTd.textContent = credit;
        }

        setTableContent('...', '...', '...');
        return fetch(`http://localhost:3000/modules/${code}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (body) {
                // If there's an error
                if (body.error) {
                    setTableContent('xxx', 'xxx', 'xxx');
                    return alert(body.error);
                }

                const module = body.module;
                setTableContent(module.code, module.name, module.credit);
            });
    };
});
