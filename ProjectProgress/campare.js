// const body = document.body;

// const navbar = document.createElement('div');
// navbar.setAttribute('class', 'navbar');
// body.appendChild(navbar);

// let inputSearch = document.createElement('input');
// inputSearch.setAttribute('class', 'search');
// inputSearch.setAttribute("placeholder", 'Please write hero name');
// navbar.appendChild(inputSearch);


// const buttonOfCompare = document.createElement("button");
// buttonOfCompare.setAttribute('onclick', "compareHero");
// buttonOfCompare.setAttribute('class', 'buttonOfCompare');
// buttonOfCompare.innerHTML = "Compare";
// navbar.appendChild(buttonOfCompare);

// const span = document.createElement('span');
// span.innerHTML = 'No Result';
// body.appendChild(span);

// const closeWindow = document.createElement('button');
// closeWindow.innerHTML = 'X';
// closeWindow.setAttribute('class', 'buttonOfClose');
// closeWindow.setAttribute('onclick', 'Close');


// const arr = [{
//     players: "Players Id",
//     name: 'name',
//     localName: "Local Name",
//     primary_attr: "Primary",
//     attack_type: 'Attack',
//     roles: 'Roles',
//     legs: 'Legs',
//     type: 'th',
// }];


// const gallary = document.createElement('div');
// gallary.setAttribute('class', 'gallary');
// body.appendChild(gallary);

// fetch('https://api.opendota.com/api/heroStats').then(function (response) {
//     return response.json();
// }).then(function (data) {
//     setTimeout(function () {
//         drawHeroes(data);
//     }, 1000)
// });


// function drawHeroes(arr) {
//     arr.forEach(function ({ ...item }) {
//         const div = document.createElement('div');
//         div.setAttribute('class', 'heroImg');
//         Object.keys(item).forEach(function (key) {
//             if (key === "img" && item.id !== 135) {
//                 let url = "https://api.opendota.com";
//                 const img = new Image(150, 150);
//                 img.src = url + item[key];
//                 img.setAttribute('alt', 'Server not found this picture');
//                 div.appendChild(img);
//                 gallary.appendChild(div);
//             };
//             if (item.id === 135 && key === "img") {
//                 const img = new Image(150, 150);
//                 img.src = "https://static.wikia.nocookie.net/dota2_gamepedia/images/d/d6/Dawnbreaker_icon.png/revision/latest/scale-to-width-down/256?cb=20210410124439";
//                 div.appendChild(img);
//                 gallary.appendChild(div);
//             }
//             const nameOfHero = document.createElement('p');
//             div.onmouseover = function showName() {
//                 nameOfHero.innerHTML = item.localized_name;
//                 div.appendChild(nameOfHero);
//                 nameOfHero.style.display = 'block';
//                 nameOfHero.style.border = "none";
//             }
//             div.onmouseleave = function hideName() {
//                 nameOfHero.style.display = 'none';
//             }
//             //----------
//         });
//     });
//     localStorage.setItem('key', JSON.stringify(arr));
// }


// const array = localStorage.getItem('key');
// const resultOfRequest = JSON.parse(array);
// let searchText = '';
// let id;


// inputSearch.addEventListener('keyup', function () {
//     searchText = inputSearch.value;
//     refresh();
// });


// function refresh() {
//     if (id !== undefined) {
//         clearTimeout(id);
//     }
//     id = setTimeout(function () {
//         searchHero();
//     }, 1000)
// }


// let infoDiv = document.createElement('div');
// infoDiv.setAttribute('class', 'infoDiv');
// const center = document.querySelector('center');
// const container1 = document.getElementById("container");

// function searchHero() {
//     let isEmpty = true;
//     infoDiv.innerHTML = '';


//     resultOfRequest.filter(function (heroName) {
//         let heroDescription = document.createElement('div');
//         heroDescription.setAttribute('class', 'heroDescription');
//         if (heroName.localized_name.indexOf(searchText) !== -1) {
//             gallary.style.display = 'none';
//             Object.entries(heroName).map(function (key) {
//                 const element = document.createElement("div");
//                 drawImginWindow(key, element);
//                 heroDescription.appendChild(element);
//             });
//             infoDiv.appendChild(heroDescription);
//             body.appendChild(infoDiv);
//             center.style.display = 'none';
//             container1.style.display = 'block';
//             isEmpty = false;
//         }
//     });
//     if (searchText === "") {
//         gallary.style.display = 'flex';
//         infoDiv.innerHTML = '';
//         center.style.display = 'none';
//         container1.style.display = 'block';
//     }
//     if (isEmpty === true && searchText !== "") {
//         gallary.style.display = 'none';
//         body.style.backgroundColor = '#262626';
//         center.style.display = 'flex';
//         container1.style.display = 'none';
//     }
// }


// function drawImginWindow(array, div) {
//     const hr = document.createElement('hr');

//     for (let i = 0; i < array.length; i++) {
//         if (array[i] === 'img' && array[1] !== '/apps/dota2/images/heroes/dawnbreaker_full.png?') {
//             let url = "https://api.opendota.com";
//             const img = new Image(300, 180);
//             img.src = url + array[1];
//             div.appendChild(img);
//             div.setAttribute('class', "changePlace");
//         }
//         if (array[i] === 'id' || array[i] === 'localized_name' || array[i] === 'primary_attr') {
//             div.innerHTML = array[0] + " - " + array[1];
//             div.appendChild(hr);
//         }
//         else if (array[i] === 'attack_type' || array[i] === 'roles') {
//             div.innerHTML = array[0] + " - " + array[1];
//             div.appendChild(hr);
//         }
//         else if (array[i] === 'img' && array[1] === '/apps/dota2/images/heroes/dawnbreaker_full.png?') {
//             const img = new Image(180, 180);
//             img.src = "https://static.wikia.nocookie.net/dota2_gamepedia/images/d/d6/Dawnbreaker_icon.png/revision/latest/scale-to-width-down/256?cb=20210410124439";
//             div.appendChild(img);
//         }
//     }
// }







