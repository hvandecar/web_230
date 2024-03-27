'use strict';
(function() {

    const gvs = {

        //ref to where new text goes
        newDiv : document.getElementById('helpWrapper'),
        //ref to where the input cells
        cellHolder : document.querySelector('#data tbody'),

        //generate element nodes
        help : document.createElement('a'),
        unorder : document.createElement('ul'),
        li1 : document.createElement('li'),
        li2 : document.createElement('li'),
        li3 : document.createElement('li'),
        txt1 : document.createTextNode('To lock a cell (prevent edits) SHIFT + click on the cell; to unlock repeat this process.'),
        txt2 : document.createTextNode('To highlight a cell ALT + click on the cell; to remove the highlight repeat the process.'),
        txt3 : document.createTextNode('To clear a cell\'s value CTRL + click on the cell.'),

        init : function() {

            //this function adds a click listener for input cells and generates the dropdown with a listener as well
            this.setUp();
            this.help.addEventListener('click', this.showHideHelp, false);
            this.cellHolder.addEventListener('click', this.inputSelects, false);
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

            //avengers assemble
            this.unorder.appendChild(this.li1);
            this.unorder.appendChild(this.li2);
            this.unorder.appendChild(this.li3);
            this.newDiv.appendChild(this.help);
            this.newDiv.appendChild(this.unorder);
        },

        showHideHelp : function(evt) {

            //function to make the ul drop down on click
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

      

        inputSelects : function(evt) {

            const theCell = gvs.findTarget(evt, 'input', this);

            if (!theCell) {
                return;
            }

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
            }

            //this function is for altKey
            if(evt.altKey) {
                theCell.classList.toggle('marked');
            }
            
            //this function is for ctrlKey
            if(evt.ctrlKey) {
                theCell.value = '';
            }
            
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
        },
    }
    gvs.init();
})();