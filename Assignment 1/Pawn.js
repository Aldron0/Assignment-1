//Registering a selected pawn

var pawnSelected = false;

var selectedPawn = $('.pawn').on('click', function() {

    $(this).toggleClass('clicked');
    sPawn = $(this).attr('id');
    pawnSelected = true;
    return sPawn;
});

//moving the pawn
function move(chosenPawn) {

    if (pawn.parent() == $('.startPos')) {

        if (pawn.color == $('.yellow')) {
            var yellowStart = document.getElementById('.yellowStart');
            chosenPawn.appendTo(yellowStart);

        } else if (pawn.color == $('.green')) {
            var greenStart = document.getElementById('.greenStart');
            chosenPawn.appendTo(greenStart);

        } else if (pawn.color == $('.blue')) {
            var blueStart = document.getElementById('.blueStart');
            selectPawn.appendTo(blueStart);

        } else if (pawn.color == $('.red')) {
            var redStart = document.getElementById('.redStart');
            selectPawn.appendTo(redStart);

        }

    } else {

    }

}
