"use strict";
const body = document.body;

// navbar is a menu(div) part in main page 
const navbar = document.createElement('div');
navbar.setAttribute('class', 'navbar');

// inputSearch is the input of search
let inputSearch = document.createElement('input');
inputSearch.setAttribute('class', 'search');
inputSearch.setAttribute("placeholder", 'Write hero name');
navbar.appendChild(inputSearch);

// logoFavoriteHeroes is the star of favorite heroes
const logoFavoriteHeroes = document.createElement('i');
logoFavoriteHeroes.setAttribute('class', 'fa fa-star-o fa-3x');
logoFavoriteHeroes.setAttribute('onclick', 'showFavoriteHeros')
navbar.appendChild(logoFavoriteHeroes);

// buttonOfCompare is the button which compare two heroes
const buttonOfCompare = document.createElement("button");
buttonOfCompare.setAttribute('onclick', "compareHero");
buttonOfCompare.setAttribute('class', 'buttonOfCompare');
buttonOfCompare.innerHTML = "Compare";
navbar.appendChild(buttonOfCompare);

// infoDiv is information div about search results
let infoDiv = document.createElement('div');
infoDiv.setAttribute('class', 'infoDiv');

// center and container1 is components of animation 
// they help show and hide animation
const center = document.querySelector('center');
const container1 = document.getElementById("container");

// favoriteHeroesGallery show when user add hero in his favorite list
let favoriteHeroesGallery = document.createElement('div');
favoriteHeroesGallery.setAttribute('class', 'gallary');

// this logo use when user open compare page 
const logo = new Image(160, 80);
logo.src = 'https://logos-world.net/wp-content/uploads/2020/12/Dota-2-Logo.png';
logo.setAttribute('class', 'buttonOfCompare');
logo.setAttribute('onclick', 'goMainPage');
logo.style.backgroundColor = 'white';
logo.style.borderBottom = '2px solid white';
logo.style.borderRight= '1px solid white';
logo.style.borderRadius = '10px';
logo.style.display = 'none';
navbar.appendChild(logo);

// gallary is albom of hero pictures
const gallary = document.createElement('div');
gallary.setAttribute('class', 'gallary');
body.appendChild(gallary);

// searchText is text in input
let searchText = '';
// id help refresh search when user write letter
let id;
// heroes go in compare function and compared each other
let hero_1;
let hero_2;
// click help count click in heroes and pick only two heroes to compare
let click = 0;
let likeClick = 0;
// this Dives help save last hero in div 
let firstDivForOpacity;
let secondDivForOpacity;
// this arrays keep heroes when user pick his favorite hero
let likeHeroesArray = [];
let resultOfResponse = [];


// array of compare heroes 
const arr = {
    localized_name: " Name",
    image: 'https://i.pinimg.com/originals/77/d8/20/77d820eba3c0005329022b0e2d9000b5.gif',
    base_health: 'Base Health',
    base_armor: 'Base Armor',
    base_attack_min: 'Base Attack Min',
    base_attack_max: 'Base Attack Max',
    base_str: 'Base Str',
    base_agi: 'Base Agi',
    base_int: 'Base Int',
    str_gain: 'Str Gain',
    agi_gain: 'Agi Gain',
    int_gain: 'Int Gain',
    attack_range: 'Attack Range',
    projectile_speed: 'Projectile Speed',
    attack_rate: 'Attack Rate',
    move_speed: 'Move speed',
    turn_rate: 'Turn Rate',
    legs: 'Legs',
    turbo_wins: 'Turbo Picks',
    turbo_wins: 'Turbo wins',
    pro_win: 'Pro Win',
    pro_pick: 'Pro Pick',
    pro_ban: 'Pro Ban',
};




// Request to the Server
fetch('https://api.opendota.com/api/heroStats').then(function (response) {
    return response.json();
}).then(function (data) {
    body.appendChild(navbar);
    drawHeroes(data);
    resultOfResponse = data;
});

