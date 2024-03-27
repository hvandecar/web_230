"use strict"

const highlightSwitcher = {

    //this references the body tag
    highlight : document.getElementById('content'),
    //this references what needs to be triggered for the button to do anything
    button : document.getElementById('highlight'),

    init : function() {

        this.button.addEventListener('click', this.toggleHighlight, false);
        
    },

    toggleHighlight : function() {
        
        if (this.button.value === 'Highlight Answers') {
            for (let element of p.this.highlight.children) {
                element.this.highlight.className = 'visualBox';
            }   
            this.button.value = 'Remove Highlight';
        }
        else {
            this.highlight.classList.remove = 'visualBox';
            this.button.value = 'Highlight Answers';    
        } 
    }
}