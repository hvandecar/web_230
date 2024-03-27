'use strict';
const pep = {

  //ref to body
  mainBody : document.querySelector('body'),
  //ref to the form
  formBody : document.getElementsByTagName('form')[0],
  //div for p and ul
  errorDiv : document.createElement('div'),
  //ul for the error mesages to go into
  errorUl : document.createElement('ul'),

  //list of all the inputs
  allInputs : document.getElementsByTagName('input'),
  allSelects : document.getElementsByTagName('select'),

  //count of node lists
  totalInputs : 0,
  totalSelects : 0,
  ulChildren : 0,

  //create the list items
  nameVar : document.createElement('li'),
  emailVar : document.createElement('li'),
  cityVar : document.createElement('li'),
  stateVar : document.createElement('li'),
  ageVar : document.createElement('li'),
  genderVar : document.createElement('li'),
  candidateVar : document.createElement('li'),

  init : function() {

    //generate the div
    this.errorMsg();

    // store lengths of node lists
    this.totalInputs = this.allInputs.length;
    this.totalSelects = this.allSelects.length;
    
    //submit listener   
    this.formBody.addEventListener('submit', this.validate, false);
  },

  errorMsg : function(evt) {

    //create div to add into
    this.mainBody.insertBefore(this.errorDiv, this.formBody);
    this.errorDiv.classList.add('display');
    this.errorDiv.appendChild(document.createElement('p')).appendChild(document.createTextNode('Your poll results could not be processed due to the following errors:'));
    this.errorUl.appendChild(this.nameVar).appendChild(document.createTextNode('Please provide a name.'));
    this.nameVar.classList.add('display');
    this.errorUl.appendChild(this.emailVar).appendChild(document.createTextNode('Please provide a valid email address.'));
    this.emailVar.classList.add('display');
    this.errorUl.appendChild(this.cityVar).appendChild(document.createTextNode('Please indicate a city.'));
    this.cityVar.classList.add('display');
    this.errorUl.appendChild(this.stateVar).appendChild(document.createTextNode('Please enter a valid state abbreviation.'));
    this.stateVar.classList.add('display');
    this.errorUl.appendChild(this.ageVar).appendChild(document.createTextNode('Please provide a valid age.'));
    this.ageVar.classList.add('display');
    this.errorUl.appendChild(this.genderVar).appendChild(document.createTextNode('Please select a gender.'));
    this.genderVar.classList.add('display');
    this.errorUl.appendChild(this.candidateVar).appendChild(document.createTextNode('Please select your candidate.'));
    this.candidateVar.classList.add('display');
    this.errorDiv.appendChild(this.errorUl);
  },

  validate : function(evt) {

    // name email and city text
    for (let i=0; i<pep.totalInputs; i++) {
        
      if (pep.allInputs[i].name === 'voter_data') {
        
        if (pep.allInputs[i].value === '') {
          pep.nameVar.classList.remove('display');
        }
        else {
          pep.nameVar.classList.add('display');
        }
      }
      if (pep.allInputs[i].name === 'email_data') {
        
        const emailPattern = /^([\w\.\-])+\@(([\w\-])+\.)+([\w]{2,6})+$/;
        const emailAddress = emailPattern.test(pep.allInputs[i].value);
     
        if (!emailAddress) {
          pep.emailVar.classList.remove('display'); 
        }
        else {
          pep.emailVar.classList.add('display');
        }
      }
      if (pep.allInputs[i].name === 'city_data') {

        if (pep.allInputs[i].value === '') {
          pep.cityVar.classList.remove('display');
        }
        else {
          pep.cityVar.classList.add('display');
        }
      } 
      // state and age
      if (pep.allInputs[i].name === 'state_data') {
        
        const statePattern = /[a-z]{2}|[A-Z]{2}/;
        const stateLocation = statePattern.test(pep.allInputs[i].value);
      
        if (!stateLocation) {
          pep.stateVar.classList.remove('display');
        }
        else {
          pep.stateVar.classList.add('display');
        }
      }
      if (pep.allInputs[i].name === 'age_data') {
        
        const agePattern = /\d{1,3}/;
        const ageTest = agePattern.test(pep.allInputs[i].value);
     
        if (!ageTest) {
          pep.ageVar.classList.remove('display');
        }
        else {
          pep.ageVar.classList.add('display');
        }
      }
    }
    // gender and your choice 
    for (let i=0; i<pep.totalSelects; i++) {
      
      if (pep.allSelects[i].name === 'gender_data') {
        
        if (pep.allSelects[i].selectedIndex <= 0) {
          pep.genderVar.classList.remove('display');
        }
        else {
          pep.genderVar.classList.add('display');
        }
      }
      if (pep.allSelects[i].name === 'choice_data') {
        
        if (pep.allSelects[i].selectedIndex <= 0) {
          
          pep.candidateVar.classList.remove('display');
        }
        else {
          pep.candidateVar.classList.add('display');
        }
      }
    }

    //how many errors? (dynamic)
    pep.ulChildren = pep.errorUl.getElementsByClassName('display').length;
    if(pep.ulChildren < 7){
      pep.errorDiv.classList.replace('display', 'errors');
      evt.preventDefault();
    }
  }
}
pep.init();