//when user clicks on button, I'll show him 3 compareing colums
buttonOfCompare.onclick = function compareHero() {
    //if user does not select any hero
    if (hero_1 === undefined && hero_2 === undefined) {
        logo.style.display = 'block';
        buttonOfCompare.style.display = 'none';
        gallary.style.display = 'none';
        center.style.display = 'flex';
        body.style.backgroundColor = '#262626';
        container1.style.display = 'none';
        displayText = 'Please pick hero';
        textStyle = "normal normal bold 100px Arial";
        logoFavoriteHeroes.style.display = 'none';
    }
    //if user selects only one hero
    else if (hero_1 === undefined || hero_2 === undefined) {
        center.style.display = 'flex';
        container1.style.display = 'none';
        logo.style.display = 'block';
        body.style.backgroundColor = '#262626';
        buttonOfCompare.style.display = 'none';
        gallary.style.display = 'none';
        displayText = 'Please pick second hero';
        textStyle = "normal normal bold 60px Arial";
        logoFavoriteHeroes.style.display = 'none';
    }
    //if user selects one hero two times
    else if (hero_1.id === hero_2.id) {
        center.style.display = 'flex';
        container1.style.display = 'none';
        body.style.backgroundColor = '#262626';
        logo.style.display = 'block';
        buttonOfCompare.style.display = 'none';
        gallary.style.display = 'none';
        displayText = 'Please pick another hero';
        textStyle = "normal normal bold 60px Arial";
        logoFavoriteHeroes.style.display = 'none';
    }
    // now I show colums and hide animation 
    //showCompareHeroes is colling by selected hero
    else {
        logoFavoriteHeroes.style.display = 'none';
        buttonOfCompare.style.display = 'none';
        inputSearch.style.display = 'none';
        logo.style.display = 'block';
        showCompareHeroes(hero_1);
        showCompareHeroes(arr);
        showCompareHeroes(hero_2);
    }

}

//when user cklick on hero I show him main page and hide colums
logo.onclick = function goMainPage() {
    inputSearch.style.display = 'block';
    logo.style.display = 'none';
    inputSearch.value = '';
    gallary.style.display = 'flex';
    infoDiv.innerHTML = '';
    // when user go on main page, I am deleting infoDiv information
    buttonOfCompare.style.display = 'block';
    hero_1 = undefined;
    hero_2 = undefined;
    if (click > 0) {
        firstDivForOpacity.style.opacity = '1';
    }
    if (click > 1) {
        secondDivForOpacity.style.opacity = '1';
    }
    favoriteHeroesGallery.innerHTML = '';
    center.style.display = 'none';
    container1.style.display = 'flex';
    logoFavoriteHeroes.style.display = 'block';
}
// when user cklick in star, chosen hero is adding in favorite list
//and i calling drawFavoriteHeros which is drowing heroes in favorite list
logoFavoriteHeroes.onclick = function showFavoriteHeros() {
    gallary.style.display = 'none';
    buttonOfCompare.style.display = 'none';
    inputSearch.style.display = 'none';
    logo.style.display = 'block';
    logoFavoriteHeroes.style.display = 'none';
    drawFavoriteHeros(likeHeroesArray);
};


