var uneVariableLambda = 23;
var UNE_VALEUR_CONST = Object.freeze({});
function onbuttonclick(evt) {
  //corps de la fonction
  console.log(evt);
}
onbuttonclick("coucou");
var obj = {
  a: 123,
  b: function () {
    console.log("hello");
  },
};
obj.a = 254;
obj.b();
var str = '<a href="bdfb">le liens d\'alex</a>';
var nb = 125;
var arr = [123, 254, {}, ""];
console.log(arr[0]);
var a = true;
if (a) {
  console.log("a est vrai");
}

