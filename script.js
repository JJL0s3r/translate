const btnCopy = document.querySelector("#btnCopy");
btnCopy.style.display = "none"; // Oculta o botão "Copiar" inicialmente

btnCopy.addEventListener("click", () => {
  const textareaTo = document.querySelector("#textareaTo");
  navigator.clipboard.writeText(textareaTo.value)
    .then(() => {
      alert("Tradução copiada: " + textareaTo.value);
    })
    .catch((error) => {
      console.error("Erro ao copiar tradução: ", error);
    });
});

const textareaFrom = document.querySelector("#textareaFrom");
const textareaTo = document.querySelector("#textareaTo");
const btnTranslate = document.querySelector("#btnTranslate");
const selects = document.querySelectorAll("select");

const countries = {
  "en-GB": "Inglês",
  "es-ES": "Espanhol",
  "it-IT": "Italiano",
  "ja-JP": "Japonês",
  "pt-BR": "Português",
};

selects.forEach((tag) => {
  for (let country in countries) {
    let selected;
    if (tag.className.includes("selectFrom") && country == "pt-BR") {
      selected = "selected";
    } else if (tag.className.includes("selectTo") && country == "en-GB") {
      selected = "selected";
    }

    const option = `<option value="${country}" ${selected}>${countries[country]}</option>`;

    tag.insertAdjacentHTML("beforeend", option);
  }
});

btnTranslate.addEventListener("click", () => {
  if (textareaFrom.value) {
    loadTranslation();
  } else {
    textareaTo.value = "";
  }
});

function loadTranslation() {
  fetch(
    `https://api.mymemory.translated.net/get?q=${textareaFrom.value}&langpair=${selects[0].value}|${selects[1].value}`
  )
    .then((res) => res.json())
    .then((data) => {
      textareaTo.value = data.responseData.translatedText;
      btnCopy.style.display = "block"; // Mostra o botão "Copiar" quando a tradução estiver pronta
    });
}
