"use strict";

(function() {

    //adding the container
    const mainBody = document.getElementById('container');
    //defnining the text areas and text boxes
    const textAd1 = document.querySelector('.formList input[name="title_txt"]');
    const textAd2 = document.querySelector('.formList input[name="title_url"]');
    const textAd3 = document.querySelector('.formList textarea[name="description"]');
    const textAd4 = document.querySelector('.formList input[name="visible_url"]');

    //create divs
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const div3 = document.createElement('div');
    const div4 = document.createElement('div');
    const div5 = document.createElement('div');
    const theAnchor = document.createElement('a');

    function adText() {

        //create attributes for divs
        div1.setAttribute("id", "preview");
        div2.setAttribute("id", "adspace");
        div3.setAttribute("id", "title");
        div4.setAttribute("id", "desc_txt");
        div5.setAttribute("id", "vurl_txt");
        
        //create h3, text node, and add together
        const realTime = document.createElement('h3');
        const realTimeTxt = document.createTextNode('Real-time Ad Preview:');
        realTime.appendChild(realTimeTxt);

        //third highest level
        div2.appendChild(div3).appendChild(theAnchor);
        div2.appendChild(div4);
        div2.appendChild(div5);

        //second highest level
        div1.appendChild(realTime);
        div1.appendChild(div2);

        //add the text highest level into the body
        mainBody.appendChild(div1);
    }


    function inputBox1(){

        //finding the first text box
        theAnchor.innerText = this.value;
    }
    function inputBox2(){
        theAnchor.href = this.value;
    }
    function inputBox3(){
        div4.innerText = this.value;
    }
    function inputBox4() {
        div5.innerText = this.value;
    }
    //event listener functions
    textAd1.addEventListener('input', inputBox1, false);
    textAd2.addEventListener('input', inputBox2, false);
    textAd3.addEventListener('input', inputBox3, false);
    textAd4.addEventListener('input', inputBox4, false);

adText()
})();