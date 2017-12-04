  /*
  No HTML:
  - Crie um formulário com um input de texto que receberá um CEP e um botão
  de submit;
  - Crie uma estrutura HTML para receber informações de endereço:
  "Logradouro, Bairro, Estado, Cidade e CEP." Essas informações serão
  preenchidas com os dados da requisição feita no JS.
  - Crie uma área que receberá mensagens com o status da requisição:
  "Carregando, sucesso ou erro."

  No JS:
  - O CEP pode ser entrado pelo usuário com qualquer tipo de caractere, mas
  deve ser limpo e enviado somente os números para a requisição abaixo;
  - Ao submeter esse formulário, deve ser feito um request Ajax para a URL:
  "http://cep.correiocontrol.com.br/[CEP].json", onde [CEP] será o CEP passado
  no input criado no HTML;
  - Essa requisição trará dados de um CEP em JSON. Preencha campos na tela
  com os dados recebidos.
  - Enquanto os dados são buscados, na área de mensagens de status, deve mostrar
  a mensagem: "Buscando informações para o CEP [CEP]..."
  - Se não houver dados para o CEP entrado, mostrar a mensagem:
  "Não encontramos o endereço para o CEP [CEP]."
  - Se houver endereço para o CEP digitado, mostre a mensagem:
  "Endereço referente ao CEP [CEP]:"
  - Utilize a lib DOM criada anteriormente para facilitar a manipulação e
  adicionar as informações em tela.
  */

  (function(doc, win){
    'use strict'

    var $inputLogradouro = doc.querySelector('[data-js="inputLogradouro"]');
    var $inputBairro = doc.querySelector('[data-js="inputBairro"]');
    var $inputEstado = doc.querySelector('[data-js="inputEstado"]');
    var $inputCidade = doc.querySelector('[data-js="inputCidade"]');

    var $inputCep = doc.querySelector('[data-js="inputCep"]');
    var $buttonSubmit = doc.querySelector('[data-js="buttonSubmit"]');
    var ajax = new XMLHttpRequest();

    $buttonSubmit.addEventListener('click', function(e){
      e.preventDefault();
      if(!validaCep())
        return getMessage('minLength');
      ajaxCorreios();
    });

    function ajaxCorreios(){
      getMessage('load');
      var url = getUrl();
      ajax.open('GET', url);
      ajax.send();
      ajax.addEventListener('readystatechange', handleStateChange);
    }

    function validaCep(){
      return justNumbers($inputCep.value).length === 8;
    }

    function getUrl(){
      return 'https://viacep.com.br/ws/' + justNumbers($inputCep.value) + /json/;
    }

    function handleStateChange(){
      if(isRequestOk())
        verifyResponse();
    }

    function verifyResponse() {
      var data = parseData();
      fillValues(data);
      getMessage('ok');
    }

    function parseData() {
      var result;
      try {
        result = JSON.parse(ajax.responseText);
      }
      catch(e){
        result = null;
      }
      return result;
    }

    function fillValues( data ) {
      $inputLogradouro.value = data.cep ? data.cep: '';
      $inputBairro.value = data.bairro ? data.bairro: '';
      $inputEstado.value = data.uf ? data.uf : '';
      $inputCidade.value = data.localidade ? data.localidade: '';

      if(data.erro) {
        clearData();
        return getMessage('notFound');
      }
    }

    function clearData(){
      $inputLogradouro.value = '';
      $inputBairro.value = '';
      $inputEstado.value = '';
      $inputCidade.value = '';
    }

    function isRequestOk() {
      return ajax.readyState === 4 && ajax.status === 200;
    }

    function justNumbers( string ) {
      return string.replace(/\D+/g,'');
    }

    function getMessage( type ){
      var $spanStatus = doc.querySelector('[data-js="spanStatus"]');
      var messages = {
        loading:'Buscando informações para o CEP '+ $inputCep.value + '...',
        ok:'Endereço referente ao CEP: ' + $inputCep.value,
        minLength:'O Cep tem que ter 8 dígitos',
        notFound: 'Não encontramos o endereço para o CEP '+ $inputCep.value + '.'
      };
      $spanStatus.textContent = messages[type];
    }

  })(document, window);
