class util {

  static findTarget(evt, targetNode, container) {
    let currentNode = evt.target;
    while (currentNode && currentNode !== container) {  
      if (currentNode.nodeName.toLowerCase() === targetNode.toLowerCase()) { return currentNode; }
      else { currentNode = currentNode.parentNode; }
    }
    return false;
  }

  static sendRequest(url, func, postData) {
 
    const xhr = new XMLHttpRequest();
    if (!xhr) { return; }
    const method = (postData) ? "POST" : "GET";
    xhr.open(method, url, true);
    if (postData) {
      xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    }
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) { return; }
      if (xhr.status !== 200 && xhr.status !== 304) {
        alert('HTTP error ' + xhr.status); return;
      }
      func(xhr);
    }
    if (xhr.readyState === 4) { return; }
    xhr.send(postData);
 
  }
}

class dataTable {

  constructor(theTableRef) {

    this.theTable = document.querySelector(theTableRef);
    this.theButtons = document.getElementById('actionForm');
    this.rowHolder = document.querySelector('#projectsTbl tbody');
    this.tableHeaders = this.theTable.querySelectorAll('thead th');
    this.rows = this.rowHolder.querySelectorAll('tr');

    //priority boolean
    this.priority = false;
    //highlight boolean
    this.highlight = false;
    //type boolean
    this.type = false;
    //boolean for if list is a-z or z-a
    this.UptoDn = true;
    //main order sequence
    this.newValues = [];
  }

  init(){
    const btn1 = document.createElement('input');
    const btn2 = document.createElement('input');
    const btn3 = document.createElement('input');
    btn1.type = 'button';
    btn1.name = 'actionButton';
    btn1.value = 'Hide Low Priority';
    btn2.type = 'button';
    btn2.name = 'actionButton';
    btn2.value = 'Highlight Current Row';
    btn3.type = 'button';
    btn3.name = 'actionButton';
    btn3.value = 'Hide Type Column';
    this.theButtons.appendChild(btn1);
    this.theButtons.appendChild(btn2);
    this.theButtons.appendChild(btn3);

    //link up the headers as buttons
    for (let j = 0; j < this.tableHeaders.length; j++) {
        this.tableHeaders[j].innerHTML = "<a href='#'>" + this.tableHeaders[j].innerText + "</a>";
    }

    //reload the loaded columns
    //get the local storage column number, turn into number not string
    this.newValues = parseFloat(localStorage.getItem('mainList'));
    //get the local storage column direction, turn into boolean not string
    this.UptoDn = localStorage.getItem('direction') === 'false' ? false : true;

    if (isNaN(this.newValues)) { return; }

    //change the button depending on the column direction
    if (this.UptoDn === true) {
      this.tableHeaders[this.newValues].classList.add('downArrow');
      this.sortRows(this.newValues);
    }
    else {
      this.tableHeaders[this.newValues].classList.add('upArrow');
      this.sortRows(this.newValues);
    }

    //reference to turning which buttons on and off
    this.priority = localStorage.getItem('priority');
    if (this.priority === 'true') {
      this.theTable.classList.add('hidePriority');
      btn1.value = 'Show Low Priority';
    }
    this.highlight = localStorage.getItem('highlight');
    if (this.highlight === 'true') {
      this.theTable.classList.add('allowHighlight');
      btn2.value = 'Remove Row Highlight';
    }
    this.type = localStorage.getItem('type');
    if (this.type === 'true') {
      this.theTable.classList.add('hideColumn');
      btn3.value = 'Show Type Column';
    }

    //start the ajax call
    util.sendRequest('json/recent-changes.json?' + Math.random(), this.updateRecentChanges);

  }

  updateRecentChanges(xhr) {
    const data = JSON.parse(xhr.responseText);
    const totalNewChanges = data.changes.length;
    //base string
    let str = '<ul>';
    //add in each lists item to the string
    
    for (let x = 0; x < totalNewChanges; x++) {
      str += '<li><a href="' + data.changes[x].id.toLowerCase() + '.html" title="' + data.changes[x].txt + '">' + data.changes[x].id + '</a> (' + data.changes[x].status + ')</li>';
    }
    str += '</ul>';
    //add it into html
    document.getElementById('recentChanges').insertAdjacentHTML('beforeend', str);

  }

  setDisplay(evt) {

    const btn = util.findTarget(evt, 'input', evt.currentTarget);

    if (!btn) { return; }
  
    // use button value to determine what to do
    switch(btn.value) {
    
      case 'Hide Low Priority': 
      
        this.theTable.classList.add('hidePriority');
        btn.value = 'Show Low Priority';
        this.priority = true;
        break;
      
      case 'Show Low Priority': 
      
        this.theTable.classList.remove('hidePriority');
        btn.value = 'Hide Low Priority';
        this.priority = false;
        break;
      
      case 'Highlight Current Row': 
      
        this.theTable.classList.add('allowHighlight');
        btn.value = 'Remove Row Highlight';
        this.highlight = true;
        break;
    
      case 'Remove Row Highlight': 
      
        this.theTable.classList.remove('allowHighlight');
        btn.value = 'Highlight Current Row';
        this.highlight = false;
        break;
      
      case 'Hide Type Column': 
      
        this.theTable.classList.add('hideColumn');
        btn.value = 'Show Type Column';
        this.type = true;
        break;
      
      case 'Show Type Column':

        this.theTable.classList.remove('hideColumn');
        btn.value = 'Hide Type Column';
        this.type = false;
        break;     
      
    }
    // creates local storage for the buttons
    localStorage.setItem('priority', this.priority);
    localStorage.setItem('highlight', this.highlight);
    localStorage.setItem('type', this.type);
  }
  
  rowHighlight(evt) {

    const row = util.findTarget(evt, 'tr', evt.currentTarget);
    if (!row) { return; }
    row.id = (row.id) ? '' : 'currentRow';
  
  }

  sortingDirection(evt) {
    evt.preventDefault();
    const clickHeader = util.findTarget(evt, 'th', evt.currentTarget);
    if (!clickHeader) { return; }

    //flip the a-z order and arrow when it has up arrow or down arrow
    if (clickHeader.classList.contains('upArrow') || clickHeader.classList.contains('downArrow')) {
      clickHeader.classList.toggle('upArrow');
      clickHeader.classList.toggle('downArrow');
      this.UptoDn = !this.UptoDn;
    }
    else {
      for (let j = 0, allHdrs=this.tableHeaders.length; j < allHdrs; j++) {
        this.tableHeaders[j].removeAttribute('class');
        this.UptoDn = false;
      }
      clickHeader.classList.add('upArrow');
    }
    this.sortRows(this.siblingIndex(clickHeader));
    
  }

  siblingIndex(node) {
    let count = 0;
    while (node = node.previousElementSibling) {
        count++;
    }
    return count;
    
  }

  sortRows(columnIndex) {
    //node list to sort with the innertext inside
    const values = [];
    //node list needs to refresh every click because you need to clear the node list everyclick
    this.newValues = [];

    //this gets the text from each innerText, and checks if it is the first column and does that math
    for (let index = 0; index < this.rows.length; index++) {
      const node = this.rows[index].querySelector("td:nth-child(" + (columnIndex + 1) + ")") || this.rows[index].querySelector("th:nth-child(" + (columnIndex + 1) + ")");
      const val = node.innerText;

      values.push(val + '.' + [index]);
      if (columnIndex > 0) {
        values.sort();
      }
      else {
        values.sort(function (num1,num2) {  
          return num1 - num2;
        });          
      }
    }

    //has this list already been sorted? reverse it
    if (this.UptoDn === false) {
      values.reverse();
    }

    //take the list apart to find out what order we have to put the rows in
    for (let order of values) {
      const newVal = order.split('.').pop();
      this.newValues.push(newVal);
    }

    //delete everyhting in the table and add it all back in
    this.rowHolder.innerHTML = '';
    for (let i=0, allDataRows=values.length; i<allDataRows; i++) {
      this.rowHolder.appendChild(this.rows[this.newValues[i]])
    }

    //local storage for the order and if it is going up or down
    localStorage.setItem('mainList', columnIndex);
    localStorage.setItem('direction', this.UptoDn);
  }

}

const openItems = new dataTable('#projectsTbl');
openItems.init();

const controlsHolder = document.querySelector('#actionForm');
const rowHolder = document.querySelector('#projectsTbl tbody');
const colHeaders = document.querySelector('#projectsTbl thead');

//assign control button event listener
controlsHolder.addEventListener('click', (evt) => openItems.setDisplay(evt), false); 
//assign data row event listener
rowHolder.addEventListener('mouseover', (evt) => openItems.rowHighlight(evt), false);
rowHolder.addEventListener('mouseout', (evt) => openItems.rowHighlight(evt), false);
//assign table header listener
colHeaders.addEventListener('click', (evt) => openItems.sortingDirection(evt), false);