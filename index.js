async function x() {
    let data = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    let finalData = await data.json();
    let Result = finalData.categories;

    function escapeHtml(text) {
        return text.replace(/[&<"']/g, function(match) {
            return {
                '&': '&amp;',
                '<': '&lt;',
                '"': '&quot;',
                "'": '&#39;'
            }[match];
        });
    }

    function displayResults(results) {
        let section = document.querySelector('section');
        section.innerHTML = '';

        results.forEach((item) => {
            const escapedCategory = escapeHtml(item.strCategory);
            const escapedDescription = escapeHtml(item.strCategoryDescription);

            section.innerHTML += `<div>
                <img src="${item.strCategoryThumb}">
                <p>${escapedCategory}</p>
                <p>${escapedDescription}</p>
            </div>`;
        });
    }

    // Initial display
    displayResults(Result);

    // Add event listener to the search input
    const searchInput = document.querySelector('.links input');
    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        const filteredResults = Result.filter((item) => {
            return item.strCategory.toLowerCase().includes(searchTerm);
        });
        displayResults(filteredResults);
    });
}

x();
