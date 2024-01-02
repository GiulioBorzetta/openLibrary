import "../css/styles.css";

const apiUrl = "https://openlibrary.org/search.json?title=";
let search = document.getElementById("searchButton");
const resultContainer = document.getElementById("risultati-api");
const resultDescription = document.getElementById("descriptionBooks");

search.addEventListener("submit", async function (event) {
  event.preventDefault();

  const inputValue = document.getElementById("input").value.trim();

  if (!inputValue) {
    console.error("Please enter a valid title");
    const textError = document.createElement("h2");
    textError.textContent = "Please enter a valid title";
    resultContainer.appendChild(textError);
    return;
  }

  const loading = document.createElement("div");
  loading.classList.add("loading");
  loading.textContent = "Loading&#8230;";
  resultContainer.appendChild(loading);

  await fetch(`${apiUrl}${inputValue}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error in API request: ${response.status}`);
      }

      return response.json();
    })
    .then((response) => {
      resultContainer.removeChild(loading);

      if (response.docs && response.docs.length > 0) {
        for (let i = 0; i < Math.min(10, response.docs.length); i++) {
          const totalBooks = response.docs.length;
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
          button.addEventListener("click", async function () {
            const apiUrl = `https://openlibrary.org${response.docs[i].key}.json`;

            await fetch(apiUrl)
              .then((response) => response.json())
              .then((data) => {
                if (!data.description) {
                  const noDescription = document.createElement("p");
                  noDescription.textContent =
                    "There is no description for this book";
                  resultDescription.appendChild(noDescription);
                } else if (data.description.value) {
                  const descriptionText = document.createElement("p");
                  descriptionText.textContent = data.description.value;
                  resultDescription.appendChild(descriptionText);
                } else {
                  const descriptionText = document.createElement("p");
                  descriptionText.textContent = data.description;
                  resultDescription.appendChild(descriptionText);
                }

                const line = document.createElement("hr");
                line.classList.add("marginHr");
                resultDescription.appendChild(line);
              })
              .catch((error) => {
                console.error("Error during request:", error);
                const ErrorCatch = document.createElement("h2");
                (ErrorCatch.textContent = "Error during request:"), error;
                resultContainer.appendChild(ErrorCatch);
              });
          });

          resultContainer.appendChild(button);

          const image = document.createElement("img");
          image.src = `https://covers.openlibrary.org/b/isbn/${response.docs[i].isbn[0]}-M.jpg`;
          resultContainer.appendChild(image);
        }
      } else {
        console.error(
          'The JSON response does not contain a valid "docs" array.'
        );
        const textError = document.createElement("h2");
        textError.textContent =
          "the book you are looking for does not exist or the title is incorrect";
        resultContainer.appendChild(textError);
      }
    })
    .catch((error) => {
      console.error("Error calling API:", error);
      const textErrorApi = document.createElement("h2");
      textErrorApi.textContent =
        "There was an error searching the API. Please try again later";
      resultContainer.appendChild(textErrorApi);
    })

    .finally(() => {
      const numberBooks = document.createElement("h2");
      numberBooks.textContent = `Books found!`;
      resultContainer.appendChild(numberBooks);
    });
});

const apiUrlCategory = "https://openlibrary.org/subjects/";
let searchCategory = document.getElementById("submitSearchCategory");

searchCategory.addEventListener("submit", async function (event) {
  event.preventDefault();

  const inputValue = document.getElementById("inputSearchCategory").value;

  if (!inputValue) {
    console.error("Please enter a valid category");
    return;
  }

  const loading = document.createElement("div");
  loading.classList.add("loading");
  loading.textContent = "Loading&#8230;";
  resultContainer.appendChild(loading);

  await fetch(`${apiUrl}${inputValue}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error in API request: ${response.status}`);
      }

      return response.json();
    })
    .then((response) => {
      resultContainer.removeChild(loading);
      if (response.docs && response.docs.length > 0) {
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
          button.addEventListener("click", async function () {
            const apiUrl = `https://openlibrary.org${response.docs[i].key}.json`;

            await fetch(apiUrl)
              .then((response) => response.json())
              .then((data) => {
                if (!data.description) {
                  const noDescription = document.createElement("p");
                  noDescription.textContent =
                    "There is no description for this book";
                  resultDescription.appendChild(noDescription);
                } else if (data.description.value) {
                  const descriptionText = document.createElement("p");
                  descriptionText.textContent = data.description.value;
                  resultDescription.appendChild(descriptionText);
                } else {
                  const descriptionText = document.createElement("p");
                  descriptionText.textContent = data.description;
                  resultDescription.appendChild(descriptionText);
                }

                const line = document.createElement("hr");
                line.classList.add("marginHr");
                resultDescription.appendChild(line);
              })
              .catch((error) => {
                console.error("Error during request:", error);
                const ErrorCatch = document.createElement("h2");
                (ErrorCatch.textContent = "Error during request:"), error;
                resultContainer.appendChild(ErrorCatch);
              });
          });

          resultContainer.appendChild(button);

          const image = document.createElement("img");
          image.src = `https://covers.openlibrary.org/b/isbn/${response.docs[i].isbn[0]}-M.jpg`;
          resultContainer.appendChild(image);
        }
      } else {
        console.error(
          'The JSON response does not contain a valid "docs" array.'
        );
        const textError = document.createElement("h2");
        textError.textContent =
          "the book you are looking for does not exist or the title is incorrect";
        resultContainer.appendChild(textError);
      }
    })
    .catch((error) => {
      console.error("Error calling API:", error);
      const textErrorApi = document.createElement("h2");
      textErrorApi.textContent =
        "There was an error searching the API. Please try again later";
      resultContainer.appendChild(textErrorApi);
    })

    .finally(() => {
      const numberBooks = document.createElement("h2");
      numberBooks.textContent = `Books found!`;
      resultContainer.appendChild(numberBooks);
    });
});

