function Meme(textLorsDeLaCreation) {
  /**
   * champs privé
   */
  var _text = textLorsDeLaCreation;
  function _appendToTitle() {
    this.title += "suffixe";
  }
  /**
   *fonction privée de manip de titre
   * @param {string} value
   */
  function _changeText(value) {
    _text = value;
  }
  /**
   * exposition d'une fonction privée vers public
   */
  this.setText = _changeText;
  /**
   * declaration de fonction public
   */
  this.getText = function () {
    console.log(_text);
  };
  /**
   * declaration d'un champs public
   */
  this.title = "";

  console.log(this.getText());
}
var meme = new Meme("voici le text lors de la creation");
console.log(meme);
