const election = {

  voteButton : document.getElementById('sub'),
  inputFields : document.getElementsByTagName('input'),
  selectMenus : document.getElementsByTagName('select'),
  requiredPara : document.getElementById('required'),

  // counts
  allInputs : 0,
  allSelects : 0,
  
  init : function() {

    this.allInputs = this.inputFields.length;
    this.allSelects = this.selectMenus.length;

    // assign a 'submit' listener to the form
    this.voteButton.addEventListener('click', this.checkData, false);

  },

  checkData : function() {

    const errorsArray = [];
    let counter = 0;

    for (let i=0; i<election.allInputs; i++) {
        
        if (election.inputFields[i].name === 'voter_data' && election.inputFields[i].value === '') {
           errorsArray[counter] = 'Please provide a name.';
           counter++;
           continue;
        }
        
        if (election.inputFields[i].name === 'email_data') {
           const emailPattern = /^([\w\.\-])+\@(([\w\-])+\.)+([\w]{2,4})+$/;
           const emailCheck = emailPattern.test(election.inputFields[i].value);
           if (!emailCheck) {
              errorsArray[counter] = 'Please provide a valid email address.';
              counter++;
              continue;
           }
        }
        
        if (election.inputFields[i].name === 'city_data' && election.inputFields[i].value === '') {
           errorsArray[counter] = 'Please indicate a city.';
           counter++;
           continue;
        }
        
        if (election.inputFields[i].name === 'state_data') {
           const statePattern = /^[a-zA-Z]+$/;
           const stateCheck = statePattern.test(election.inputFields[i].value);
           if (!stateCheck) {
              errorsArray[counter] = 'Please enter a valid state abbreviation.';
              counter++;
              continue;
           }
        }
        
        if (election.inputFields[i].name === 'age_data') {
           const agePattern = /^\d+$/;
           const ageCheck = agePattern.test(election.inputFields[i].value);
           if (!ageCheck) {              
              errorsArray[counter] = 'Please provide a valid age.';
              counter++;
              continue;
           }
        }        
    }

    // interests and specialization select menu validation
    for (i=0; i<election.allSelects; i++) {
        
        if (election.selectMenus[i].name === 'gender_data' && election.selectMenus[i].selectedIndex <= 0) {
           errorsArray[counter] = 'Please select a gender.';
           counter++;
           continue;
        }
        
        if (election.selectMenus[i].name === 'choice_data' && election.selectMenus[i].selectedIndex <= 0) {
           errorsArray[counter] = 'Please select your candidate.';
           counter++;
           continue;
        }
    }

    // check to see if there are any items in the errors array
    if (errorsArray.length) {
       
       // check to see if there are errors already shown
       // if so, remove them
       election.removeErrors();
       
       // creating and inserting error message content
       let theErrors = '<div id="errors">Your poll results could not be processed due to the following errors: <ul>';
       for (i=0, allErrors=errorsArray.length; i<allErrors; i++) {
         theErrors += '<li>' + errorsArray[i] + '</li>';
       }
       theErrors += '</ul></div>';

       election.requiredPara.insertAdjacentHTML('beforebegin', theErrors);
 
    }
    
    else {
 
       // remove any existing error messages
       election.removeErrors();
       
       election.generateCookies();
       window.open('lab7-popup.html', '_blank', 'height=300,width=400,top=25,left=25,scrollbars=1,resizable=1,location=1');
    
    }
      
  },
  
  removeErrors : function() {

    const errorHolder = document.getElementById('errors');

    if (errorHolder) {
      errorHolder.parentNode.removeChild(errorHolder);
    }
   
  },

  generateCookies : function() {
 
    // loop for text inputs
    for (let i=0; i<election.allInputs; i++) {

      // skip the input button; it does not have a value to store in a cookie
      if (election.inputFields[i].type === 'button') { continue; }

      // store a cookie using the variable name as the cookie name
      election.createCookie(election.inputFields[i].name, election.inputFields[i].value, 'Lax', false, false, false, false);
    
    }

    // loop for textareas
    for (let i=0; i<election.allSelects; i++) {

      // store a cookie using the variable name as the cookie name
      election.createCookie(election.selectMenus[i].name, election.selectMenus[i].value, 'Lax', false, false, false, false);

    }
 
  },
 
 createCookie : function(name,value,samesite,expiration,path,domain,secure) {
 
   let data = name + "=" + escape(value);
   if (samesite) { data += "; SameSite=" + samesite; }
   if (expiration) { 
     let expiresAt = new Date();
     expiresAt.setTime(expiration);
     data += "; expires=" + expiresAt.toGMTString();
   }
   if (path) { data += "; path=" + path; }
   if (domain) { data += "; domain=" + domain; }
   if (secure) { data += "; secure"; }
   document.cookie = data;

 }

}  

election.init();