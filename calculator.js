var input = document.getElementById("input-string"),
    output = document.getElementById("output-string");

function calculate(str) {

    var addOrSub = function (sub, a, sign, b) {

        return sign == "-" ? a - b : +a + +b;

    };

    var multOrDiv = function (sub, a, sign, b) {

        return sign == "*" ? a * b : a / b;

    };

    var power = function (sub, a, b) {

        return Math.pow(a, b);

    };

    var powerRgx = /(-?[\d\.]+)\s*\^\s*(-?[\d\.]+)/g;

    var multOrDivRgx = /(-?[\d\.]+)\s*([\*\/])\s*(-?[\d\.]+)/g;

    var addOrSubRgx = /(-?[\d\.]+)\s*([\+-])\s*(-?[\d\.]+)/g;

    var getValue = function (sub, exp) {

        while (exp.indexOf("^") !== -1) {

            exp = exp.replace(powerRgx, power);

        }

        while (multOrDivRgx.test(exp)) {

            exp = exp.replace(multOrDivRgx, multOrDiv);
        }

        while (addOrSubRgx.test(exp)) {

            exp = exp.replace(addOrSubRgx, addOrSub);
        }

        return exp;
    };

    while (str.indexOf("(") !== -1) {

        str = str.replace(/\(([^\(\)]*)\)/g, getValue);

    }

    return getValue("", str);
}

document.getElementById("btn").onclick = function () {
    input = input.value,

    output.value = parseInt(calculate(input) * 100) / 100;
}