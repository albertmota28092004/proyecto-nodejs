function fetchDepartments(id) {
    fetch(`https://api-colombia.com/api/v1/Department`)
    .then(response => response.json())
    .then(data => {
        data.forEach(department => {
            createListDepartments(department);
        });
    });
}

function createListDepartments(department){
    let departmentsContainer = document.getElementById('departments');
    let listContainer = document.createElement("div");
    listContainer.classList.add('list-container')

    let name = document.createElement("h3");
    name.textContent = department.name

    let description = document.createElement('p');
    description.textContent = department.description

    let municipalities = document.createElement('p');
    municipalities.textContent = `Municipios: ${department.municipalities}`

    listContainer.appendChild(name);
    listContainer.appendChild(description);
    listContainer.appendChild(municipalities);

    departmentsContainer.appendChild(listContainer)
}