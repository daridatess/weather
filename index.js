const link =
  'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=817828f726badef01796590885c8bf9b';
const root = document.getElementById('container');
const dataTime = new Date();
const city = document.getElementsByClassName('selected_city');

let store = {
  temp: 0,
  feels_like: 0,
  all: 0,
  visibility: 0,
  humidity: 0,
  pressure: 0,
  speed: 0,
  nameCity: '',
  country: '',
  description: '',
  main: '',
  lat: 0,
  lon: 0,
  degree: 'metric',
  language: 'en',
};

// Получение геолокации по IP //

async function geoFindMe(position) {
  store.lat = position.coords.latitude;
  store.lon = position.coords.longitude;

  const result = await fetch(`${link}&&lat=${store.lat}&lon=${store.lon}`);
  const data = await result.json();

  store.nameCity = data.city.name;
  fetchData(store.nameCity);
}

function error() {
  alert('Невозможно получить ваше местоположение');
}

if (!navigator.geolocation) {
  alert('Geolocation не поддерживается вашим браузером');
} else {
  // alert('Определение местоположения…');
  navigator.geolocation.getCurrentPosition(geoFindMe, error);
}

// Запрос на сервер

const fetchData = async (
  nameCity,
  degree = localStorage.getItem('degree'),
  lang = localStorage.getItem('lang'),
) => {
  const result = await fetch(`${link}&units=${degree}&q=${nameCity}&lang=${lang}`);
  const data = await result.json();

  const {
    city: {
      coord: { lat, lon },
      name,
      country,
    },
    list: [
      {
        main: {
          feels_like: feelsLike,
          humidity,
          pressure,
          temp,
          temp_max: tempMax,
          temp_min: tempMin,
        },
        visibility,
        weather: [{ description, main }],
        wind: { speed },
      },
    ],
  } = data;

  store = {
    ...store,
    nameCity: name,
    country,
    feelsLike: Math.round(feelsLike),
    humidity,
    pressure,
    temp: Math.round(temp),
    tempMax: Math.round(tempMax),
    tempMin: Math.round(tempMin),
    visibility: visibility / 1000,
    description: description[0].toUpperCase() + description.slice(1),
    main,
    speed: Math.round(speed),
    lat,
    lon,
  };

  const getNameCity = document.querySelector('.city-name');
  const getInfoDays = document.querySelector('.day-information');
  const getTodayTemp = document.querySelector('.data-num-temp');
  const getOvercast = document.querySelector('.cloudiness');
  const getFreelslike = document.querySelector('.freelslike');
  const gethumdity = document.querySelector('.humdity');
  const getWind = document.querySelector('.wind');
  const getDataWeatherDay = document.querySelectorAll('.title-info-day');
  const getTempNextDay = document.querySelectorAll('.data-temp-day');
  const getDataLat = document.querySelector('.lat');
  const getDataLon = document.querySelector('.lon');
  getDataLat.innerHTML = 'Latitude: ' + dataLocations(store.lat);
  getDataLon.innerHTML = 'Longitude: ' + dataLocations(store.lon);
  for (let i = 0; i < getTempNextDay.length; i++) {
    getTempNextDay[i].innerHTML = store.temp + '°';
  }
  for (let i = 0; i < getDataWeatherDay.length; i++) {
    getDataWeatherDay[i].innerHTML = dataDays(localStorage.getItem('lang'), i + 1);
  }
  gethumdity.innerHTML = 'HUDMUNTY: ' + `${store.humidity}` + '%';
  getWind.innerHTML = 'WIND: ' + `${store.speed}` + 'm/s';
  getFreelslike.innerHTML = 'FEELS LIKE: ' + `${store.feelsLike}` + '°';
  getOvercast.innerHTML = store.description;
  getNameCity.innerHTML = store.nameCity + ', ' + store.country;
  getInfoDays.innerHTML = `${
    dataDays(localStorage.getItem('lang')).slice(0, 3) +
    ' ' +
    dataTime.getDate() +
    ' ' +
    month(store.language) +
    '   ' +
    dataTime.getHours() +
    ':' +
    dataTime.getMinutes()
  }`;
  getTodayTemp.innerHTML = store.temp;
};

