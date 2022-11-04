
window.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form'); // Only have 1 form in this HTML
    form.onsubmit = function (e) {
        e.preventDefault(); // prevent using the default submit behavior

        const code = form.querySelector('input[name=code]').value;

        // TODO: Implement delete Module by Code
       
            const allInput = form.querySelectorAll('input, button[type=submit]');
            // Disable inputs
            allInput.forEach((input) => {
                input.disabled = true;
            });
            return fetch(`/modules/${code}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(function(response) {
                console.log("response STATUS: " + response.status)
                if (response.status !== 200) throw new Error;

                // Clear inputs
                allInput.forEach((input) => {
                    if (input.type !== 'submit') input.value = '';
                });

                alert(`Module "${code}" Deleted!`);
                return; // Success response has no body, hence next .then() will be null
            })
            .catch(function(){
                alert("Module not exist")
            })
            .finally(function () {
                // Enable inputs
                allInput.forEach((input) => {
                    input.disabled = false;
                });
            });
       
    };
});
