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
    const statsToRoll = ["Meowability", "Feline Ferocity", "Cuddle Prowess"];

    const rollButton = document.querySelector("#roll-btn");
    const catContainer = document.querySelector("#cat-container");
    const diceContainer = document.querySelector("#dice-container"); //Declaring a diceContainer variable to reference in renderRollDice function
    const makeEl = el => document.createElement(el);

    const catURL = "https://cataas.com/cat?json=true";

    // adding a new event listener for the renderRollDice Function
    rollButton.addEventListener("click", renderRollDice)

    // defining renderRollDice Function. It creates the button image elements and appends to the catContainer location. After 3000 milliseconds
    // or 3 seconds, the buttonImg is removed and the catCard is displayed
    function renderRollDice() {
        const buttonImg = makeEl("img");
        buttonImg.src = "https://c.tenor.com/S41MIiFewhoAAAAC/dice-ballin.gif"
        buttonImg.alt = "Rolling the Dice"
        diceContainer.append(buttonImg)

        //remove the roll-dice button image after 3 seconds
        setTimeout(function() {
            buttonImg.remove();
          }, 2000);
        }
    rollButton.addEventListener("click", function () { //using set TimeOut to delay the renderCat by 3000 milliseconds (3 seconds)

        $this = this;
        setTimeout(function() {
            $this.parentNode.parentNode.style.outline = $this.parentNode.parentNode.dataset.ans_outline; //this is jQeuery (I think) code found on Google
            renderCat()
        }, 2000)
    });

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    // fetch(catURL)
    //   .then(resp => resp.json())
    //   .then(cat => console.log(cat.url))

    function renderCat() {
            // generate the name, picture, and stats
        catContainer.innerHTML = ""
        fetch(catURL)
        .then(resp => resp.json())
        .then(cat => {
        
        const catCard = makeEl("div");
        const catImg = makeEl("img");
        const catName = makeEl("h3");
        const catStats = makeEl("ul");

        
        
        // set catCard attributes
        catCard.id = "generated-cat"
        catCard.className = "cat-card"
            
        // set catImg attributes
        catImg.src = "https://cataas.com/" + cat.url
        catImg.alt = "An amazing cat"

        // set catName
        catName.textContent = rollName();

        // set stats
        catStats.innerHTML = rollStats();
    
        //// NS - I tried to make the stats more dynamic so we could
        //// just change the statsToRoll array as needed, but for some
        //// reason, this code kept overwriting the first two <li> tags

    //   const eachStat = makeEl("li");
    //   statsToRoll.forEach(stat => {
    //     catStats.appendChild(eachStat);
    //     eachStat.textContent = rollStats(stat);
    //   })
  

      //  add username submit event listener 
      //  Could possibly generate a thumbnail to save multiple cards

           
  
      // append DOM elements to catCard
         catCard.append(catImg, catName, catStats);

      
      // append catCard to catContainer
         catContainer.append(catCard);
      })
    }

    // this function gets two random numbers and pulls a first name
    // and last name based on the index of the corresponding name array.
    function rollName() {
        let firstName = firstNames[getRandomInt(firstNames.length - 1)];
        let lastName = lastNames[getRandomInt(lastNames.length - 1)];
        let catName = `${firstName} ${lastName}`;
        // console.log(firstNames.length - 1)
        // console.log(catName);
        return catName;
    }

    // this function rolls for stats. It invokes the statsCalc to make
    // higher stats rarer than lower stats
    function rollStats(stat) {
        let meowability = statsCalc();
        let felineFerocity = statsCalc();
        let cuddleProwess = statsCalc();
        return `<li>Meowability: ${meowability}</li><li>Feline Ferocity: ${felineFerocity}</li><li>Cuddle Prowess: ${cuddleProwess}</li>`;

        // return `${stat}: ${statsCalc()}`;
    }

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
 
}) // end DOMContentLoaded

