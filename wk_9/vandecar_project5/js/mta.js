"use strict";

(function() {

    //adding the container
    const mainBody = document.getElementById('container');
    //defnining the text areas and text boxes
    const textBox = document.getElementById('form');
    const adDetails = document.querySelector('.formList');
    const keyDetails = document.getElementById('keyList');
    const submitBtn = document.querySelector('form #action input');
    
    //creating references to make ad dynamically
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

        //add the captions
        adDetails.insertAdjacentHTML('beforebegin', '<p id="msg1">\'Title URL\' and \'Visible URL\' are added to the preview when valid; if invalid their field name is red and boldface.</p>');
        keyDetails.insertAdjacentHTML('beforebegin', '<p id="msg2">Up to 5 keywords / keyphrases can be entered. <input type="button" value="Add Another" id="addAnotherBtn" /></p>');
    }

    function adWriter(evt) {

        const theCell = findTarget(evt, 'input', this);
        const theTextareaCell = findTarget(evt, 'textarea', this);
        const siteLink = /^([a-zA-Z0-9_\-]+(\.))+\w{2,6}$/;
        const hrefValid = /^(https?:\/\/)([a-zA-Z0-9_\-]+(\.))+\w{2,6}$/;
        let correctLink = false;
        let correctHref = false;
        let updateSubmitBtn = false;

        if (!theCell && !theTextareaCell) {
            return;
        }

        if (theCell && theCell.name === 'keyphrase[]') {
            return;
        }

        if (theCell && (theCell.id === 't_url' || theCell.id === 'v_url')) {

            updateSubmitBtn = true;

            if (textAd2.value === '' || hrefValid.test(textAd2.value)) {
              correctHref = true;
            }

            if (textAd4.value === '' || siteLink.test(textAd4.value)) {
              correctLink = true;
            }
        
        }

        if (theCell) {

            if (theCell === textAd1) {
                div3.innerText = theCell.value;
            }

            if (theCell === textAd2) {
                if(correctHref) {
                    theAnchor.href = theCell.value;
                    textAd2.setAttribute('aria-invalid', 'false');
                    textAd2.parentNode.classList.remove('error');
                }
                else {
                    theAnchor.removeAttribute('href');
                    textAd2.setAttribute('aria-invalid', 'true');
                    textAd2.parentNode.classList.add('error');
                    submitBtn.disabled = true;
                }
                if (theCell.value.length === 0) {
                    textAd2.setAttribute('aria-invalid', 'false');
                    textAd2.parentNode.classList.remove('error');
                }
            }

            if (theCell === textAd4) {
                if(correctLink) {
                    div5.innerText = theCell.value;
                    textAd4.setAttribute('aria-invalid', 'false');
                    textAd4.parentNode.classList.remove('error');
                }
                else {
                    div5.innerText = '';
                    textAd4.setAttribute('aria-invalid', 'true');
                    textAd4.parentNode.classList.add('error');
                    submitBtn.disabled = true;
                }
                if (theCell.value.length === 0) {
                    textAd4.setAttribute('aria-invalid', 'false');
                    textAd4.parentNode.classList.remove('error');
                }
            }

        }

        if (theTextareaCell) {

            if (theTextareaCell === textAd3) {
                div4.innerText = theTextareaCell.value;
            }

        }

        if (updateSubmitBtn) {
            if (correctLink && correctHref) {
                submitBtn.disabled = false;
            }
            else {
                submitBtn.disabled = true;
            }
        }

    }

    function newBtn(evt) {

        const btnClick = findTarget(evt, 'input', this);
        const theBtn = document.querySelector('#keys #msg2 input');
        const listItems = keyDetails.getElementsByTagName('li');
        
        if (!btnClick) {
            return;
        }
        if (btnClick === theBtn) {
        keyDetails.insertAdjacentHTML('beforeend', '<li><input type="text" aria-label="Enter keyphrase" size="30" name="keyphrase[]" /></li>');
            if (listItems.length === 5) {
                theBtn.classList.add('rem');
            }
        }

    }

    function findTarget(evt, targetNode, container) {
 
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
    //event listener functions
    textBox.addEventListener('keyup', adWriter, false);
    textBox.addEventListener('click', newBtn, false);
adText()
})();