/*
Session storage представляет временное хранилище информации, которая удаляется после закрытия браузера.
Local storage представляет хранилище для данных на постоянной основе. Данные из local storage автоматически не удаляются и не имеют срока действия. Эти данные не передаются на сервер в запросе HTTP. Кроме того, объем local storage составляет в Chrome и Firefox 5 Mб для домена, а в IE - 10 Mб.
Все данные в web storage представляют набор пар ключ-значение. То есть каждый объект имеет уникальное имя-ключ и определенное значение.
Для работы с local storage в javascript используется объект localStorage, а для работы с session storage - объект sessionStorage.
*/

window.localStorage.setItem("login", "test@gmail.com");

console.log(window.localStorage.getItem("login"));

window.localStorage.removeItem("login"); 
window.localStorage.clear();

var user = {
    name: "Ivan",
    age: 23,
    married: false
};

window.localStorage.setItem("user", user);
var savedUser = window.localStorage.getItem("user");
console.log(savedUser); //[object Object]
console.log(savedUser.name); // undefined - savedUser - строка, а не объект

window.localStorage.setItem("user2", JSON.stringify(user));
var savedUser2 = JSON.parse(window.localStorage.getItem("user2"));
console.log(savedUser2.name + " " + savedUser2.age +" " + savedUser2.married); // Ivan 23 false


/*    cookies     */
/*
Одну из возможностей сохранения данных в javascript представляет использование куки. Для работы с куками в объекте document предназначено свойство cookie.
Для установки куков достаточно свойству document.cookie присвоить строку с куками
*/

document.cookie = "login=Ivan;";

console.log(navigator.cookieEnabled);

var expire = new Date();
expire.setHours(expire.getHours() + 4);
document.cookie = "login=Ivan;expires=" + expire.toUTCString() + ";secure=true;";
document.cookie = "country=Belarus;expires=" + expire.toUTCString() + ";";

console.log(document.cookie);

var cookies = document.cookie.split(";");
for(var i=0; i<cookies.length; i++){
 
    var parts = cookies[i].split("="),
        name = parts[0], 
        value = parts[1];
    console.log("Куки: " + name + " = " + value);
}
var dateDelete = new Date(0);
document.cookie = "country=Belarus;expires="+ dateDelete.toUTCString(); + ";";


/*   Набор полезных функций с cookies.   */
// возвращает cookie с именем name, если есть, если нет, то undefined
function getCookie(name) {
    var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

// устанавливает cookie с именем name и значением value
// options - объект с свойствами cookie (expires, path, domain, secure)
function setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}

// удаляет cookie с именем name
function deleteCookie(name) {
    setCookie(name, "", {
        expires: -1
    })
}