const apiUrl2 = "https://openlibrary.org/search.json?title=";
let moreSearch = document.getElementById("moreSearchButton");

moreSearch.addEventListener("submit", async function (event) {
  event.preventDefault();

  const inputValue = document.getElementById("input").value.trim();

  if (!inputValue) {
    console.error("Please enter a valid title");
    return;
  }

  const loading = document.createElement("div");
  loading.classList.add("loading");
  loading.textContent = "Loading&#8230;";
  resultContainer.appendChild(loading);

  await fetch(`${apiUrl2}${inputValue}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error in API request: ${response.status}`);
      }

      return response.json();
    })
    .then((response) => {
      resultContainer.removeChild(loading);
      if (response.docs && response.docs.length > 0) {
        for (let i = 11; 11 < i < Math.max(21, response.docs.length); i++) {
          const title = document.createElement("h2");
          if (!response.docs[i].title) {
            title.textContent = "no Title for this book";
            resultContainer.appendChild(title);
          } else {
            title.textContent = response.docs[i].title;
            resultContainer.appendChild(title);
          }

          const line = document.createElement("hr");
          line.classList.add("marginHr");
          resultContainer.appendChild(line);

          const author = document.createElement("p");
          author.textContent = response.docs[i].author_name[0];
          resultContainer.appendChild(author);

          const button = document.createElement("button");
          button.textContent = "Click here for description";
          button.classList.add("buttonSearch");
          button.addEventListener("submit", async function () {
            const apiUrl = `https://openlibrary.org${response.docs[i].key}.json`;

            await fetch(apiUrl)
              .then((response) => response.json())
              .then((data) => {
                if (!data.description) {
                  const noDescription = document.createElement("p");
                  noDescription.textContent =
                    "There is no description for this book";
                  resultDescription.appendChild(noDescription);
                } else if (data.description.value) {
                  const descriptionText = document.createElement("p");
                  descriptionText.textContent = data.description.value;
                  resultDescription.appendChild(descriptionText);
                } else {
                  const descriptionText = document.createElement("p");
                  descriptionText.textContent = data.description;
                  resultDescription.appendChild(descriptionText);
                }

                const line = document.createElement("hr");
                line.classList.add("marginHr");
                resultDescription.appendChild(line);
              })
              .catch((error) => {
                console.error("Error during request:", error);
                const ErrorCatch = document.createElement("h2");
                (ErrorCatch.textContent = "Error during request:"), error;
                resultContainer.appendChild(ErrorCatch);
              });
          });

          resultContainer.appendChild(button);

          const image = document.createElement("img");
          image.src = `https://covers.openlibrary.org/b/isbn/${response.docs[i].isbn[0]}-M.jpg`;
          resultContainer.appendChild(image);
        }
      } else {
        console.error(
          'The JSON response does not contain a valid "docs" array.'
        );
        const textError = document.createElement("h2");
        textError.textContent =
          "the book you are looking for does not exist or the title is incorrect";
        resultContainer.appendChild(textError);
      }
    })
    .catch((error) => {
      console.error("Error calling API:", error);
      const textErrorApi = document.createElement("h2");
      textErrorApi.textContent =
        "There was an error searching the API. Please try again later";
      resultContainer.appendChild(textErrorApi);
    })
    .finally(() => {
      const numberBooks = document.createElement("h2");
      numberBooks.textContent = `Books found!`;
      resultContainer.appendChild(numberBooks);
    });
});