// drawHeroes is drowing heroes in main page
function drawHeroes(arr) {
    const nameOfHero = document.createElement('p');
    gallary.style.display = 'flex';

    arr.forEach(function ({ ...item }) {
        // now I am taking object of every iteration and spread it 
        const heroImg = document.createElement('div');
        heroImg.setAttribute('class', 'heroImg');
        const likeHero = document.createElement('i');
        likeHero.setAttribute('class', 'fa fa-star fa-3x');
        // I take every item of array and create pictures in the screen 
        Object.keys(item).forEach(function (key) {
            let img;
            if (key === "img") {
                 if (item.id === 135 && key === "img") {
                    img = new Image(150, 150);
                    heroImg.appendChild(likeHero);
                    img.src = "https://static.wikia.nocookie.net/dota2_gamepedia/images/d/d6/Dawnbreaker_icon.png/revision/latest/scale-to-width-down/256?cb=20210410124439";
                    heroImg.appendChild(img);
                    gallary.appendChild(heroImg);
                }   
                else{
                    let url = "https://api.opendota.com";
                    img = new Image(150, 150);
                    img.src = url + item[key];
                    img.setAttribute('alt', 'Server not found this picture');
                    heroImg.appendChild(likeHero);
                    heroImg.appendChild(img);
                    gallary.appendChild(heroImg);
                }
                // now I control user to  select only two heroes
                img.onclick = function pickHero() {
                    if (click === 0) {
                        hero_1 = item;
                        firstDivForOpacity = heroImg;
                        heroImg.style.opacity = '0.5';
                    }
                    else if (click === 1) {
                        hero_2 = item;
                        secondDivForOpacity = heroImg;
                        heroImg.style.opacity = '.5';
                    }
                    else if (click === 2) {
                        hero_1 = item;
                        firstDivForOpacity.style.opacity = '1';
                        heroImg.style.opacity = '.5';
                        firstDivForOpacity = heroImg;
                    }
                    else if (click === 3) {
                        click = 2;
                        hero_2 = item;
                        secondDivForOpacity.style.opacity = '1';
                        heroImg.style.opacity = '.5';
                        secondDivForOpacity = heroImg;
                        click--;
                    }
                    click++;
                };
            };
            // now I show heroes name by hovering
            heroImg.onmouseover = function showName() {
                heroImg.style.cursor = 'pointer';
                likeHero.style.border = 'none';
                nameOfHero.innerHTML = item.localized_name;
                heroImg.appendChild(nameOfHero);
                nameOfHero.style.display = 'block';
                nameOfHero.style.border = "none";
            };
            //when mouse live i hide heroes name
            heroImg.onmouseleave = function hideName() {
                nameOfHero.style.display = 'none';
            };
            //when user cklick in star I push this hero in the list
            likeHero.onclick = function selectFavoriteHero() {
                if (likeClick === 0) {
                    likeHero.style.color = 'red';
                    likeClick++;
                    likeHeroesArray.push(item);
                    return;
                };
                if (likeClick === 1 && likeHero.style.color !== 'red') {
                    likeHero.style.color = 'red';
                    likeHeroesArray.push(item);
                    return;
                };
                if (likeClick === 1 && likeHero.style.color === 'red') {
                    likeHero.style.color = 'yellow';
                    likeHeroesArray = likeHeroesArray.filter(function (value) {
                        return value !== item;
                    });
                };
            };
        });
    });
};
//now I filter heroes by inputed letters (words)
inputSearch.addEventListener('keyup', function () {
    searchText = inputSearch.value;
    refresh();
});
//I check validetion of inputed letters (words)
function searchTextValid(text) {
    return text.split(" ").map(function (value) {
        return value.substring(0, 1).toUpperCase() + value.substring(1, value.length).toLowerCase();
    }).join(" ").trim();
}
// I filter heros every second
function refresh() {
    if (id !== undefined) {
        clearTimeout(id);
    }
    id = setTimeout(function () {
        searchHero();
    }, 1000)
}
// I call searchHero after one second
function searchHero() {
    let isEmpty = true;
    infoDiv.innerHTML = '';
    let textValid = searchTextValid(searchText);
    // i filter array of objects
    resultOfResponse.filter(function (heroName) {
        let heroDescription = document.createElement('div');
        heroDescription.setAttribute('class', 'heroDescription');
        //I check if there is a letter i create div for filtered objects
        if (heroName.localized_name.indexOf(textValid) !== -1) {
            gallary.style.display = 'none';
            buttonOfCompare.style.display = 'none';
            // now i add heroes characters in new created div
            Object.entries(heroName).map(function (key) {
                const element = document.createElement("div");
                getSearchResult(key, element);
                heroDescription.appendChild(element);
            });
            // now I add this div in infoDiv
            infoDiv.appendChild(heroDescription);
            body.appendChild(infoDiv);
            center.style.display = 'none';
            container1.style.display = 'block';
            logoFavoriteHeroes.style.display = 'none';
            logo.style.display = 'block';
            isEmpty = false;
        }
    });
    // now I check, if searchtext is empty or searching text is not valid 
    // if empty I show galler and hide  infodiv
    if (searchText === "") {
        buttonOfCompare.style.display = 'block';
        logoFavoriteHeroes.style.display = 'block';
        gallary.style.display = 'flex';
        infoDiv.innerHTML = '';
        center.style.display = 'none';
        container1.style.display = 'block';
        logo.style.display = 'none';
        hero_1 = undefined;
        hero_2 = undefined;
        if (click > 1) {
            firstDivForOpacity.style.opacity = '1';
            secondDivForOpacity.style.opacity = '1';
        }
    }
    //or, searchtext is not valide I show animation of error
    if (isEmpty === true && searchText !== "") {
        logoFavoriteHeroes.style.display = 'none';
        logo.style.display = 'block';
        buttonOfCompare.style.display = 'none';
        gallary.style.display = 'none';
        body.style.backgroundColor = '#262626';
        center.style.display = 'flex';
        container1.style.display = 'none';
        displayText = 'Not Found';
        textStyle = "normal normal bold 100px Arial";
    }
}

// now I drow result of search
function getSearchResult(array, div) {
    const hr = document.createElement('hr');

    for (let i = 0; i < array.length; i++) {
        if (array[i] === 'img' && array[1] !== '/apps/dota2/images/heroes/dawnbreaker_full.png?') {
            let url = "https://api.opendota.com";
            const img = new Image(300, 180);
            img.src = url + array[1];
            div.appendChild(img);
            div.setAttribute('class', "changePlace");
        }
        if (array[i] === 'id' || array[i] === 'localized_name' || array[i] === 'primary_attr') {
            div.innerHTML = array[0] + " - " + array[1];
            div.appendChild(hr);
        }
        else if (array[i] === 'attack_type' || array[i] === 'roles') {
            div.innerHTML = array[0] + " - " + array[1];
            div.appendChild(hr);
        }
        else if (array[i] === 'img' && array[1] === '/apps/dota2/images/heroes/dawnbreaker_full.png?') {
            const img = new Image(300, 180);
            img.src = "https://static.wikia.nocookie.net/dota2_gamepedia/images/d/d6/Dawnbreaker_icon.png/revision/latest/scale-to-width-down/256?cb=20210410124439";
            div.appendChild(img);
        }
    };
};

