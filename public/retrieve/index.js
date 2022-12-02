// TODO Implement GPA Calculation
/**
 * Given N modules
 *      the ith module have a credit of credits[i] and grade of grades[i]
 *
 * GPA = (sum of all (credits[i] * grades[i])) / (sum of all credits[i])
 * */
function calculateGpa(credits, grades, numberOfModules) {
    if (numberOfModules === 0) {
        return 0;
    }
    else{
        let sum = credits.reduce((partialSum, a) => partialSum + a, 0);
        let totalGPA = 0;
        let grade;
        let percentage;
        
        for (let i = 0; i < credits.length; i++) {
            percentage = credits[i]/sum;
            grade = grades[i];
            totalGPA += grade * percentage; 
        }
        return totalGPA.toFixed(2);
    }
    
}

function fetchModule(code) {
    return fetch(`/modules/${code}`).then(function (response) {
        return response.json();
    });
}

function fetchModuleRecursive(modulePromises, index, results) {
    if (index > modulePromises.length) return results;
    // No more modules to fetch. Stop calling yourself, and just return the accumulated results

    const code = modulePromises[index];
    return fetchModule(code).then(function (result) {
        // Make the next fetch after receiving response
        results.push(result); // accumulate result
        return fetchModuleRecursive(modulePromises, index + 1, results); // index + 1 to process next module
    });
}

window.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form'); // Only have 1 form in this HTML

    // Adding module to table
    form.onsubmit = function (e) {
        e.preventDefault(); // prevent using the default submit behavior
        const code = form.querySelector('input[name=code]').value;
        addToTable(code, '???', '???');
    };

    // Retrieving Module information
    document.querySelector('#retrieve').onclick = function () {
        const rows = document.querySelectorAll('tbody tr');
    
          // Extract modulePromises first
        const modulePromises = [];
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const code = row.querySelector('td:first-child').textContent;
            const nameCell = row.querySelector('td:nth-child(2)');
            const creditCell = row.querySelector('td:nth-child(3)');
    
            nameCell.textContent = 'Loading...';
            creditCell.textContent = 'Loading...';
    
            modulePromises.push(fetchModule(code));
        }
    
           // Send all the modulePromises to be fetched one at a time
           Promise.all(modulePromises).then(function (results) {
    
              // Process the each results
            for (let i = 0; i < results.length; i++) {
                const result = results[i];
                const row = rows[i];
                const nameCell = row.querySelector('td:nth-child(2)');
                const creditCell = row.querySelector('td:nth-child(3)');
                if (!result.error) { 
                      // no error
                    nameCell.textContent = result.module.name;
                    creditCell.textContent = result.module.credit;
                } else {
                    nameCell.textContent = 'XXXXXXXX';
                    creditCell.textContent = result.error;
                }
            }
        });
    };

    // Calculating GPA
    document.querySelector('#gpa button').onclick = function () {
        const rows = document.querySelectorAll('tbody tr');
        let hasErrors = false;
        const credits = [];
        const grades = [];
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const credit = +row.querySelector('td:nth-child(3)').textContent;
            const grade = +row.querySelector('td:nth-child(4) select').value;
            row.classList.remove('error');
            if (isNaN(credit) || isNaN(grade)) {
                row.classList.add('error');
                hasErrors = true;
            } else {
                credits.push(credit);
                grades.push(grade);
            }
        }
        if (hasErrors) {
            return alert('One or more rows has error, please fix or delete them before computing');
        }
        const gpa = calculateGpa(credits, grades, credits.length);
        document.querySelector('#gpa span').textContent = gpa;
    };
});
