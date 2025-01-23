//Поиск в разметке
const containerEl = document.querySelector(".container");
const formEl = document.querySelector(".form");
const request = document.querySelector(".requestList");
const inputEl = document.querySelector(".input");
const reposList = document.querySelector(".repos");

let repositories = [];

/// Функция Debounce
const debounce = (callback, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(this, args), delay);
  };
};

//Функция запроса

async function requestUrl(e) {
  const query = e.target.value;
  const url = `https://api.github.com/search/repositories?q=${query}&per_page=5`;
  if (query.length === 0) {
    clearInput();
  }
  if (query.length !== 0) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      repositories = data.items;
      clearInput();

      data.items.forEach((el) => {
        renderRepo(el.name);
      });
    } catch (error) {
      console.error(error);
    }
  }
}

// Прорисовка списка
function renderRepo(el) {
  if (el.length === 0) {
    return;
  }
  const listEl = document.createElement("li");
  listEl.classList.add("requestEl");
  listEl.textContent = el;
  request.append(listEl);
}

//Очистка инпута
function clearInput() {
  request.innerHTML = "";
}

//Слушатель на ввод текста
inputEl.addEventListener("input", debounce(requestUrl, 500));

//Отрисовка выбранных пользователей

// function selectedCard(el) {
//   const { name, language, stargazers_count } = el;
//   const reposEl = document.createElement("li");
//   reposEl.classList.add("selected");
//   const reposDiv = document.createElement("div");
//   reposDiv.classList.add("selected__item");
//   const reposSpan = document.createElement("span");
//   reposSpan.classList.add("selected__txt");
//   reposSpan.textContent = name;
//   reposDiv.append(reposSpan);
//   const owner = document.createElement("span");
//   owner.classList.add(selected__txt);
//   owner.textContent = language;
//   reposDiv.append(owner);
//   const stars = document.createElement("span");
//   stars.classList.add(selected__txt);
//   stars.textContent = language;
//   reposDiv.append(stargazers_count);
//   const button = document.createElement("button");
//   button.classList.add("btn");
//   reposEl.append(button);
//   reposList.append(reposEl);
// }

// /// Кнопка закрытия

// function closeBtn(e) {
//   if (e.target.closest("btn")) {
//     e.target.parentNode.remove();
//   } else {
//     return;
//   }
// }

// reposList.addEventListener("click", closeBtn);
// request.addEventListener("click", (evt) => {
//   repositories.find((item) => {
//     if (item.name === evt.target.textContent) {
//       selectedCard(item);
//       input.value = "";
//       clearInput();
//     }
//     return;
//   });
// });
function selectedCard(el) {
  const { name, language, stargazers_count } = el;

  // Создаем корневой элемент списка
  const reposEl = document.createElement("li");
  reposEl.classList.add("selected");

  // Создаем обертку для контента
  const reposDiv = document.createElement("div");
  reposDiv.classList.add("selected__item");

  // Название репозитория
  const reposSpan = document.createElement("span");
  reposSpan.classList.add("selected__txt");
  reposSpan.textContent = name;
  reposDiv.append(reposSpan);

  const owner = document.createElement("span");
  owner.classList.add("selected__txt");
  owner.textContent = language;
  reposDiv.append(owner);

  const stars = document.createElement("span");
  stars.classList.add("selected__txt");
  stars.textContent = `${stargazers_count}`;
  reposDiv.append(stars);

  reposEl.append(reposDiv);

  const button = document.createElement("button");
  button.classList.add("btn");
  reposEl.append(button);

  clearInput();
  reposList.append(reposEl);
}

function closeBtn(e) {
  const button = e.target.closest(".btn");
  if (button) {
    button.parentNode.remove();
  }
}

reposList.addEventListener("click", closeBtn);
request.addEventListener("click", (evt) => {
  const clickedRepoName = evt.target.textContent.trim();

  const selectedRepo = repositories.find(
    (item) => item.name === clickedRepoName
  );

  if (selectedRepo) {
    selectedCard(selectedRepo);
    inputEl.value = "";
    clearInput();
  }
});
