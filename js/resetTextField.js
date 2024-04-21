document.addEventListener('DOMContentLoaded', function () {
    var searchInput = document.getElementById('searchInput');
    var resetButton = document.getElementById('resetButton');

    searchInput.addEventListener('input', function () {
        resetButton.style.display = this.value.length > 0 ? 'block' : 'none';
    });

    resetButton.addEventListener('click', function () {
        searchInput.value = '';
        this.style.display = 'none';
        searchInput.focus();
    });
});