// now I filter only compare charecters 
function getCompareResult(array, div) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === 'img' && array[1] !== '/apps/dota2/images/heroes/dawnbreaker_full.png?') {
            let url = "https://api.opendota.com";
            const img = new Image(300, 180);
            img.src = url + array[1];
            div.appendChild(img);
            div.setAttribute('class', "changePlace");
        }
        if (array[i] === 'localized_name' || array[i] === 'pro_ban' || array[i] === 'pro_pick' || array[i] === "pro_win") {
            div.innerHTML = array[1];
            div.style.borderBottom = "1px dashed black";
            if (array[i] === 'localized_name') {
                div.style.borderBottom = "none";
            }
            return;
        }
        if (array[i] === 'turbo_wins' || array[i] === 'turbo_wins' || array[i] === "attack_range" || array[i] === "move_speed") {
            div.innerHTML = array[1];
            div.style.borderBottom = "1px dashed black";
            return;
        }
        if (array[i] === 'attack_rate' || array[i] === 'projectile_speed' || array[i] === "int_gain" || array[i] === "agi_gain") {
            div.innerHTML = array[1];
            div.style.borderBottom = "1px dashed black";
            return;
        }
        if (array[i] === 'str_gain' || array[i] === 'base_int' || array[i] === "base_agi" || array[i] === "base_str") {
            div.innerHTML = array[1];
            div.style.borderBottom = "1px dashed black";
            return;
        }
        if (array[i] === 'base_attack_max' || array[i] === 'base_attack_min' || array[i] === "base_armor" || array[i] === "base_health") {
            div.innerHTML = array[1];
            div.style.borderBottom = "1px dashed black";
            return;
        }
        if (array[i] === 'image') {
            const img = new Image(300, 180);
            img.src = array[1];
            div.appendChild(img);
            div.setAttribute('class', "changePlace");
            return;
        }
        if (array[i] === 'img' && array[1] === '/apps/dota2/images/heroes/dawnbreaker_full.png?') {
            const img = new Image(300, 180);
            img.src = "https://static.wikia.nocookie.net/dota2_gamepedia/images/d/d6/Dawnbreaker_icon.png/revision/latest/scale-to-width-down/256?cb=20210410124439";
            div.appendChild(img);
            return;
        }
    }
}
// when everything is ready i show coloms of compareing heroes
function showCompareHeroes(hero) {
    let heroStatistic = document.createElement('div');
    heroStatistic.setAttribute('class', 'heroStatistic');
    gallary.style.display = 'none';

    Object.entries(hero).forEach(function (key) {
        const element = document.createElement("div");
        getCompareResult(key, element);
        heroStatistic.appendChild(element);
    });
    infoDiv.appendChild(heroStatistic);
    body.appendChild(infoDiv);
}
// now I am showing users favorite heroes 
function drawFavoriteHeros(arr) {
    // if array is empty I show empty list
    if(arr.length === 0){
        logoFavoriteHeroes.style.display = 'none';
        logo.style.display = 'block';
        buttonOfCompare.style.display = 'none';
        gallary.style.display = 'none';
        body.style.backgroundColor = '#262626';
        center.style.display = 'flex';
        container1.style.display = 'none';
        displayText = 'Favorite hero list is empty';
        textStyle = "normal normal bold 60px Arial";
    }
    gallary.style.display = 'none';
    favoriteHeroesGallery.innerHTML = '';
    arr.forEach(function ({ ...item }) {
        const heroImg = document.createElement('div');
        heroImg.setAttribute('class', 'heroImg');
        Object.keys(item).forEach(function (key) {
            let img;
            if (key === "img") {
                if (item.id === 135 && key === "img") {
                   img = new Image(150, 150);
                   img.src = "https://static.wikia.nocookie.net/dota2_gamepedia/images/d/d6/Dawnbreaker_icon.png/revision/latest/scale-to-width-down/256?cb=20210410124439";
                   heroImg.appendChild(img);
                   favoriteHeroesGallery.appendChild(heroImg);
               }   
               else{
                   let url = "https://api.opendota.com";
                   img = new Image(150, 150);
                   img.src = url + item[key];
                   img.setAttribute('alt', 'Server not found this picture');
                   heroImg.appendChild(img);
                   favoriteHeroesGallery.appendChild(heroImg);
               }
            }
        });
    });
    body.appendChild(favoriteHeroesGallery);
}
