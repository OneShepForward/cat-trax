document.addEventListener('DOMContentLoaded', (e) => {

    // global variable corral
    // NS - 50 to 100 names each array? I'll probably google list of funny adjectives/nouns or something 
    const firstNames = ["Cornelius", "Whiskers", "David-Bowie", "Fine Gentleman", "Beef", "Rigmarole", "Lazy", "Benjamin",
                         "Henrietta", "Lady", "Hambone", "Slippers", "Alfred", "Titania", "Gwenivere", "Hercules", "Lil' Cousin",
                         "Edmond", "Count", "Dmitri", "Helga", "Sally", "Squishy", "Doctor", "Sterling", "Axel", "Mittens",
                          "Lazer", "French Chef", "Corncob", "Grandma", "Patagucci", "Espresso", "Arthur", "Dom", "Popcorn", 
                          "Khajiit", "Bastion", "Love", "Chrono",];
    const lastNames = ["Splendifferous", "Stroganoff", "McCutieson", "The White", "of House Lannister", "Chowtime",
                        "Inkle", "Mollycoddle", "Winklepicker", "Gardyloo", "Cattywampus", "The Pig", "Fubbins", "of Perth", "Litter Spiller",
                         "The Brutal", "Tarnhelm", "Skywalker", "Von Smeagledorf", "Le Tired", "Octothorpe", "Catnip-Lover", 
                         "Dollop", "Ramshackle", "Dumbledore", "Switchblade", "Hides-His-Eyes", "The Whisperer", "Unseen", "Rainbow", "Blasé", 
                         "XIII", "Baggins", "Jones", "Tiger-tail", "Katmandu", "Benedetto", "All Curled Up", "Dijon", "Lohan", "le Fay",];

    const BASE_URL = 'http://localhost:3000/cats';
    const catURL = "https://cataas.com/cat?json=true";

    const saveButton = document.querySelector('#save-button');
    const rollButton = document.querySelector("#roll-btn");
    const catContainer = document.querySelector("#cat-container");
    const diceContainer = document.querySelector("#dice-container"); //Declaring a diceContainer variable to reference in renderRollDice function
    const usernameForm = document.querySelector('#owner-name')
    const menagerie = document.querySelector('#menagerie');
    const textArea = document.querySelector("#owner-name");
    
    const makeEl = el => document.createElement(el);
    
    let currentCat = {};
    
    fetchMenagerie();
    
    rollButton.addEventListener("click", function () { //using set TimeOut to delay the renderCat by 2000 milliseconds (2 seconds)

        $this = this;
        setTimeout(function() {
            $this.parentNode.parentNode.style.outline = $this.parentNode.parentNode.dataset.ans_outline; //this is jQeuery (I think) code found on Google
            createCat()
            textArea.style.display = "block";
            saveButton.style.display = "block";
        }, 2000)
    });
    saveButton.addEventListener("click", e => {
        e.preventDefault();
        if(Object.keys(currentCat).length!==0) {
            addCatToMenagerie(currentCat);
        }
    })

    function populateMenagerie(cat) {
        const catCard = makeEl('div');
        const catPic = makeEl('img');
        const catName = makeEl('h3');
        const userName = makeEl('h4');
        const deleteButton = makeEl('button');
        // Add catStatsBox
        const catStatsBox = makeEl("span");

        catCard.id = `cat-${cat.id}`
        catCard.className = 'mini-cat';
        catPic.src = cat.img;
        catPic.alt = cat.name;
        catPic.className = 'mini-cat-image';
        catName.textContent = cat.name;
        userName.textContent = `Claimed by ${cat.userName}`;
        deleteButton.textContent = "Delete Cat";
        deleteButton.id = "deleteBttn";
        deleteButton.type = "click";
        deleteButton.addEventListener("click",deleteCat);


        // catStatsBox text content
        catStatsBox.className = "tooltiptext";
        catStatsBox.textContent = "Meowibility: " + cat.meowability + "\r";
        catStatsBox.textContent += `Feline Ferocity: ${cat.felineFerocity} \n`
        catStatsBox.textContent += `Cuddle Prowess: ${cat.cuddleProwess}`
        
        // added catStatsBox to append
        catCard.append(catPic,catName,userName,catStatsBox,deleteButton);
        menagerie.append(catCard);

        // Add a mouseover hover event
        // catCard.addEventListener("onmouseover", showStatBox)
    }

    function fetchMenagerie() {
        fetch(BASE_URL)
        .then(res=>res.json())
        .then(cats=>cats.forEach(cat=>populateMenagerie(cat)))
        .catch(error=>console.error("fetchMengarerie",error));
    }

    function addCatToMenagerie(cat) {
        fetch(BASE_URL,{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...cat, 
                "userName": usernameForm.value,
            }),  
        })
        .then(resp=>resp.json())
        .then(populateMenagerie)
        .catch(error=>console.error("addCatToMenagerie",error));
    }

    function createCat() {
        fetch(catURL)
        .then(r => r.json())
        .then(catpic => {
            currentCat = {
                name: rollName(),
                img: "https://cataas.com/"+catpic.url,
                meowability: statsCalc(),
                felineFerocity: statsCalc(),
                cuddleProwess:  statsCalc(),
            }
            renderCat(currentCat);
        })
        .catch(error=>console.error("createCat",error));
        
        
    }

    function deleteCat(event) {
        event.preventDefault();
        const catNum = event.target.parentNode.id.match(/(\d+)/)[0];
        fetch(BASE_URL+"/"+catNum,{
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json'
            },  
        })
        .then(resp=>resp.json())
        .then(event.target.parentNode.remove())
        .catch(error=>console.error("addCatToMenagerie",error));;
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function renderCat(cat) {
        
        // if cat card...then catcard.remove()

        // if (document.querySelector('.cat-card')) {
        //     document.querySelector('.cat-card').remove();
        // }
        
        
        // generate the name, picture, and stats
        catContainer.replaceChildren();

        
        const catCard = makeEl("div");
        const catImg = makeEl("img");
        const catName = makeEl("h3");
        const catStats = makeEl("ul");
        const meow = makeEl('li');
        const fero = makeEl('li');
        const cuddle = makeEl('li');

        // set catCard attributes
        catCard.id = "generated-cat"
        catCard.className = "cat-card"
        
        // set catImg attributes
        catImg.src = cat.img
        catImg.alt = "An amazing cat"

        // set catName
        catName.textContent = cat.name;

        // set stats
        meow.textContent = "Meowability: "+cat.meowability;
        fero.textContent = "Feline Ferocity: "+cat.felineFerocity;
        cuddle.textContent = "Cuddle Prowess: "+cat.cuddleProwess;
        catStats.append(meow,fero,cuddle);
        
        // append DOM elements to catCard
        catCard.append(catImg, catName, catStats);

        // append catCard to catContainer
        const catRoller = document.querySelector('#cat-roller')
        catRoller.parentNode.insertBefore(catCard,catRoller.nextSibling);
        // document.querySelector('main').insertAfter(catRoller,catCard);

        // catContainer.append(catCard);
    }

    function rollName() {
        let firstName = firstNames[getRandomInt(firstNames.length - 1)];
        let lastName = lastNames[getRandomInt(lastNames.length - 1)];
        let catName = `${firstName} ${lastName}`;
        return catName;
    }

    // adding a new event listener for the renderRollDice Function
    rollButton.addEventListener("click", renderRollDice)

    // defining renderRollDice Function. It creates the button image elements and appends to the catContainer location. After 3000 milliseconds
    // or 3 seconds, the buttonImg is removed and the catCard is displayed
    function renderRollDice() {

        if (document.querySelector('.cat-card')) {
            document.querySelector('.cat-card').remove();
        }
        
        const buttonImg = makeEl("img");
        buttonImg.src = "https://c.tenor.com/S41MIiFewhoAAAAC/dice-ballin.gif"
        buttonImg.alt = "Rolling the Dice"
        diceContainer.append(buttonImg)

        //remove the roll-dice button image after 2 seconds
        setTimeout(function() {
            buttonImg.remove();
          }, 2000);
        }

    // this function rolls for stats. It invokes the statsCalc to make
    // higher stats rarer than lower stats
    // calculates a stat by rolling two five-sided dice
    function statsCalc() {
        const randNum = getRandomInt(25);
        let stat;
        if (randNum === 0) {
            stat = 1;
        } else if (randNum === 1) {
            stat = 2;
        } else if (randNum >= 2 && randNum <= 3) {
            stat = 3;
        } else if (randNum >= 4 && randNum <= 6) {
            stat = 4;  
        } else if (randNum >= 7 && randNum <= 10) {
            stat = 5;
        } else if (randNum >= 11 && randNum <= 15) {
            stat = 6;
        } else if (randNum >= 16 && randNum <= 19) {
            stat = 7;
        } else if (randNum >= 20 && randNum <= 22) {
            stat = 8;
        } else if (randNum >= 23 && randNum <= 24) {
            stat = 9;
        } else if (randNum === 25) {
            stat = 10;
        } else {
            console.error("unexpected randNum in statsCalc");
            return 1;
        }
        return stat;
    }
 
})
