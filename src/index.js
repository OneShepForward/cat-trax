document.addEventListener('DOMContentLoaded', (e) => {

    // global variable corral

        // NS - 50 to 100 names each array? I'll probably google list of funny adjectives/nouns or something 
    const firstNames = ["Cornelius", "Whiskers", "David-Bowie", "Fine Gentleman", "Beef",];
    const lastNames = ["Splendifferous", "Stroganoff", "McCutieson", "The White", "of House Lannister", "Chowtime",];

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function renderCat(cat) {
        // generate the name, picture, and stats
    }

    function rollName() {
        let firstName = firstNames[getRandomInt(firstNames.length - 1)];
        let lastName = lastNames[getRandomInt(lastNames.length - 1)];
        let catName = `${firstName} ${lastName}`;
        console.log(firstNames.length - 1)
        console.log(catName);
    }

    rollName();

    // cat info and reviews
    
    // nav bar?
    
    // submission forms
 
}) // end DOMContentLoaded

