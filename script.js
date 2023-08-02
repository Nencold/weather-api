//Создаем и выводим в html элемент select
let slc = document.createElement('select');
slc.classList.add('cities-list');
document.querySelector('.choice').prepend(slc);

//создаем переменные с элементами для вывода данных в html
    let nameWeather = document.querySelector('.weather__city-name');
    let tempWeather = document.querySelector('.temperature');
    let descWeather = document.querySelector('.description');
    let iconWeather = document.querySelector('.weather__icon');
    let directWeather = document.querySelector('.direction-wind');
    let speedWeather = document.querySelector('.wind-speed');
    let pressWeather = document.querySelector('.pressure');

//Массив с названием и id городов
let cityInfo = [
    {
        "id": 703448,
        "name": "Kyiv",
        "nameRu": 'Киев',
    },
    {
        "id": 687700,
        "name": "Zaporizhia",
        "nameRu": 'Запорожье',
    },
    {
        "id": 698740,
        "name": "Odessa",
        "nameRu": 'Одесса',
    },
    {
        "id": 702550,
        "name": "Lviv",
        "nameRu": 'Львов',
    },
    {
        "id": 706483,
        "name": "Kharkiv",
        "nameRu": 'Харьков',
    },


];

//Заполняем элемент select
for(let i = 0; i < cityInfo.length; i++){
    let opt = document.createElement('option');
    opt.textContent = cityInfo[i].nameRu;
    opt.value =  cityInfo[i].id;
    slc.append(opt);
}




//ф-я затирает вывод данных 
function reset (){
    nameWeather.textContent = '';
    tempWeather.textContent = '';
    descWeather.textContent = '';
    iconWeather.textContent = '';
    directWeather.textContent = '';
    speedWeather.textContent = '';
    pressWeather.textContent = '';

}

//ф-я получает данные о погоде
function getWeather(){
    const id = slc.value;
    fetch(`http://api.openweathermap.org/data/2.5/weather?id=${id}&appid=70e1ed322b02acbc57d443dd91065f3e&lang=ru`)
    .then(function (resp) { return resp.json() })
    .then(function (data) {
       showWeather(data)
    });
}
//ф-я выводит данные в html
function showWeather(data){
    reset ();//затираем данные при запуске ф-ии
    nameWeather.innerHTML = `<h1>${data.name}</h1>`;
    tempWeather.innerHTML = `${Math.round(data.main.temp - 273)}&deg`;
    descWeather.textContent = data.weather[0]['description'];
    iconWeather.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
    directWeather.innerHTML = `<img src="image/direction.png"> ${data.wind.deg}&deg;`;
    speedWeather.innerHTML = `<img src="image/wind.png"> ${data.wind.speed}метр/сек`;
    pressWeather.innerHTML = `<img src="image/pressure.png"> ${data.main.pressure}мм рт.ст.`;
    console.log(data.weather[0]['description'])
}

//Подключаем событие. При смене города
slc.onchange =  getWeather;
getWeather();