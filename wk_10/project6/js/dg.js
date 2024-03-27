'use strict';
(function() {

  const gvs = {
  
    //ref to where new text goes
    newDiv : document.getElementById('helpWrapper'),
    //ref to where the input cells
    cellHolder : document.querySelector('#data tbody'),
    //ref to body for 3 buttons
    threeBody : document.querySelector('body'),
    //ref to the td's for the title
    tdTitle : document.querySelectorAll('#data tbody tr td'),
    //ref to the inputs
    refInput : document.querySelectorAll('#data tbody tr td input'),
    //reference to the first row of the table (holding header cells)
    headerRow : document.getElementById('data').rows[0],
    //readonly inputs (dynamic)
    lockedInputs : document.getElementById('data').getElementsByClassName('readonly'),
    //marked inputs (dynamic)
    highlightedInputs : document.getElementById('data').getElementsByClassName('marked'),
    //data inputs (dynamic)
    inputsWithData : document.getElementById('data').getElementsByClassName('hasData'),
    //invalid data inputs (dynamic)
    invalidInputs : document.getElementById('data').getElementsByClassName('invalid'),        
    //submit button text
    submitBtnHold : document.querySelector('#submitHolder #error'),
    submitBtn : document.getElementById('submitBtn'),
    //page visibility
    pageVisibility : document.visibilityState,

    //generate element nodes
    help : document.createElement('a'),
    unorder : document.createElement('ul'),
    li1 : document.createElement('li'),
    li2 : document.createElement('li'),
    li3 : document.createElement('li'),
    txt1 : document.createTextNode('To lock a cell (prevent edits) SHIFT + click on the cell; to unlock repeat this process.'),
    txt2 : document.createTextNode('To highlight a cell ALT + click on the cell; to remove the highlight repeat the process.'),
    txt3 : document.createTextNode('To clear a cell\'s value CTRL + click on the cell.'),
    btnControl : document.createElement('div'),
    btn1 : document.createElement('input'),
    btn2 : document.createElement('input'),
    btn3 : document.createElement('input'),
    invalidStr : ('Saving disabled until invalid data is corrected.'),

    init : function() {

      //this function adds a click listener for input cells and generates the dropdown with a listener as well
      this.setUp();
      this.help.addEventListener('click', this.showHideHelp, false);
      this.btnControl.addEventListener('click', this.buttonListen, false);
      this.cellHolder.addEventListener('click', this.inputSelects, false);
      this.cellHolder.addEventListener('focusout', this.inputSelects, false);
      //this checks if there is any invalid data
      this.cellHolder.addEventListener('input', this.tableValidation, false);
      window.addEventListener('DOMContentLoaded', this.reloadTable, false);
      document.addEventListener('visibilitychange', this.visibilitySave, false);
    },

    setUp : function() {
      //assign attributes
      this.help.href = '#';
      this.help.id = 'helpIcon';
      this.help.setAttribute('aria-controls', 'helpBox');
      this.help.setAttribute('aria-expanded', 'false');
      this.help.innerHTML = '<img src="i/help.png" alt="Help" width="17" height="17" />';
      this.unorder.id = 'helpBox';
      this.unorder.classList.add('remove');
      this.li1.appendChild(this.txt1);
      this.li2.appendChild(this.txt2);
      this.li3.appendChild(this.txt3);
      this.btnControl.id = 'clearingControls';
      this.btn1.value = 'Unlock Cells';
      this.btn1.classList.add('hide');
      this.btn1.type = 'button'
      this.btn2.value = 'Remove Cell Highlights';
      this.btn2.classList.add('hide');
      this.btn2.type = 'button'
      this.btn3.value = 'Remove All Data';
      this.btn3.classList.add('hide');
      this.btn3.type = 'button'

      //avengers assemble
      this.unorder.appendChild(this.li1);
      this.unorder.appendChild(this.li2);
      this.unorder.appendChild(this.li3);
      this.newDiv.appendChild(this.help);
      this.newDiv.appendChild(this.unorder);
      this.btnControl.appendChild(this.btn1);
      this.btnControl.appendChild(this.btn2);
      this.btnControl.appendChild(this.btn3);
      this.threeBody.appendChild(this.btnControl);

      //adding the title for hover
      for (const table of this.tdTitle) {
        const accessibleStr = table.parentNode.cells[0].innerHTML + ', ' + gvs.headerRow.cells[table.cellIndex].innerHTML;
        table.title = accessibleStr;
        table.firstElementChild.setAttribute('aria-label', accessibleStr);
      }
    },

    //function to make the ul drop down on click
    showHideHelp : function(evt) {
      evt.preventDefault();
      gvs.unorder.classList.toggle('remove');
      const ariaTarget = gvs.help.getAttribute('aria-expanded');
      if (ariaTarget === 'false'){
        gvs.help.setAttribute('aria-expanded', 'true');
      }
      else {
        gvs.help.setAttribute('aria-expanded', 'false');
      }
    },

    // what to do (to the buttons) when the buttons are clicked
    buttonListen : function(evt) {

      const buttonVal = gvs.findTarget(evt, 'input', this);

      if (!buttonVal) {return;}

      switch (buttonVal.value) {

        case 'Unlock Cells' : 
        for(const clear of gvs.refInput) {
          clear.removeAttribute('readonly');
          clear.removeAttribute('title');
          clear.classList.remove('readonly'); 
          gvs.btn1.classList.add('hide');
        }
        break;

        case 'Remove Cell Highlights' : 
        for(const erase of gvs.refInput) {
          erase.classList.remove('marked');
          gvs.btn2.classList.add('hide');
        }
        break;

        case 'Remove All Data' :
        for(const beGone of gvs.refInput) {
          beGone.value = '';
          beGone.classList.remove('hasData');
          beGone.classList.remove('invalid');
          beGone.setAttribute('aria-invalid', false);
          gvs.submitBtn.disabled = false;
          gvs.submitBtnHold.innerText = '';
          gvs.btn3.classList.add('hide');
        }
        break;

      }
      
    },
    
    // what to do (to the table) when the inputs are clicked
    inputSelects : function(evt) {

      const theCell = gvs.findTarget(evt, 'input', this);

      if (!theCell) {return;}
      
      //this function is for shiftKey
      if (evt.shiftKey) {
        if (theCell.hasAttribute('readonly')) {
          theCell.removeAttribute('readonly');
          theCell.removeAttribute('title');
        }
        else {
          theCell.setAttribute('readonly', true);
          theCell.setAttribute('title', 'The cell is locked and cannot be edited; SHIFT + click to unlock it');
        }
        theCell.classList.toggle('readonly');
        //if there is nothing highlighted turn the button off
        if (gvs.lockedInputs.length === 0) {
          gvs.btn1.classList.add('hide') 
        }
        else {
          gvs.btn1.classList.remove('hide');
        }
      }
      //this function is for altKey
      if(evt.altKey) {
        theCell.classList.toggle('marked');
        //if there is nothing marked turn the button off
        if (gvs.highlightedInputs.length === 0) {
          gvs.btn2.classList.add('hide')
            }
        else {
          gvs.btn2.classList.remove('hide');
        }
      }
      //this function is for clearing with ctrlKey
      if(evt.ctrlKey) {
        theCell.value = '';
      }
      //is there any data in this specific cell?
      theCell.value.length > 0 ? theCell.classList.add('hasData') : theCell.classList.remove('hasData');
      //is there any data in the table?
      gvs.inputsWithData.length === 0 ? gvs.btn3.classList.add('hide') : gvs.btn3.classList.remove('hide');
      //is there any invalid data in the table?
      if(gvs.invalidInputs.length === 0) {
        gvs.submitBtn.disabled = false;
        gvs.submitBtnHold.innerText = '';
      }
      else {
        gvs.submitBtn.disabled = true;
        gvs.submitBtnHold.innerText = gvs.invalidStr;
      }
    },

    //testing if the data is valid
    tableValidation : function(evt) {

      const validCell = gvs.findTarget(evt, 'input', this);

      if (!validCell) {return;}
      if (/^\d+(\.\d+)*$/.test(validCell.value) || validCell.value.length === 0){
        validCell.classList.remove('invalid');
        validCell.setAttribute('aria-invalid', false);
      }
      else {
        validCell.classList.add('invalid');
        validCell.setAttribute('aria-invalid', true);
      }
    },

    //testing data on reload
    reloadTable : function() {

      let a = 0;
      while (a<gvs.refInput.length) {
        if(gvs.refInput[a].value.length > 0 && !/^\d+(\.\d+)*$/.test(gvs.refInput[a].value)) {
          gvs.refInput[a].classList.add('invalid');
          gvs.refInput[a].setAttribute('aria-invalid', true);
          gvs.refInput[a].classList.add('hasData');
          gvs.submitBtnHold.innerText = gvs.invalidStr;
          gvs.submitBtn.disabled = true;
          gvs.btn3.classList.remove('hide');
        } 
        a++
      }
    },
    
    //saving cookies
    visibilitySave : function() {
      if (document.visibilityState === 'visible') {
        //create the string with the locked cells
        let i = 0;
        let theLocked = '';
        while (i < gvs.lockedInputs.length) {
          theLocked += ',' + gvs.lockedInputs[i].name;
          i++;
        }
        //add highlighted cells
        let h = 0;
        while (h < gvs.highlightedInputs.length) {
          theLocked += ',' + gvs.highlightedInputs[h].name;
          h++;
        }
        console.log(theLocked);
        gvs.createCookie(gvs.submitBtn.nextElementSibling.name, theLocked, 'Lax', false, false, false, false);
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

    findTarget(evt, targetNode, container) {

      let currentNode = evt.target;
      while (currentNode && currentNode !== container) {
        if (currentNode.nodeName.toLowerCase() === targetNode.toLowerCase()) {
          return currentNode;
        }
        else {
          currentNode = currentNode.parentNode;
        }
      }
      return false;
    }
  }
  gvs.init();
})();