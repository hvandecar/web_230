"use strict";
 
(function() {
 
   //this takes parent of checkbutton and adds the center class
    function centerCheck() {

        for (const center of button) {
  
        center.parentNode.classList.add('action');
  
        }
    }

    function hoursInput1() {
      
      //loop to see if first child matches the text we're looking for
        if (client === 'Non-Billable'){
          //if it says non-billable turn off the textbox  
            typeCell.disable = true;

          //create another loop that reads and adds text depending if the tag is full or empty already  
            if (addText.textContent.length > 0){
                addText.appendChild(document.createTextNode('(Non-Billable)'));
            }
            else {
                addText.appendChild(document.createTextNode('Non-Billable'));
            }
          //this changes the background of the non-billable rows
          typeCell.classList.add('action');  

        }
      //if it does not say non-billable then you add hours at the end  
        else {
            typeCell.parentNode.appendChild(document.createTextNode(' Hours'));
        }
    }
    
        

  //this is finding the checkbox
    const button = document.getElementsByName('deleteRow');
  //this is finding where the words get added to
    const hours = document.getElementsByName('input[name ^= "hoursTask"]');
  //this calls basically the tr in our specified table
    const typeCell = hours.parentNode.parentNode;
  //this calls the client node and reads it
    const client = document.querySelector('input[scope="row"]');
  //this finds where scope description is  
    const findBillable = typeCell.getElementsByTagName('input[scope="row"]');
  //length of the nonbillable
    const addText = findBillable.length;

 
})();
