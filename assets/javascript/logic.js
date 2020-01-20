$(document).ready(function () {
   var options = [
        {
            question:"Rap was just becoming well known in the 90s. Which artist had the first number one rap single?",
            choice: ["Kriss Kross", "MC Hammer", "Vanilla Ice", "DJ Jazzy Jeff and the Fresh Prince"],
            answer: 2,
            photo:  "assets/images/vanilla_ice.gif"
        },
        {
            question: "Novelty children shows were also a big hit. Which 90s TV show features characters with the name Tommy, Zack, Kimberly, Billy, and Trini?",
            choice: ["Saved By the Bell", "All That", "Beverly Hills 90210", "The Mighty Morphin Power Rangers"],
            answer: 3,
            photo: "assets/images/powerrangers.gif"
        },
        {
            question: "Which famous girl group of the 90s sung the theme song to the hit sketch comedy TV show 'All That'?",
            choice: ["Destiny's Child", "TLC", "EnVogue", "3LW"],
            answer: 1,
            photo: "assets/images/tlc.gif"
        },
        {
            question: "Which record company had huge success in the 90s with artists such as the Notorious BIG, Mase, and Total?",
            choice: ["Death Row", "Motown", "Bad Boy", "Murder Inc."],
            answer: 2,
            photo: "assets/images/badboys.gif"
        },
        {
            question: "Teenybopper pop was big in the late 90s. Which teen pop idol was NOT in the 'Mickey Mouse Club'?",
            choice: ["Britney Spears", "Justin Timberlake", "JC Chasez", "Jessica Simpson"],
            answer: 3,
            photo: "assets/images/jessicasimpson.gif"
        },
        {
            question: "'Clueless' was a cult hit in the 90s. Which cast member was NOT featured in the TV series?",
            choice: ["Stacey Dash", "Elisa Donovan", "Donald Faison", "Alicia Silverstone"],
            answer: 3,
            photo: "assets/images/clueless.gif"
        },
        {
            question: "What group had the hit wonder in the 90s by the name of 'Lovefool'?",
            choice: ["The Cardigans", "Was Not Was", "The Corrs", "Chumbawumba"],
            answer: 0,
            photo: "assets/images/loovefool.gif"
        },
        {
            question: "These two best friends came together to write the Oscar winning movie, 'Good Will Hunting'?",
            choice: ["Ben Stiller and Owen Wilson", "Ben Affleck and Matt Damon", "Jim Carrey and Will Smith", "Demi Moore and Bruce Willis"],
            answer: 1,
            photo: "assets/images/goodwillhunting.gif"
        },
        {
            question: "Which phrase is a common catchphrase on 'South Park'?",
            choice: ["Oh no silly gooses!", "Kick it and kick it good.", "You are dead ducks boys!", "Screw you guys...I'm going home."],
            answer: 3,
            photo: "assets/images/southpark.gif"
        },
        {
            question: "The 1990s was a golden age for modern Disney movies. Which Disney Movie did NOT debut in the 90s?",
            choice: ["Beauty and the Beast", "Tarzan", "The Lion King", "The Little Mermaid"],
            answer: 3,
            photo: "assets/images/littlemermaid.gif"
        }];
    
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    
    
    $("#reset").hide();
    //click start button to start game
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })
    //timer start
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timeLeft").html("<h2>Time remaining: " + timer + "</h2>");
        timer --;
    
        //stop timer if reach 0
        if (timer === -1) {
            unanswerCount++;
            stop();
            $("#answerBlock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //randomly pick question in array if not already shown
    //display question and loop though and display possible answers
    function displayQuestion() {
        //generate random index in array
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    

            //iterate through answer array and display
            $("#questionBlock").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                //assign array position to it so can check answer
                userChoice.attr("data-guessvalue", i);
                $("#answerBlock").append(userChoice);
    //		}
    }
    
    
    
    //click function to select answer and outcomes
    $(".answerchoice").on("click", function () {
        //grab array position from userGuess
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        //correct guess or wrong guess outcomes
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerBlock").html("<p>Correct!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerBlock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    
    function hidepicture () {
        $("#answerBlock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answerBlock").empty();
            timer= 20;
    
        //run the score screen if all questions answered
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            timer = 0;
            $("#timeLeft").html("<h2> Time Remaining: " + timer + "</h2>");
            $("#questionBlock").empty();
            $("#questionBlock").html("<h2>Game Over!  Here's how you did: </h2>");
            $("#answerBlock").append("<h2> Correct: " + correctCount + "</h2>" );
            $("#answerBlock").append("<h2> Incorrect: " + wrongCount + "</h2>" );
            $("#answerBlock").append("<h2> Unanswered: " + unanswerCount + "</h2>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
            
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 3000);
    
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerBlock").empty();
        $("#questionBlock").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })