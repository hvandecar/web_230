"use strict";
(function() {

  const tbl = {

    // reference to the data table
    theTable : document.getElementsByTagName('table')[0],

    // reference to the first row of the table (holding header cells)
    headerRow : document.getElementsByTagName('table')[0].rows[0],

    init : function() {

      // assign mouse events to table    
      this.theTable.addEventListener('mouseover', this.addRemoveHighlight, false);
      this.theTable.addEventListener('mouseout', this.addRemoveHighlight, false);    
    
    },

    addRemoveHighlight : function(evt) {

      const targetCell = tbl.findTarget(evt, 'td', this);
  
      if (targetCell) {

        // highlight cell moused over
        targetCell.classList.toggle('highlight');
        
        // highlight row header cell
        targetCell.parentNode.cells[0].classList.toggle('highlight');

        // highlight column header cell
        tbl.headerRow.cells[targetCell.cellIndex].classList.toggle('highlight');

        //highlight row background cells
        for(let rowCell = 1; rowCell < targetCell.cellIndex; rowCell++) {
          targetCell.parentNode.cells[rowCell].classList.toggle('path');
        }
        //highlight cell background cells
        for(let colCell = 1; colCell < targetCell.parentNode.rowIndex; colCell++) {
          tbl.theTable.rows[colCell].cells[targetCell.cellIndex].classList.toggle('path');
        }
        
      }

    },
    
    findTarget : function(evt, targetNode, container) {
      let currentNode = evt.target;
      while (currentNode && currentNode !== container) {  
        if (currentNode.nodeName.toLowerCase() === targetNode.toLowerCase()) { return currentNode; }
        else { currentNode = currentNode.parentNode; } 
      }
      return false;
    }
    
  }

  tbl.init();
  
})();