/*
Aproveitando a lib DOM que fizemos na semana anterior, crie agora para ela
métodos semelhantes aos que existem no array, mas que sirvam para os
elementos do DOM selecionados.
Crie os seguintes métodos:
- forEach, map, filter, reduce, reduceRight, every e some.

Crie também métodos que verificam o tipo do objeto passado por parâmetro.
Esses métodos não precisam depender de criar um novo elmento do DOM, podem
ser métodos estáticos.

Métodos estáticos não obrigam o uso do `new`, podendo ser usados diretamente
no objeto, como nos exemplos abaixo:
DOM.isArray([1, 2, 3]); // true
DOM.isFunction(function() {}); // true
DOM.isNumber('numero'); // false

Crie os seguintes métodos para verificação de tipo:
- isArray, isObject, isFunction, isNumber, isString, isBoolean, isNull.
O método isNull deve retornar `true` se o valor for null ou undefined.
*/


(function(win, doc){
  'use strict'

  function DOM( node ) {
    this.element = doc.querySelectorAll( node );
  }

  function is( param ){
    return Object.prototype.toString.call( param );
  }

  DOM.prototype.isArray = function isArray( param ) {
    return is( param ) === '[object Array]';
  }
  DOM.prototype.isFunction = function isFunction( param ) {
    return is( param ) === '[object Function]';
  }
  DOM.prototype.isNumber = function isNumber( param ) {
    return is( param ) === '[object Number]';
  }
  DOM.prototype.isString = function isString( param ) {
    return is( param ) === '[object String]';
  }
  DOM.prototype.isBoolean = function isBoolean( param ) {
    return is( param ) === '[object Boolean]';
  }
  DOM.prototype.isNull = function isNull( param ) {
    return is( param ) === '[object Null]'
    || is( param ) === '[object Undefined]';
  }

  DOM.prototype.forEach = function forEach( callback ) {
    return Array.prototype.forEach.apply( this.element, arguments);
  }

  DOM.prototype.map = function map() {
    return Array.prototype.map.apply( this.element, arguments);
  }

  DOM.prototype.filter = function filter() {
    return Array.prototype.filter.apply( this.element, arguments);
  }

  DOM.prototype.reduce = function reduce() {
    return Array.prototype.reduce.apply( this.element, arguments);
  }

  DOM.prototype.reduceRight = function reduceRight( ) {
    return Array.prototype.reduceRight.apply( this.element, arguments);
  }

  DOM.prototype.every = function every() {
    return Array.prototype.every.apply( this.element, arguments);
  }

  DOM.prototype.some = function some() {
    return Array.prototype.some.apply( this.element, arguments);
  }


  DOM.prototype.on = function on( event , callback ) {
    return Array.prototype.forEach.call( this.element, function(value, key){
      value.addEventListener( event , callback );
    });
  }

  DOM.prototype.get = function get() { return this.element; }

  DOM.prototype.off = function off( event, callback) {
    return Array.prototype.forEach.call( this.element, function(value, key){
      value.removeEventListener( event , callback );
    });
  }

  var $a = new DOM('[data-js="link"]');

  $a.forEach( function( element, key ){
    console.log(element);
  });

  $a.map( function( element ){
    console.log(element.textContent);
  });

  console.log(DOM.prototype.isArray([1, 2, 3])); // true
  console.log(DOM.prototype.isFunction(function() {})); // true
  console.log(DOM.prototype.isNumber(1)); // true
  console.log(DOM.prototype.isString('teste')); // true
  console.log(DOM.prototype.isBoolean(true)); // true
  console.log(DOM.prototype.isNull(null)); // true
  console.log(DOM.prototype.isNull()); // true

})(window, document);

