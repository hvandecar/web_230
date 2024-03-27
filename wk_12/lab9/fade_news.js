"use strict";

const news = {
 
  // this is the area where the data will be displayed
  newsArea : document.getElementById('newsholder'),
 
  // this will reference the body tag; we will modify its id attribute
  theBody : document.querySelector('body'),
  
  // this will hold the JSON data
  newsData : null,
  
  // this will hold the millisecond of the new update
  newModif : 0,
  
  // this will hold the millisecond of the old update
  lastModif : 0,
  
  // counter tracking the fade progress
  // also used to control display of background color for fade
  fadeState : 0,
 
  // interval timer for fade
  fadeTimer : null,
  
  // direction of fade
  fadeDirection : 'in',
 
  //this function starts the timer and gets the data
  init : function() {

    news.pullNewData();
    // set the interval for data refresh
    news.newsRefresh = setInterval(news.pullNewData, 30000);
  },
  
  //this function fetches the json data, and the last-modified time, and runs the fade once
  pullNewData : function() {

    fetch('news_data.json?', {
      method: 'GET',
      cache: 'no-cache',
    })
    .then(function(response) {
      news.wholeDate = response.headers.get('Last-Modified');
      return response.text();
    })
    .then(function(response) {
      news.newsData = JSON.parse(response);
    })
    .then(function() {
      news.newModif = Date.parse(news.wholeDate);
      news.populateNews();
    })
    .catch(function(error) { 
      console.log(error); 
    });
  },
  
  // output the news headings into the page
  populateNews : function() {

    //if the new update time is bigger than the old one, update the data on the page
    if(this.newModif > this.lastModif) {

      this.newsArea.innerHTML = '';
      const newsHeader = document.createElement('h2');
      const headerTxt = document.createTextNode('News Headlines');
      this.newsArea.appendChild(newsHeader).appendChild(headerTxt);

      for (let i=0; i<this.newsData.newsItems.length; i++) {
        const newPara = document.createElement('p');
        const newLink = document.createElement('a');
        const lineBreak = document.createElement('br');
        const newsTitle = document.createTextNode(this.newsData.newsItems[i].heading);
        newLink.href = this.newsData.newsItems[i].url;
        newPara.appendChild(newLink).appendChild(newsTitle);
        this.newsArea.appendChild(newPara);
      }
      //show the effect because the data has been updated
      this.fadeTimer = setInterval(news.fade,100);
    
      // store the new time in the old time total
      this.lastModif = this.newModif;
    }
    else { return; }
  },

  // cycle through background colors for the news area 
  // by assigning different id values to the body
  fade : function() {
        
    if (news.fadeState >= 0 && news.fadeState < 5 && news.fadeDirection === 'in') {
        
      news.theBody.id = 'darker' + news.fadeState;
      news.fadeState += 1;
    
    }
    
    else if (news.fadeState >= 0 && news.fadeState < 5 && news.fadeDirection === 'out') {
    
      news.theBody.id = 'darker' + news.fadeState;
      news.fadeState -= 1;     
      
    }
    
    else if (news.fadeState === 5) {
    
      news.fadeDirection = 'out';
      news.fadeState = 4;
      news.theBody.id = 'darker' + news.fadeState;
    
    }
    
    else {
    
      news.theBody.id = '';
      news.fadeDirection = 'in';
      news.fadeState = 0;
      clearInterval(news.fadeTimer);
    
    }
    
  }
 
}
 
news.init();