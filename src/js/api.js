import '../css/styles.css';

//cerca
const apiUrl = 'https://openlibrary.org/search.json?title=';
let search = document.getElementById("searchButton");
const resultContainer = document.getElementById("risultati-api");
const resultDescription = document.getElementById("descriptionBooks");

search.addEventListener("click", function(){

// Ottieni il valore dell'input
const inputValue = document.getElementById("input").value.trim();

// Verifica se l'input è valido
if (!inputValue) {
console.error('Please enter a valid title');
return;
}

// Effettua la chiamata all'API utilizzando la Fetch API
fetch(`${apiUrl}${inputValue}`)
.then(response => {
    // Controlla se la richiesta ha avuto successo (status code 200-299)
    if (!response.ok) {
        throw new Error(`Error in API request: ${response.status}`);
    }
    // Parsifica la risposta JSON
    return response.json();
})
.then(response => {

    // Verifica se la risposta contiene l'array "docs"
    if (response.docs && response.docs.length > 0) {
        // I dati sono disponibili qui
        for (let i = 0; i < Math.min(10, response.docs.length); i++) {

            const title = document.createElement("h2");
            title.textContent = response.docs[i].title;
            resultContainer.appendChild(title);

            const line = document.createElement("hr");
            line.classList.add("marginHr");
            resultContainer.appendChild(line);

            const author = document.createElement("p");
            author.textContent = response.docs[i].author_name[0];
            resultContainer.appendChild(author);

            const button = document.createElement("button");
            button.textContent = "Click here for description";
            button.classList.add("buttonSearch");
            button.addEventListener("click", function(){

                    const apiUrl = `https://openlibrary.org${response.docs[i].key}.json`;

                    // Esegui la richiesta fetch
                    fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                        // La struttura di 'data' dipenderà dai dettagli restituiti dall'API di Open Library

                        // Verifica se ci sono dati disponibili
                        if(!data.description){
                            const noDescription = document.createElement("p");
                            noDescription.textContent = "There is no description for this book";
                            resultDescription.appendChild(noDescription);
                        }
                        else if(data.description.value){
                            const descriptionText = document.createElement("p");
                            descriptionText.textContent = data.description.value;
                            resultDescription.appendChild(descriptionText);
                        }
                        else{
                            const descriptionText = document.createElement("p");
                            descriptionText.textContent = data.description;
                            resultDescription.appendChild(descriptionText);
                        }
                        // Estrai informazioni specifiche come titolo e autore
                        const line = document.createElement("hr");
                        line.classList.add("marginHr");
                        resultDescription.appendChild(line);
                        // Fai qualcosa con le informazioni estratte
                        console.log(data);
                    })
                    .catch(error => {
                        console.error('Error during request:', error);
                    });
            });

            resultContainer.appendChild(button);

            const image = document.createElement("img");
            image.src = `https://covers.openlibrary.org/b/isbn/${response.docs[i].isbn[0]}-M.jpg`;
            resultContainer.appendChild(image);
            console.log(response.docs[i].key);

        }
    } else {
        console.error('The JSON response does not contain a valid "docs" array.');
    }
})
.catch(error => {
    // Gestisci gli errori
    console.error('Error calling API:', error);
});

});


//categoria
const apiUrlCategory = 'https://openlibrary.org/subjects/';
let searchCategory = document.getElementById("submitSearchCategory");