// Определение месяца //

function month(language) {
  switch (dataTime.getMonth()) {
    case 1:
      if (language === 'ru') {
        return (store.month = 'Январь');
      } else {
        return (store.month = 'January');
      }
    case 2:
      if (language === 'ru') {
        return (store.month = 'Февраль');
      } else {
        return (store.month = 'February');
      }
    case 3:
      if (language === 'ru') {
        return (store.month = 'Март');
      } else {
        return (store.month = 'March');
      }
    case 4:
      if (language === 'ru') {
        return (store.month = 'Апрель');
      } else {
        return (store.month = 'April');
      }
    case 5:
      if (language === 'ru') {
        return (store.month = 'Май');
      } else {
        return (store.month = 'May');
      }
    case 6:
      if (language === 'ru') {
        return (store.month = 'Июнь');
      } else {
        return (store.month = 'June');
      }
    case 7:
      if (language === 'ru') {
        return (store.month = 'Июнь');
      } else {
        return (store.month = 'July');
      }
    case 8:
      if (language === 'ru') {
        return (store.month = 'Август');
      } else {
        return (store.month = 'August');
      }
    case 9:
      if (language === 'ru') {
        return (store.month = 'Сентябрь');
      } else {
        return (store.month = 'September');
      }
    case 10:
      if (language === 'ru') {
        return (store.month = 'Октябрь');
      } else {
        return (store.month = 'October');
      }
    case 11:
      if (language === 'ru') {
        return (store.month = 'Ноябрь');
      } else {
        return (store.month = 'November');
      }
    case 12:
      if (language === 'ru') {
        return (store.month = 'Декабрь');
      } else {
        return (store.month = 'December');
      }
  }
}

const dataDays = (language, day = 0) => {
  const daysRu = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ];
  const daysEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  if (language == 'en') {
    return daysEn.filter((el, index) => index === dataTime.getDay() + day).toString();
  } else if (language == 'ru') {
    return daysRu.filter((el, index) => index === dataTime.getDay() + day).toString();
  }
};

const dataLocations = (location) => {
  return String(location).slice(0, 5).replace('.', '°');
};

const btn = document.querySelector('#search');
btn.addEventListener('submit', function (e) {
  e.preventDefault();
  const inputSearch = document.querySelector('#valueInput');
  fetchData(inputSearch.value);
});

// Функция смены фона

const imgBackground = ['img/bg/bg1.png', 'img/bg/bg2.png', 'img/bg/bg3.png'];

let i = 0;

const rerlaceImgBackground = () => {
  if (i >= imgBackground.length) {
    i = 0;
  }
  const getCurrentBackground = document.querySelector('.wrap');
  getCurrentBackground.style.backgroundImage = `url(${imgBackground[i]})`;
  i++;
};

rerlaceImgBackground();

// Смена измерения температуры

const getBtnMeasurement = document.querySelector('.type-measurement');
getBtnMeasurement.addEventListener('click', (e) => {
  for (let i = 0; i < getBtnMeasurement.children.length; i++) {
    getBtnMeasurement.children[i].classList.remove('active');
  }
  e.target.classList.add('active');
  if (e.target.classList[0] === 'degrees') {
    store.degree = 'metric';
  } else {
    store.degree = 'imperial';
  }
  localStorage.setItem('degree', store.degree);
  const inputSearch = document.querySelector('#valueInput');
  fetchData(inputSearch.value, (degree = localStorage.getItem('degree')));
});

// Смена языка //

const getSelectedLanguage = document.querySelector('.select-menu');
getSelectedLanguage.addEventListener('change', () => {
  const inputSearch = document.querySelector('#valueInput');
  store.language = getSelectedLanguage.value;
  localStorage.setItem('lang', getSelectedLanguage.value);
  dataDays(store.language, 0);
  fetchData(inputSearch.value, store.degree, store.language);
});

// localStorage //
