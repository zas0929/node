
$(document).ready(function() {

    $("#changeProfile").submit(function(event){
        event.preventDefault();


       $.post( "/profile", {
            email    : $(this).find("[name=email]").val(),
            password : $(this).find("[name=password]").val(),
            nick     : $(this).find("[name=nick]").val(),
            phone    : $(this).find("[name=phone]").val(),
            fname    : $(this).find("[name=fname]").val(),
            lname    : $(this).find("[name=lname]").val(),
       } ).done(function(data){
            if (data == "ok") {
                alert("profile changed");
            }else{
                alert("Server error");
            }
       });
    })



    //ajax
    // $("nav").find("a").click(function(event) {
    //     event.preventDefault();
    // })
    // $("nav").find('[href="/index"]').click(function() {
    //     $.ajax({
    //         url: "/index",
    //         async: true
    //     }).done(function(data) {
    //         $(".main-block").html(data);
    //     })
    // })
    // $("nav").find('[href="/game"]').click(function() {
    //     $.getScript('js/script.js');
    //     $.ajax({
    //         url: "/game",
    //         async: true
    //     }).done(function(data) {
    //         $(".main-block").html(data);
    //     })

    // })
    //  $("nav").find('[href="/rooms"]').click(function() {
    //     $.ajax({
    //         url: "/rooms",
    //         async: true
    //     }).done(function(data) {
    //         $(".main-block").html(data);
    //     })
    // })
    // $("nav").find('[href="/profile"]').click(function() {
    //     $.ajax({
    //         url: "/profile",
    //         async: true
    //     }).done(function(data) {
    //         $(".main-block").html(data);
    //     })
    // })



    var body = $('body'),
        signUp = body.find('.container').find('.sign-up'),
        signIn = body.find('.container').find('.sign-in'),
        regForm = body.find('.container').find('.reg'),
        logIn = body.find('.container').find('.log-in');
    //popups
    signUp.on('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        regForm.fadeIn(400);
        logIn.fadeOut(400);
    });
    signIn.on('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        logIn.fadeIn(400);
        regForm.fadeOut(400);
    });
    body.on('click', function(event) {
        event.stopPropagation();
        if($(event.target).parents().hasClass('log-in') || $(event.target).hasClass('log-in')) {
            return;
        }
        else {
            logIn.fadeOut();
        }
        if($(event.target).parents().hasClass('reg') || $(event.target).hasClass('reg')) {
            return;
        }
        else {
            regForm.fadeOut();
        }
    });


    //range
    $("#range").ionRangeSlider({
        hide_min_max: true,
        keyboard: true,
        min: 0,
        max: 100,
        from: 20,
        to: 70,
        type: 'single',
        step: 1,
        prefix: "$",
        grid: false
    });

    //TweenMax animations
    //cards
    var playerTLCard1 = $('.player-top-left').find('.cards').find('img')[0],
        playerTLCard2 = $('.player-top-left').find('.cards').find('img')[1],
        playerTRCard1 = $('.player-top-right').find('.cards').find('img')[0],
        playerTRCard2 = $('.player-top-right').find('.cards').find('img')[1],
        playerBRCard1 = $('.player-bottom-right').find('.cards').find('img')[0],
        playerBRCard2 = $('.player-bottom-right').find('.cards').find('img')[1],
        playerBLCard1 = $('.player-bottom-left').find('.cards').find('img')[0],
        playerBLCard2 = $('.player-bottom-left').find('.cards').find('img')[1],
        playerTLChips = $('.player-top-left').find('.chips-player'),
        playerTRChips = $('.player-top-right').find('.chips-player'),
        playerBRChips = $('.player-bottom-right').find('.chips-player'),
        playerBLChips = $('.player-bottom-left').find('.chips-player'),
        bank = $('.container').find('.table-block').find('.bank-info'),
        dealer = $('.container').find('.table-block').find('.dealer');

    var card1, card2, card1X, card1Y, delayCard, rotationCard, easeCard, durationCard, completeCallback;
    function Player() {
        this.card1 = this.card1;
        this.card2 = this.card2;
        this.card1X = this.card1X;
        this.card1Y = this.card1Y;
        this.card2X = this.card2X;
        this.card2Y = this.card2Y;
        this.delayCard2 = this.delayCard2;
        this.delay = this.delay;
        this.rotation = this.rotation;
        this.ease = this.ease;
        this.duration = this.durationCard;
        this.onComplete = this.completeCallback
    }
    Player.prototype.giveCardsTest = function(gamer) {
        TweenMax.from(this.card1, this.duration, {x: this.card1X, y: this.card1Y, delay: this.delay, rotation: this.rotation, ease: this.ease} )
        TweenMax.from(this.card2, this.duration, {x: this.card2X, y: this.card2Y, delay: this.delayCard2, rotation: this.rotation, ease: this.ease} )

    }

    var player1 = new Player();
        player1.card1 = playerTLCard1;
        player1.card2 = playerTLCard2;
        player1.card1X = 220;
        player1.card1Y = -20;
        player1.card2X = 179;
        player1.card2Y = -20;
        player1.delay = 0.5;
        player1.delayCard2 = 1;
        player1.rotation = -360;
        player1.duration = 0.5;
        player1.ease = Power1.easeOut;

    var player2 = new Player();
        player2.card1 = playerTRCard1;
        player2.card2 = playerTRCard2;
        player2.card1X = -179;
        player2.card1Y = -20;
        player2.card2X = -220;
        player2.card2Y = -20;
        player2.delay = 2;
        player2.delayCard2 = 1.5;
        player2.rotation = 360;
        player2.duration = 0.5;
        player2.ease = Power1.easeOut;

    var player3 = new Player();
        player3.card1 = playerBRCard1;
        player3.card2 = playerBRCard2;
        player3.card1X = -179;
        player3.card1Y = -284;
        player3.card2X = -220;
        player3.card2Y = -284;
        player3.delay = 3;
        player3.delayCard2 = 2.5;
        player3.rotation = 360;
        player3.duration = 0.5;
        player3.ease = Power1.easeOut;

    var player4 = new Player();
        player4.card1 = playerBLCard1;
        player4.card2 = playerBLCard2;
        player4.card1X = 219;
        player4.card1Y = -284;
        player4.card2X = 179;
        player4.card2Y = -284;
        player4.delay = 3.5;
        player4.delayCard2 = 4;
        player4.rotation = -360;
        player4.duration = 0.5;
        player4.ease = Power1.easeOut;

    //button animations
    function moveDealerRT() {
        TweenMax.to(dealer, 0.5, {css:{right:100, top: 75, left: 530}, ease: Power1.easeOut, onComplete: addClassRT});
        function addClassRT() {
            dealer.removeClass('left-top');
            dealer.removeClass('right-bottom');
            dealer.removeClass('left-bottom');
            dealer.addClass('right-top');
        }

    }
    function moveDealerRB() {
        TweenMax.to(dealer, 0.5, {css:{right:100, top: 209, bottom: 112, left: 530}, ease: Power1.easeOut, onComplete: addClassRB});
        function addClassRB() {
            dealer.removeClass('left-top');
            dealer.removeClass('right-top');
            dealer.removeClass('left-bottom');
            dealer.addClass('right-bottom');
        }

    }
    function moveDealerLB() {
        TweenMax.to(dealer, 0.5, {css:{right:300, top: 209, bottom: 112, left: 100}, ease: Power1.easeOut, onComplete: addClassLB});
        function addClassLB() {
            dealer.removeClass('left-top');
            dealer.removeClass('right-top');
            dealer.removeClass('right-bottom');
            dealer.addClass('left-bottom');
        }

    }
    function moveDealerLT() {
        TweenMax.to(dealer, 0.5, {css:{right:300, top: 75, bottom: "auto", left: 100}, ease: Power1.easeOut, onComplete: addClassLT});
        function addClassLT() {
            dealer.removeClass('left-bottom');
            dealer.removeClass('right-top');
            dealer.removeClass('right-bottom');
            dealer.addClass('left-top');
        }

    }
    function chipsToBank() {
        TweenMax.to(playerTLChips, 0.5, {css:{left: 280, top: 69}, onComplete: hideChips});
        TweenMax.to(playerTRChips, 0.5, {css:{right: 280, top: 69}, onComplete: hideChips});
        TweenMax.to(playerBRChips, 0.5, {css:{right: 280, top: -195}, onComplete: hideChips});
        TweenMax.to(playerBLChips, 0.5, {css:{left: 280, top: -195}, onComplete: hideChips});

        function hideChips() {
            playerTLChips.fadeOut(200);
            playerTRChips.fadeOut(200);
            playerBRChips.fadeOut(200);
            playerBLChips.fadeOut(200);
        }
        return;
    }
    function bankToTL() {
        TweenMax.to(bank, 0.5, {x: -160, y: 20, onComplete: hideBank})
    }
    function bankToTR() {
        TweenMax.to(bank, 0.5, {x: 160, y: 20, onComplete: hideBank})
    }
    function bankToBR() {
        TweenMax.to(bank, 0.5, {x: 160, y: 165, onComplete: hideBank})
    }
    function bankToBL() {
        TweenMax.to(bank, 0.5, {x: -160, y: 165, onComplete: hideBank})
    }
    function hideBank() {
        TweenMax.to(bank, 0.2, {opacity:0, delay: 2});
    }
    //Temporary
    $('.give-cards').on('click', function(event) {
        event.preventDefault();
        // giveCards();
        player1.giveCardsTest();
        player2.giveCardsTest();
        player3.giveCardsTest();
        player4.giveCardsTest();
    })
    $('.move-dealer-rt').on('click', function(event) {
        event.preventDefault();
        moveDealerRT();
    })
    $('.move-dealer-rb').on('click', function(event) {
        event.preventDefault();
        moveDealerRB();
    })
    $('.move-dealer-lb').on('click', function(event) {
        event.preventDefault();
        moveDealerLB();
    })
    $('.move-dealer-lt').on('click', function(event) {
        event.preventDefault();
        moveDealerLT();
    })
    $('.chips-to-bank').on('click', function(event) {
        event.preventDefault();
        chipsToBank();
    })
    $('.chips-left-top').on('click', function(event) {
        event.preventDefault();
        bankToTL();
    })
    $('.chips-right-top').on('click', function(event) {
        event.preventDefault();
        bankToTR();
    })
    $('.chips-right-bottom').on('click', function(event) {
        event.preventDefault();
        bankToBR();
    })
    $('.chips-left-bottom').on('click', function(event) {
        event.preventDefault();
        bankToBL();
    })




});
$(function () {



    });
