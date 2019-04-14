/****** Function Declaration Statement (инструкция объявления функции) ******/

funcDeclar();

function funcDeclar() {
  console.log(1);
};

/****** Function Definition Expression (анонимная функция или функциональное выражение) ******/

funcExpr();

var funcExpr = function () {
  console.log(2);
};

funcExpr();

/****** Named function expression (именованная функция, частный случай FE) ******/
var sample = 0;

var nfe = function NFE() {
  if (sample < 5) {
      sample += 1;
      NFE();
  }
};

NFE();
nfe();
console.log(sample);

/****** Self Envoked Function (самовызывающаяся функция или немедленно исполняющаяся функция) ******/

(function(n) {
  console.log(n);
})(5);

var sampleSEF = (function(n) {
  return n;
})(5);

console.log(sampleSEF);

/****** Стрелочные функции ******/

/*
    const summa = function(a, b) {
        return(a+b);
    }
    */
    const summa = (a, b) => a+b;

    console.log(summa(15, 10));

    let user = "World";
    const hiThere = () => {
        let msg = 'Hello ' + user + '!';
        return(msg);
    };

    console.log(hiThere());
