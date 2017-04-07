/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

//Create a Cordova Android App that lets people store gift ideas.
//
//There will be two mains screens and two modal popups. The first screen is the list of people that you have added to the app along with their birthdays. Each person will have an arrow to navigate to the second page, a list of gift ideas for that person. The person screen will also have a button to open a modal popup to add a new person. Clicking on a person's name from the list, will also open the same modal popup but it allows the user to edit the person instead of adding a new one.
//
//On the gift page there will be a button for adding a new idea to the list. The modal popup for adding gifts will ask for the idea, the location where it can be bought, a URL where it can be found online, and a cost. The list of gifts will display the idea and then optionally the other three things about the idea. If any of the other fields are empty then they are not displayed in the list. There will also be a delete button for each idea so it can be removed.
//
//All the data needs to be saved in localStorage. Use the key "giftr-abcd0001", but replace the abcd0001 with your own username.


'use strict';

let people = new Array();
let ideaList = new Array();
let giftListPerson;
let currentPerson;
let localStorageKey = "giftr-hunt0278"

document.addEventListener('deviceready', onDeviceReady);


window.addEventListener('push', function (ev) {

    let contentDiv = ev.currentTarget.document.querySelector(".content")
    let id = contentDiv.id;
    switch (id) {
        case "index":
            let saveButton = document.getElementById("savebtn");
            saveButton.addEventListener("click", savePerson);
            console.log("Save Button is Clicked " + saveButton);
            peopleList();
            break;
        case "gifts":
            let saveGiftButton = document.getElementById("saveGiftButton");
            saveGiftButton.addEventListener("click", saveGift);
            console.log("Save Gift button is clicked " + saveGiftButton);
            determinePerson();
            break;
        default:
            peopleList();
            console.log("If everything fails display the list of people")
    }

});


function onDeviceReady() {
    let saveButton = document.getElementById("savebtn");
    saveButton.addEventListener("click", savePerson);
    console.log("Save Button clicked " + saveButton);
    peopleList();
}
// Function to save a person
function savePerson() {
    let saveName = document.getElementById("nameField").value;
    let saveDate = document.getElementById("dateField").value;
    console.log("Save Name " + saveName);
    console.log("Save Date " + saveDate);

    if (currentPerson == 0) {

        let timeStamp = new Date().getTime() / 1000;
        console.log("The timestamp is " + timeStamp);
        let person = {
            id: timeStamp,
            name: saveName,
            dob: saveDate,
            ideas: new Array()
        };
        console.log("The people is " + person);
        
        people.push(person);
    } else {
        for (let i = 0; i < people.length; i++) {
            if (people[i].id == currentPerson) {
                people[i].dob = saveDate;
                people[i].name = saveName;
                break;
            }
        }
    }

    currentPerson = 0;
    console.log("The people array " + people);
    
    setLocalStorage();

    document.getElementById("nameField").value = "";
    document.getElementById("dateField").value = "";
   
    var endEvent = new CustomEvent('touchend', {
        bubbles: true,
        cancelable: true
    });
    var a = document.querySelector("a#xButton");
    a.dispatchEvent(endEvent);
   
    peopleList();

}

function peopleList() {
    getLocalStorage();
    let list = document.getElementById("contact-list");
    list.innerHTML = "";
    console.log("The contact List " + list);

    for (let i = 0; i < people.length; i++) {
        
        let li = document.createElement("li");
        li.className = "table-view-cell";
        console.log(li);
        li.setAttribute("dataId", people[i].id);
        let spanName = document.createElement("span");
        spanName.className = "name";
        console.log(spanName);
        let aName = document.createElement("a");
        aName.textContent = people[i].name;
        aName.href = "#personModal"
       
        aName.setAttribute("data-name", people[i].name);
        aName.setAttribute("data-dob", people[i].dob);

        //create elemnet for the date of birth
        let spanDob = document.createElement("span");
        spanDob.className = "dob";
        spanDob.textContent = moment(people[i].dob).format("MMMM DD");
        console.log(spanDob);
        let aDob = document.createElement("a");
        aDob.className = "navigate-right pull-right";
        aDob.href = "gift.html"
        spanName.appendChild(aName);
        aDob.appendChild(spanDob);
        li.appendChild(spanName);
        li.appendChild(aDob);
        list.appendChild(li);
    }
}


