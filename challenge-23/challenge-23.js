(function( document ){
  'use strict'
  /*
  Vamos desenvolver mais um projeto. A ideia é fazer uma mini-calculadora.
  As regras são:

  - Deve ter somente 1 input, mas não deve ser possível entrar dados nesse input
  diretamente;
  - O input deve iniciar com valor zero;
  - Deve haver 10 botões para os números de 0 a 9. Cada botão deve ser um número;
  - Deve haver 4 botões para as operações principais: soma (+), subtração(-),
  multiplicação(x) e divisão(÷);

  - Ao pressionar um botão com uma das 4 operações, deve aparecer o símbolo da
  operação no input. Se o último caractere no input já for um símbolo de alguma
  operação, esse caractere deve ser substituído pelo último pressionado.
  Exemplo:
  - Se o input tem os valores: "1+2+", e for pressionado o botão de
  multiplicação (x), então no input deve aparecer "1+2x".

  - Deve haver um botão de "igual" (=) que irá calcular os valores e um botão "CE"
  que irá limpar o input, deixando-o com valor 0;

  - A cada número pressionado, o input deve atualizar concatenando cada valor
  digitado, como em uma calculadora real;

  - Ao pressionar o botão de igual, o resultado do cálculo deve ser mostrado no
  input;
  - Ao pressionar o botão "CE", o input deve ficar zerado.
  */

  var $screen            = document.querySelector('[data-js="screen"]');
  var $buttonsNumber     = document.querySelectorAll('[data-js="button-number"]');
  var $buttonsOperations = document.querySelectorAll('[data-js="button-operation"]');
  var $buttomEqual       = document.querySelector('[data-js="button-equal"]');
  var $buttomCE       = document.querySelector('[data-js="button-ce"]');

  Array.prototype.forEach.call($buttonsNumber, function( button ){
    button.addEventListener('click', handleClickNumber);
  });
  Array.prototype.forEach.call( $buttonsOperations, function( button ){
    button.addEventListener('click', handleClickOperation)
  });

  $buttomEqual.addEventListener('click', handleClickEqual);
  $buttomCE.addEventListener('click', handleClickCE);

  function handleClickNumber() {
    if( $screen.value === '0')
      return $screen.value = this.value;
    return $screen.value += this.value;
  }


  //alterar
  function handleClickOperation() {
    $screen.value = removeLastItemIfItAnOperator( $screen.value );
    $screen.value += this.value;
  }

  function handleClickCE() {
    $screen.value = '0';
  }

  //alterar
  function isLastItemAnOperation( number ) {
    var operations = ['+', '-', '*', '/'];
    var lastItem = number.split('').pop(); // transforma o valor que está em screen em array (split), e pega o último item (pop).
    console.log(lastItem);
    return operations.some( function( operator ) {
      return operator === lastItem;
    })
  }

  //alterar
  function removeLastItemIfItAnOperator( number ){
    if( isLastItemAnOperation( number ) )
      return number.slice(0,-1);
    return number;
  }

  //alterar
  function handleClickEqual() {
      $screen.value = removeLastItemIfItAnOperator( $screen.value );
      var allValues = $screen.value.match(/\d+[+\*\/-]?/g);

      $screen.value = allValues.reduce(function(accumulated, actual) {
        var firstValue = accumulated.slice(0, -1);
        var operator = accumulated.split('').pop();
        var lastValue = removeLastItemIfItAnOperator(actual);
        var lastOperator = isLastItemAnOperation(actual) ? actual.split('').pop() : '';
        switch(operator) {
          case '+':
            return ( Number(firstValue) + Number(lastValue) ) + lastOperator;
          case '-':
            return ( Number(firstValue) - Number(lastValue) ) + lastOperator;
          case '*':
            return ( Number(firstValue) * Number(lastValue) ) + lastOperator;
          case '/':
            return ( Number(firstValue) / Number(lastValue) ) + lastOperator;
        }
      });
  }


})( document );
