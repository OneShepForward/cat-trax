document.addEventListener('DOMContentLoaded', (e) => {

    // global variable corral
        // NS - 50 to 100 names each array? I'll probably google list of funny adjectives/nouns or something 
    const firstNames = ["Cornelius", "Whiskers", "David-Bowie", "Fine Gentleman", "Beef",];
    const lastNames = ["Splendifferous", "Stroganoff", "McCutieson", "The White", "of House Lannister", "Chowtime",];
    const statsToRoll = ["Meowability", "Feline Ferocity", "Cuddle Prowess"];

    const rollButton = document.querySelector("#roll-btn");
    const catContainer = document.querySelector("#cat-container");
    const makeEl = el => document.createElement(el);

    const catURL = "https://cataas.com/cat?json=true";

    rollButton.addEventListener("click", renderCat);

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

        const eachStat = makeEl("li");
        
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
    //   statsToRoll.forEach(stat => {
    //     catStats.appendChild(eachStat);
    //     eachStat.textContent = rollStats(stat);
    //   })
  
      //  add username submit event listener 
      
  
      // append DOM elements to catCard
      catCard.append(catImg, catName, catStats);
    //   eachStat.append
      
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
    function rollStats() {
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


    // rollName();
    // rollStats();

    // cat info and reviews
    
    // nav bar?
    
    // submission forms
 
}) // end DOMContentLoaded

