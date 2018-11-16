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

    var powerRgx = /(-?[\d\.]+)\s*\^\s*(-?[\d\.]+)/g,
        multOrDivRgx = /(-?[\d\.]+)\s*([\*\/])\s*(-?[\d\.]+)/g,
        addOrSubRgx = /(-?[\d\.]+)\s*([\+-])\s*(-?[\d\.]+)/g,
        equalSignRgx = /=/g;


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

        while (equalSignRgx.test(exp)) {
            exp = exp.replace(equalSignRgx, "");
        }


        return exp;
    };

    while (str.indexOf("(") !== -1) {
        str = str.replace(/\(([^\(\)]*)\)/g, getValue);
    }

    if (str.indexOf("=") < str.length - 1) {
        alert("wrong input, the '=' sign should be placed in the end of your expression!");
        str = null;
    }

    return getValue("", str);
}

document.getElementById("btn").onclick = function () {
    input = input.value,
        output.value = parseInt(calculate(input) * 100) / 100;
}