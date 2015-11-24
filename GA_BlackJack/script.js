$(document).ready(function() {
//initially disables the hit and stand buttons
  $('.stand1').attr("disabled", true);
  $('.hit1').attr("disabled", true);
  $('.stand2').attr("disabled", true);
  $('.hit2').attr("disabled", true);

// variables

var counter = 0;
var suitResults;
var playerScore1 = 0;
var playerScore2 = 0;

//functions

//resets gameboard to default when new game button is pushed
var resetGameboard = $(".newGame").on('click', function(event) {
  event.preventDefault();
  $("#totalValue1").val("");
  $("#cardValue1").html("");
  $("#totalValue2").val("");
  $("#cardValue2").html("");
  $("#cardSuit1").html("");
  $("#cardSuit2").html("");
  $("#dealerSuit").val("");
  $("#dealerHand").val("");
  $("#dealerTotal").val("");
  $("#cardValue1").html("Player 1 Card 1");
  $("#cardValue1B").html("Player 1 Card 2");
  $("#cardValue2").html("Player 2 Card 1");
  $("#cardValue2B").html("Player 2 Card 2");
  $("#dealerHand").html("Dealer Hand");
  $(".newP").html("");
  $('.startDeal').attr("disabled", false);
  $('.stand1').attr("disabled", true);
  $('.hit1').attr("disabled", true);
  $('.stand2').attr("disabled", true);
  $('.hit2').attr("disabled", true);
  counter = 0;
  
});

//assigns a random number to determine card distribution to dealer and players
var shuffle = function() {
  return Math.floor((Math.random() * 13) + 1);
};

//creates a random number that will be applied to determine suit of card
var suit = function() {
  suitResults = Math.floor((Math.random() * 3) + 1);
  return suitResults;
};


//assigns the suit to a card
var assignSuit = function() {
  suit();
  if(suitResults === 1){
    return "Spades";
  } else if(suitResults === 2){
    return "Hearts";
  } else if(suitResults === 3){
    return "Diamonds";
  } else {
    return "Clubs";
  } 
};

// assigns special card names over ten
var assignFaceCard = function(cardValue) {
  if(cardValue === 1){
    return "Ace";
  } else if(cardValue === 11){
    return "Jack";
  } else if(cardValue === 12){
    return "Queen";
  } else if(cardValue === 13){
    return "King";
  } else {
    return cardValue;
  }
  
};

// when Deal Cards button is clicked, runs the shuffle command and assigns a random number to each player
var dealCards = $(".startDeal").on('click', function(event) {
  event.preventDefault();
  //assigns random suits to each card
  var cardName1 = assignSuit(); 
  var cardName1B = assignSuit();  
  var cardName2 = assignSuit(); 
  var cardName2B = assignSuit();
  var dealerName = assignSuit();  
  
  //enable hit and stand buttons after cards are dealt

  $('.stand1').attr("disabled", false);
  $('.hit1').attr("disabled", false);
  $('.stand2').attr("disabled", false);
  $('.hit2').attr("disabled", false);

  //assigns cards over 10 to certain face cards, if Ace sets to 11 and if a face card sets value to 10
  var cardValueA = shuffle();
  var cardValue1A = assignFaceCard(cardValueA);
    if(cardValueA === 1) {
      cardValueA = 11;
    } else if (cardValueA > 10) {
      cardValueA = 10;
    };

  // assigns suit and value of card 1 to player 1 card area
   $("#cardValue1").html(cardValue1A + " of " + cardName1);

  var cardValueB = shuffle();
  var cardValue1B = assignFaceCard(cardValueB);
    if(cardValueB === 1 && cardValueA >= 11) {
      cardValueB = 1;
    } else if (cardValueB === 1) {
      cardValueB = 11;
    } else if (cardValueB > 10) {
      cardValueB = 10;
    };

  // assigns suit and value of card 2 to player 1 card area including the total value of both
  $("#cardValue1B").html(cardValue1B + " of " + cardName1B);
  $("#totalValue1").val(cardValueA + cardValueB);

  // same process of dealing cards to player 2
  var cardValueA = shuffle();
  var cardValue2A = assignFaceCard(cardValueA);
    if(cardValueA === 1) {
      cardValueA = 11;
    } else if (cardValueA > 10) {
      cardValueA = 10;
    };

  $("#cardValue2").html(cardValue2A + " of " + cardName2);
  
  var cardValueB = shuffle();
  var cardValue2B = assignFaceCard(cardValueB);
    if(cardValueB === 1 && cardValueA >= 11) {
      cardValueB = 1;
    } else if (cardValueB === 1) {
      cardValueB = 11;
    } else if (cardValueB > 10) {
      cardValueB = 10;
    };

  $("#cardValue2B").html(cardValue2B + " of " + cardName2B);
  $("#totalValue2").val(cardValueA + cardValueB);

  // deals a card to dealer and disables deal button
  var dealerHand = shuffle();
  var cardValueDealer = assignFaceCard(dealerHand);
    if(dealerHand === 1) {
      dealerHand = 11;
    } else if (dealerHand > 10) {
      dealerHand = 10;
    };

  $("#dealerTotal").val(dealerHand);
  $("#dealerHand").html(cardValueDealer + " of " + dealerName);
  
  $('.startDeal').attr("disabled", true);
  
});

// adds to the total value after player1 clicks hit
var player1Hit = $(".hit1").on('click', function(event) {
  event.preventDefault();
  
  //if it's a facecard, assigns correct value and calculates if Ace is played whether value should be either a 1 or 11
  var hitValue = shuffle();
  var cardName = assignFaceCard(hitValue);
    if(hitValue === 1 && $("#totalValue1").val() < 11) {
      hitValue = 11;
    } else if (hitValue === 1 && $("#totalValue1").val() > 11) {
      hitValue = 1;
    } else if (hitValue > 10) {
      hitValue = 10;
    }; 
  var addValue = parseInt($("#totalValue1").val()) + parseInt(hitValue);
   
  if(addValue < 22){
   
    // adds suit and card value to player1 area
    var newCardSuit = $('<p class="newP">' + cardName + " of " + assignSuit() + '</p>');
    newCardSuit.appendTo('#cards1');
    $("#totalValue1").val(addValue);
  } else {

    // even though player busts, still shows card dealt and adds to counter to determine when dealer resolves his hand
    
    var newCardSuit = $('<p class="newP">' + cardName+ " of " + assignSuit() + '</p>');
    newCardSuit.appendTo('#cards1');
    $("#totalValue1").val(addValue);
    counter ++;
    $('.stand1').attr("disabled", true);
    $('.hit1').attr("disabled", true);
    $('#totalValue1').val("Player 1 Busted!");
    if(counter === 2){
      var dealerValue = parseInt($("#dealerTotal").val());
      dealerTurn(dealerValue);
      gameOver1();
      gameOver2();
    }

  };
  

});

// adds to the total value after player2 clicks hit
var player2Hit = $(".hit2").on('click', function(event) {
  event.preventDefault();
  var hitValue = shuffle();
  var cardName = assignFaceCard(hitValue);
    if(hitValue === 1 && $("#totalValue1").val() < 11) {
      hitValue = 11;
    } else if (hitValue === 1 && $("#totalValue1").val() > 11) {
      hitValue = 1;
    } else if (hitValue > 10) {
      hitValue = 10;
    }; 
  var addValue = parseInt($("#totalValue2").val()) + parseInt(hitValue);
  
  if(addValue < 22){
    var newCardSuit = $('<p class="newP">' + cardName + " of " + assignSuit() + '</p>');
    newCardSuit.appendTo('#cards2');
    $("#totalValue2").val(addValue);
  } else {
    var newCardSuit = $('<p class="newP">' + cardName + " of " + assignSuit() + '</p>');
    newCardSuit.appendTo('#cards2');
    $("#totalValue2").val(addValue);

    counter ++;
    $('.stand2').attr("disabled", true);
    $('.hit2').attr("disabled", true);
    $('#totalValue2').val("Player 2 Busted!");
    if(counter === 2){
      var dealerValue = parseInt($("#dealerTotal").val());
      dealerTurn(dealerValue);
      gameOver1();
      gameOver2();
    }
    
  };
  

});

// when stand is clicked by both players, calculate dealer's move
var finalStand1 = $(".stand1").on('click', function(event) {
  event.preventDefault();
  
  $('.stand1').attr("disabled", true);
  $('.hit1').attr("disabled", true);
  counter ++;
  
  if(counter === 2){
    var dealerValue = parseInt($("#dealerTotal").val());
    dealerTurn(dealerValue);
    gameOver1();
    gameOver2();
  }
});

var finalStand2 = $(".stand2").on('click', function(event) {
  event.preventDefault();
  
  $('.stand2').attr("disabled", true);
  $('.hit2').attr("disabled", true);
  counter ++;
  
  if(counter === 2){
    var dealerValue = parseInt($("#dealerTotal").val());
    dealerTurn(dealerValue);

    gameOver1();
    gameOver2();
  }
});

// after both players have clicked stand, calculates dealer hand
var dealerTurn = function(dealerValue) {

// if both players have busted dealer automatically wins
 if(document.getElementById("totalValue1").value === "Player 1 Busted!" && document.getElementById("totalValue2").value === "Player 2 Busted!") {
    alert("Dealer Wins!");
 } else {
    var hitValue = shuffle();
    var cardName = assignFaceCard(hitValue);
    if(hitValue === 1 && $("#dealerTotal").val() < 11) {
      hitValue = 11;
    } else if (hitValue === 1 && $("#dealerTotal").val() > 11) {
      hitValue = 1;
    } else if (hitValue > 10) {
      hitValue = 10;
      console.log(hitValue);
    }
    // adds total value of dealers card to new card
    dealerValue += parseInt(hitValue);
    console.log(dealerValue);
    var newCardSuit = $('<p class="newP">' + cardName + " of " + assignSuit() + '</p>');
    newCardSuit.appendTo('#dealer');
    
    // if dealer's hand is less than 17, runs above function again to draw another card
    if(dealerValue < 17){
      $("#dealerTotal").val(dealerValue);
      dealerTurn(dealerValue);

      console.log(dealerValue);
    } else if(dealerValue >= 17 && dealerValue <= 21){
      
      $("#dealerTotal").val(dealerValue);
      console.log(dealerValue);
    } else if(dealerValue >= 22){
      
      console.log(dealerValue);
      $("#dealerTotal").val(dealerValue);
      alert("Dealer Busted!");
      if(document.getElementById("totalValue1").value !== "Player 1 Busted!") {
        alert("Dealer loses to Player 1!");
        playerScore1 ++;
        $("#player1Score").val(playerScore1);
      } else if(document.getElementById("totalValue1").innerHTML === "Player 1 Busted!") {
        console.log(document.getElementById("totalValue1").innerHTML === "Player 1 Busted!");
        alert("Dealer beats Player 1!");
      };
      if(document.getElementById("totalValue2").value !== "Player 2 Busted!") {
        alert("Dealer loses to Player 2!");
        playerScore2 ++;
        $("#player2Score").val(playerScore2);
      } else if(document.getElementById("totalValue2").value === "Player 1 Busted!") {
        alert("Dealer beats Player 1!")
      }
    };

  }
};  


//determines when the game is over
var gameOver1 = function() {
  var dealerTotal = parseInt($("#dealerTotal").val());
  var playerTotal1 = parseInt($("#totalValue1").val());

  
  if(dealerTotal > playerTotal1 && dealerTotal < 22) {
    alert("Dealer beats Player 1!");
  } else if(dealerTotal < playerTotal1) {
    alert("Dealer loses to Player 1!");
    playerScore1 ++;
    $("#player1Score").val(playerScore1);
  } else if(dealerTotal === playerTotal1) {
    alert("Dealer ties with Player 1");
  } else {

  }
};

var gameOver2 = function() {
  var dealerTotal = parseInt($("#dealerTotal").val());
  var playerTotal2 = parseInt($("#totalValue2").val());

  if(dealerTotal > playerTotal2 && dealerTotal < 22) {
    alert("Dealer beats Player 2!");
  } else if(dealerTotal < playerTotal2) {
    alert("Dealer loses to Player 2!");
    playerScore2 ++;
    $("#player2Score").val(playerScore2);
  } else if(dealerTotal === playerTotal2) {
    alert("Dealer ties with Player 2");
  } else {

  }
};

});



