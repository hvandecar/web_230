"use strict";
 
const votingPoll = {
 
  // isolate the results area
  listItems : document.querySelectorAll('body ul li'),
  submit : document.querySelector('input'),
 
  init : function() {

    this.submit.addEventListener('click', this.confirmClose, false);
 
    const voterName = votingPoll.findCookie('voter_data');
    const voterEmail = votingPoll.findCookie('email_data');    
    const city = votingPoll.findCookie('city_data'); 
    const state = votingPoll.findCookie('state_data');
    const age = votingPoll.findCookie('age_data');
    const gender = votingPoll.findCookie('gender_data');
    const choice = votingPoll.findCookie('choice_data');
    const arrCookies = [voterName, voterEmail, city, state, age, gender, choice];
    const listItemsLength = this.listItems.length;

    for (let i = 0; i < listItemsLength; ++i) {
        this.listItems[i].insertAdjacentText('beforeend', arrCookies[i]);
    }
 
  },

  confirmClose : function() {

    window.close();
  },
 
  findCookie : function(name) {  
    const query = name + "=";
    const queryLength = query.length;
    const cookieLength = document.cookie.length;
    let i=0;
    while (i<cookieLength) {
      let position = i + queryLength;
      if (document.cookie.substring(i,position) === query) {
         return this.findCookieValue(position);
      }
      i = document.cookie.indexOf(" ", i) + 1;
      if (i === 0) { break; }  
    }
    return null;  
  },
 
  findCookieValue : function(position) {
    let endsAt = document.cookie.indexOf(";", position);
    if (endsAt === -1) { endsAt = document.cookie.length; }
    return unescape(document.cookie.substring(position,endsAt));
  }
 
}
 
votingPoll.init();