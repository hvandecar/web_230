class highlightSwitcher {

    constructor(contentID, highlightID,) {

        //these are my class properties
        this.highlight = document.getElementById(contentID);
        this.button = document.getElementById(highlightID);
    }

    toggleHighlight(evt) {
        
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
 const switcher = new highlightSwitcher('content', 'highlight',);

 switcher.button.addEventListener('click', (evt) => switcher.toggleHighlight(evt), false);