function saveGift() {

    let saveGift = document.getElementById("giftField").value;
    console.log("Save Gift " + saveGift);
    let saveStore = document.getElementById("storeField").value;
    console.log("Save Store " + saveStore);
    let saveURL = document.getElementById("urlField").value;
    console.log("Save URL " + saveURL);
    let saveCost = document.getElementById("costField").value;
    console.log("Save Cost " + saveCost);
    let timeStamp = new Date().getTime() / 1000;

    let giftIdea = {
        idea: saveGift,
        at: saveStore,
        url: saveURL,
        cost: saveCost,
        id: timeStamp
    };

    console.log("The Gift idea is " + giftIdea);

    ideaList.push(giftIdea);
    console.log("This is the idea list" + ideaList);
    saveContact();

    document.getElementById("giftField").value = "";
    document.getElementById("storeField").value = "";
    document.getElementById("urlField").value = "";
    document.getElementById("costField").value = "";

    
    var endEvent = new CustomEvent('touchend', {
        bubbles: true,
        cancelable: true
    });
    var a = document.querySelector("a#xGiftButton");
    a.dispatchEvent(endEvent);

    giftList();
}

function determinePerson() {

    for (let i = 0; i < people.length; i++) {
        
        if (giftListPerson == people[i].id) {
          
            ideaList = people[i].ideas;
            document.getElementById("addName").textContent = "The Gift idea " + people[i].name;
            document.getElementById("giftTitle").textContent = people[i].name;
            break;
        }
    }
    giftList();

}

function setLocalStorage() {
    localStorage.setItem(localStorageKey, JSON.stringify(people));
}

function getLocalStorage() {
    if (!localStorage.getItem(localStorageKey)) {

        
    } else {
        people = JSON.parse(localStorage.getItem(localStorageKey));
    }
}

function giftList() {

    let giftList = document.getElementById("gift-list");
    giftList.innerHTML = "";
    console.log("The Gift list is " + giftList);


    for (let i = 0; i < ideaList.length; i++) {
        let liGift = document.createElement("li");
        console.log("The li for Gift " + liGift);
        liGift.className = "table-view-cell media";
        liGift.setAttribute("dataId", ideaList[i].id);
        let spanDelete = document.createElement("span");
        spanDelete.className = "pull-right icon icon-trash midline";
        console.log("Span Delete " + spanDelete);
        let divIdeaDisplay = document.createElement("div");
        divIdeaDisplay.textContent = ideaList[i].idea;
        divIdeaDisplay.className = "media-body";



        if (ideaList[i].at != "") {
            let pStore = document.createElement("p");
            pStore.textContent = ideaList[i].at;
            divIdeaDisplay.appendChild(pStore);
            console.log("The Store Name " + pStore);
        }

        if (ideaList[i].url != "") {
            let pUrl = document.createElement("p");
            let aUrl = document.createElement("a");
            aUrl.textContent = ideaList[i].url;
            aUrl.href = ideaList[i].url;
            pUrl.appendChild(aUrl);
            divIdeaDisplay.appendChild(pUrl);
            console.log("The URL " + pUrl + aUrl);
        }

        if (ideaList[i].cost != "") {
            let pCost = document.createElement("p");
            pCost.textContent = ideaList[i].cost;
            divIdeaDisplay.appendChild(pCost);
            console.log("The Cost " + pCost);
        }
        liGift.appendChild(spanDelete);
        liGift.appendChild(divIdeaDisplay);
        giftList.appendChild(liGift);
    }

}

function saveContact() {
    for (let i = 0; i < people.length; i++) {
        if (giftListPerson == people[i].id) {
            people[i].ideas = ideaList;
            break;
        }
    }
    setLocalStorage();
}

