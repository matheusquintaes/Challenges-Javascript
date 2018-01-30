
(function(win, doc){
  'use strict'

  function DOM( node ) {
    if(!(this instanceof DOM))
      return new DOM( node );
    this.element = doc.querySelectorAll( node );
    // if(this.element.length === 1)
    //   return this.get();
  }

  function is( param ){
    return Object.prototype.toString.call( param );
  }

  DOM.isArray = function isArray( param ) {
    return is( param ) === '[object Array]';
  }
  DOM.isFunction = function isFunction( param ) {
    return is( param ) === '[object Function]';
  }
  DOM.isNumber = function isNumber( param ) {
    return is( param ) === '[object Number]';
  }
  DOM.isString = function isString( param ) {
    return is( param ) === '[object String]';
  }
  DOM.isBoolean = function isBoolean( param ) {
    return is( param ) === '[object Boolean]';
  }
  DOM.isNull = function isNull( param ) {
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

  DOM.prototype.get = function get(index) {
    if(!index)
      return this.element[0];
    return this.element[index]
  }

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

  win.DOM = DOM;

})(window, document);

