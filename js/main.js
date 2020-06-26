var can_play = true;
var words = new Array("CAVIAR", "REESES", "PROSCIUTTO", "CRABCAKES", "QUESADILLA", "CROISSANT", "SRIRACHA", "SMARTFOOD", "GOUDA", "DORITOS");

var to_guess = "";
var display_word = "";
var used_letters = "";
var wrong_guesses = 0;

$("#reset").on("click", function(){
  reset();
});

$(".letter").on("click", function(e){
  e.preventDefault();
  selected_letter = $(this).text();
  selectLetter(selected_letter);
});

function selectLetter(l) {
    if (can_play == false) {
        return;
    }

    if (used_letters.indexOf(l) != -1) {
        return;
    }

    used_letters += l;
    document.game.usedLetters.value = used_letters;

    if (to_guess.indexOf(l) != -1) {
        // correct letter guess
        pos = 0;
        temp_mask = display_word;


        while (to_guess.indexOf(l, pos) != -1) {
            pos = to_guess.indexOf(l, pos);
            end = pos + 1;

            start_text = temp_mask.substring(0, pos);
            end_text = temp_mask.substring(end, temp_mask.length);

            temp_mask = start_text + l + end_text;
            pos = end;
        }

        display_word = temp_mask;
        document.game.displayWord.value = display_word;

        if (display_word.indexOf("#") == -1) {
            // won
            setTimeout (function(){ alert("Well done, you caught the sneaky SnakMan!"); }, 600);
            can_play = false;
        }
    } else {
        // incorrect letter guess
        wrong_guesses += 1;
        eval("document.hm.src=\"img/snackman" + wrong_guesses + ".png\"");

        if (wrong_guesses == 8) {
            // lost
            setTimeout (function(){ alert("The SnakMan escapes!"); }, 600);
            can_play = false;
        }
    }
}

function reset() {
    selectWord();
    document.game.usedLetters.value = "";
    used_letters = "";
    wrong_guesses = 0;
    document.hm.src = "img/snackmanstart.png";
}

function selectWord() {
    can_play = true;
    random_number = Math.round(Math.random() * (words.length - 1));
    to_guess = words[random_number];
    //document.game.theWord.value = to_guess;

    // display masked word
    masked_word = createMask(to_guess);
    document.game.displayWord.value = masked_word;
    display_word = masked_word;
}

function createMask(m) {
    mask = "";
    word_lenght = m.length;


    for (i = 0; i < word_lenght; i++) {
        mask += "#";
    }
    return mask;
}

window.onload = function(){
  reset();
}
