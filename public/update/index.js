window.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form'); // Only have 1 form in this HTML
    form.onsubmit = function (e) {
        e.preventDefault(); // prevent using the default submit behavior

        const code = form.querySelector('input[name=code]').value;
        const credit = form.querySelector('input[name=credit]').value;

        // TODO: Implement update Module credit by Code
        const allInput = form.querySelectorAll('input, button[type=submit]');
        // Disable inputs
        allInput.forEach((input) => {
            input.disabled = true;
        });

        return fetch(`/modules/${code}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code: code,
                credit : credit
            }),
        }).then(function(response){
            console.log("response STATUS: " + response.status)
            if (response.status !== 200) return response.json(); // parse body as JSON string

            // Clear inputs
            allInput.forEach((input) => {
                if (input.type !== 'submit') input.value = '';
            });

            alert(`Module "${code}" Updated!`);
            return; // Success response has no body, hence next .then() will be null
        }
        )
        .finally(function () {
            // Enable inputs
            allInput.forEach((input) => {
                input.disabled = false;
            });
        });
    };
});
