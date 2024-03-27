class faqSet {

    constructor(btnHide, answersHolder, answerHeader, typeClass, btnHighlight, lightClass, btnLow, rowDelete, bgHighlight) {

        //this is for the first button
        this.lowBtn = document.querySelector(btnLow);
        this.rowLow = document.querySelectorAll(rowDelete);
        //this is for the second button
        this.highlightBtn = document.querySelector(btnHighlight);
        this.backgroundHighlight = document.querySelectorAll(bgHighlight)
        this.bgClass = lightClass;
        //this is for the third button 
        this.columnBtn = document.querySelector(btnHide);
        this.answers = document.querySelectorAll(answersHolder);
        this.headers = document.querySelectorAll(answerHeader);
        this.typeClass = typeClass;
    }

    toggleLow(){

        this.lowBtn.value = (this.lowBtn.value === 'Hide Low Priority') ? 'Show Low Priority' : 'Hide Low Priority';

        for (const btn of this.rowLow) {
            btn.classList.toggle(this.typeClass);
        }
    }

    toggleHighlight() {

        this.highlightBtn.value = (this.highlightBtn.value === 'Highlight Current Row') ? 'Remove Row Highlight' : 'Highlight Current Row';
        this.highlightRow = (this.highlightBtn.value === 'Remove Row Highlight') ? this.highlightRow() : false;
    }
    
    highlightRow() {

        for (const backgroundSwitch of this.backgroundHighlight){
            backgroundSwitch.classList.toggle(this.bgClass);
        }
    }

    toggleType() {
        
        this.columnBtn.value = (this.columnBtn.value === 'Hide Type Column') ? 'Show Type Column' : 'Hide Type Column';
  
        for (const answer of this.answers) {
            answer.classList.toggle(this.typeClass);
        }
        for (const typeTop of this.headers) {
            typeTop.classList.toggle(this.typeClass);
        }
    }
}
  
const faq = new faqSet('#actionForm input:nth-of-type(3)', '#projectsTbl tbody tr td:nth-of-type(1)', '#projectsTbl thead tr th:nth-of-type(2)', 'displayNone', '#actionForm input:nth-of-type(2)', '.highlightRow', '#actionForm input:nth-of-type(1)', '#projectsTbl tbody tr[data-priority=low]', '#projectsTbl tbody tr');
const elementsRef = [
    faq.backgroundHighlight,
]
//this is for the first button
faq.lowBtn.addEventListener('click', () => faq.toggleLow(), false);

//this is the triggers for the second button
faq.highlightBtn.addEventListener('click', () => faq.toggleHighlight(), false);
for (const row of elementsRef[0]) {
row.addEventListener('mouseenter', () => faq.toggleHighlight(), false);
row.addEventListener('mouseleave', () => faq.toggleHighlight(), false);
}

//this is for the third button
faq.columnBtn.addEventListener('click', () => faq.toggleType(), false);