searchCategory.addEventListener("click", function(){

// Ottieni il valore dell'input
const inputValue = document.getElementById("inputSearchCategory").value;

// Verifica se l'input è valido
if (!inputValue) {
console.error('Please enter a valid category');
return;
}

// Effettua la chiamata all'API utilizzando la Fetch API
fetch(`${apiUrl}${inputValue}`)
.then(response => {
// Controlla se la richiesta ha avuto successo (status code 200-299)
if (!response.ok) {
throw new Error(`Error in API request: ${response.status}`);
}
// Parsifica la risposta JSON
return response.json();
})
.then(response => {

// Verifica se la risposta contiene l'array "docs"
if (response.docs && response.docs.length > 0) {
// I dati sono disponibili qui
for (let i = 0; i < Math.min(10, response.docs.length); i++) {

    const title = document.createElement("h2");
    title.textContent = response.docs[i].title;
    resultContainer.appendChild(title);

    const line = document.createElement("hr");
    line.classList.add("marginHr");
    resultContainer.appendChild(line);

    const author = document.createElement("p");
    author.textContent = response.docs[i].author_name[0];
    resultContainer.appendChild(author);

    const button = document.createElement("button");
    button.textContent = "Click here for description";
    button.classList.add("buttonSearch");
    button.addEventListener("click", function(){

            const apiUrl = `https://openlibrary.org${response.docs[i].key}.json`;

            // Esegui la richiesta fetch
            fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // La struttura di 'data' dipenderà dai dettagli restituiti dall'API di Open Library

                // Verifica se ci sono dati disponibili
                if(!data.description){
                    const noDescription = document.createElement("p");
                    noDescription.textContent = "There is no description for this book";
                    resultDescription.appendChild(noDescription);
                }
                else if(data.description.value){
                    const descriptionText = document.createElement("p");
                    descriptionText.textContent = data.description.value;
                    resultDescription.appendChild(descriptionText);
                }
                else{
                    const descriptionText = document.createElement("p");
                    descriptionText.textContent = data.description;
                    resultDescription.appendChild(descriptionText);
                }

                const line = document.createElement("hr");
                line.classList.add("marginHr");
                resultDescription.appendChild(line);
                // Estrai informazioni specifiche come titolo e autore

                // Fai qualcosa con le informazioni estratte
                console.log(data);
            })
            .catch(error => {
                console.error('Error during request:', error);
            });
    });

    resultContainer.appendChild(button);

    const image = document.createElement("img");
    image.src = `https://covers.openlibrary.org/b/isbn/${response.docs[i].isbn[0]}-M.jpg`;
    resultContainer.appendChild(image);
}
} else {
console.error('The JSON response does not contain a valid "docs" array.');
}
})
.catch(error => {
// Gestisci gli errori
console.error('Error calling API:', error);
});

});



//per cercare dai 11 a 20
const apiUrl2 = 'https://openlibrary.org/search.json?title=';
let moreSearch= document.getElementById("moreSearchButton");

moreSearch.addEventListener("click", function(){

// Ottieni il valore dell'input
const inputValue = document.getElementById("input").value.trim();

// Verifica se l'input è valido
if (!inputValue) {
console.error('Please enter a valid title');
return;
}

// Effettua la chiamata all'API utilizzando la Fetch API
fetch(`${apiUrl2}${inputValue}`)
.then(response => {
    // Controlla se la richiesta ha avuto successo (status code 200-299)
    if (!response.ok) {
        throw new Error(`Error in API request: ${response.status}`);
    }
    // Parsifica la risposta JSON
    return response.json();
})
.then(response => {
    // Verifica se la risposta contiene l'array "docs"
    if (response.docs && response.docs.length > 0) {
        // I dati sono disponibili qui
        for (let i = 11; 11 < i < Math.max(21, response.docs.length); i++) {
            const title = document.createElement("h2");
            title.textContent = response.docs[i].title;
            resultContainer.appendChild(title);

            const line = document.createElement("hr");
            line.classList.add("marginHr");
            resultContainer.appendChild(line);

            const author = document.createElement("p");
            author.textContent = response.docs[i].author_name[0];
            resultContainer.appendChild(author);


            const button = document.createElement("button");
            button.textContent = "Click here for description";
            button.classList.add("buttonSearch");
            button.addEventListener("click", function(){

                    const apiUrl = `https://openlibrary.org${response.docs[i].key}.json`;

                    // Esegui la richiesta fetch
                    fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                        // La struttura di 'data' dipenderà dai dettagli restituiti dall'API di Open Library

                        // Verifica se ci sono dati disponibili
                        if(!data.description){
                            const noDescription = document.createElement("p");
                            noDescription.textContent = "There is no description for this book";
                            resultDescription.appendChild(noDescription);
                        }
                        else if(data.description.value){
                            const descriptionText = document.createElement("p");
                            descriptionText.textContent = data.description.value;
                            resultDescription.appendChild(descriptionText);
                        }
                        else{
                            const descriptionText = document.createElement("p");
                            descriptionText.textContent = data.description;
                            resultDescription.appendChild(descriptionText);
                        }
                        // Estrai informazioni specifiche come titolo e autore
                        const line = document.createElement("hr");
                        line.classList.add("marginHr");
                        resultDescription.appendChild(line);
                        // Fai qualcosa con le informazioni estratte
                        console.log(data);
                    })
                    .catch(error => {
                        console.error('Error during request:', error);
                    });
            });

            resultContainer.appendChild(button);


            const image = document.createElement("img");
            image.src = `https://covers.openlibrary.org/b/isbn/${response.docs[i].isbn[0]}-M.jpg`;
            resultContainer.appendChild(image);



        }
    } else {
        console.error('The JSON response does not contain a valid "docs" array.');
    }
})
.catch(error => {
    // Gestisci gli errori
    console.error('Error calling API:', error);
});

});



