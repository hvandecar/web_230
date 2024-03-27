'use strict';
 
const bar = {

    // here is the base array
    list : ['home','about','design','usability','programming','clients','contact'],

    generate_col : function() {
        //total number of rows
        const totalRows = bar.list.length;

        //making the nav and the list
        document.write('<nav><ul id="globalnav">');
        
        //write the list item and href
        for (let row=0; row < totalRows; row++) {
            document.write('<li><a href="' + bar.list[row] + '.html">' + bar.list[row] + '</a></li>');
        }

        //close the list
        document.write('</ul></nav>');

    }

}