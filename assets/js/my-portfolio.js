$(document).ready(function () {
  const IMG_DIR = "./assets/images/";
  const MAX_PROJS_PER_ROW = 3;
  const MIN_MSG_LENGTH = 2;
  const GITHUB_LOGO_IMG = "github-128.png";
  const contactError = $("#contact-error");
  const contactnameError = $("#contactname-error");
  const contactemailError = $("#contactemail-error");
  const contactmsgError = $("#contactmsg-error");

  // -------------------------------------------------------------------------------------------------
  // parallax effect
  // Source: https://1stwebdesigner.com/parallax-scrolling-tutorial/
  //
  $("a[href*=\\#]").each(function () {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '')
      && location.hostname === this.hostname
      && this.hash.replace(/#/, '') ) {
      var $targetId = $(this.hash), $targetAnchor = $('[name=' + this.hash.slice(1) + ']');
      var $target = $targetId.length ? $targetId : $targetAnchor.length ? $targetAnchor : false;
      if ($target) {
        var targetOffset = $target.offset().top;
        $(this).click(function () {
          $("#nav li a").removeClass("active");
          $(this).addClass('active');
          $("html, body").animate({ scrollTop: targetOffset }, 1000);
          return false;
        });
      }
    }
  });

  // ------------------------------------------------------------------------------------------------------
  // fill portfolio info
  //
  function fillPortfolioInfo() {
    // an array of objects to store each portfolio project's basic info:
    // url, image file name, alternate image name in case image does not load, and the name
    // of the project is stored in captionText
    var myProjects = [{
      "projUrl": "https://intense-brushlands-62905.herokuapp.com/",
      "projImg": "tilt-home.png",
      "projImgAlt": "Tilt",
      "captionText": "Tilt"
    },
    {
      "projUrl": "https://cryptic-reaches-27719.herokuapp.com/",
      "projImg": "memory-click.png",
      "projImgAlt": "React App Memory",
      "captionText": "Memory Click"
    },
    {
      "projUrl": "https://hidden-earth-15338.herokuapp.com/",
      "projImg": "agile-flow.png",
      "projImgAlt": "AgileFlow",
      "captionText": "Agile Flow"
    },
    {
      "projUrl": "https://infinite-earth-55385.herokuapp.com",
      "projImg": "mongoose-scraper.png",
      "projImgAlt": "Tech News",
      "captionText": "Mongo Scraper"
    },
    {
      "projUrl": "https://powerful-sands-40702.herokuapp.com",
      "projImg": "sqlized-burger.png",
      "projImgAlt": "Sequelized Burger",
      "captionText": "Eat-Da-Burger"
    },
    {
      "projUrl": "https://morning-brushlands-77006.herokuapp.com",
      "projImg": "friend-finder.png",
      "projImgAlt": "Friend Finder",
      "captionText": "Friend Finder"
    },
    {
      "projUrl": "https://f-flores.github.io/RPS-Multiplayer/",
      "projImg": "rps.png",
      "projImgAlt": "RPS Multiplayer",
      "captionText": "RPS-MultiPlayer"
    },
    {
      "projUrl": "https://f-flores.github.io/bamazon",
      "projImg": "bamazon.png",
      "projImgAlt": "Bamazon MySQL",
      "captionText": "Bamazon"
    },
    {
      "projUrl": "https://f-flores.github.io/ConstructorHangman",
      "projImg": "constructor-hangman.png",
      "projImgAlt": "Constructor Hangman",
      "captionText": "Constructor Hangman"
    },
    {
      "projUrl": "https://hagbardceline23.github.io/Rutgers-financial-api/",
      "projImg": "financial-app.png",
      "projImgAlt": "My Financial App",
      "captionText": "My Financial App"
    },
    {
      "projUrl": "https://f-flores.github.io/liri-node-app",
      "projImg": "liri-terminal.png",
      "projImgAlt": "Liri Node App",
      "captionText": "Liri Node App"
    },
    {
      "projUrl": "https://f-flores.github.io/GifTastic",
      "projImg": "giftastic.png",
      "projImgAlt": "GifTastic",
      "captionText": "GifTastic"
    },
    {
      "projUrl": "https://f-flores.github.io/TriviaGame",
      "projImg": "trivia-game.png",
      "projImgAlt": "Trivia Game",
      "captionText": "Trivia Game"
    },
    {
      "projUrl": "https://f-flores.github.io/starwars-rpg/",
      "projImg": "starwars-rpg.png",
      "projImgAlt": "Star Wars Rpg",
      "captionText": "Star Wars RPG Game"
    },
    {
      "projUrl": "https://f-flores.github.io/Hangman-Game/",
      "projImg": "hangman-game.png",
      "projImgAlt": "Hangman Game",
      "captionText": "Hangman"
    },
    {
      "projUrl": "https://scratch.mit.edu/projects/195714556/",
      "projImg": "cat_and_mouse.png",
      "projImgAlt": "Cat and Mouse Game",
      "captionText": "Cat and Mouse"
    }],
    projCount = 0,
    rowCount = 0,
    divRow = $("<div>");

    divRow.addClass("row row-portfl-lm");
    for (const elem of myProjects) {
      var index = 0,
          projFigure = $("<figure>"),
          projLink = $("<a>"),
          projImg = $("<img>"),
          projCap = $("<caption>");


      // build each project's 'figure' element, which has nested link, image and
      // fig caption
      projImg.attr("src", IMG_DIR + elem.projImg).attr("alt", elem.projImgAlt);
      projLink.attr("href", elem.projUrl).attr("target","_blank").
               append(projImg);
      projCap.addClass("caption-text").html(elem.captionText);
      projFigure.addClass("col-xs-12 col-md-4 image-container").
                 append(projLink).
                 append(projCap);
      divRow.append(projFigure);

      // start a row on every third element
      if  ((projCount % MAX_PROJS_PER_ROW) === MAX_PROJS_PER_ROW - 1) {
          $("#portfolio-container").append(divRow);
          divRow = $("<div>");
          divRow.addClass("row row-portfl-lm");
      }
      projCount++;
      rowCount++;
    }

    // append any remaining project elements
    if (divRow) {
      $("#portfolio-container").append(divRow);
    }

  }

  // ------------------------------------------------------------------------------------------------------
  // fill out aside menu -- 'Connect With Me' Box
  //
  function fillConnectWithMeBoxes() {
    var mediaLinks = $(".custom-xs-right").addClass("media-links"),
        // mediaList = $("<ul>"),
        // myMediaArr is an array of objects which specifies each list element
        // in the 'Connect With Me' box
        myMediaArr = [{
          "mediaImg": GITHUB_LOGO_IMG,
          "mediaAlt": "Github Logo",
          "mediaUrl": "https://github.com/f-flores"
        },
        {
          "mediaImg": "linkedin-128.png",
          "mediaAlt": "LinkedIn Logo",
          "mediaUrl": "https://www.linkedin.com/in/francisco-f-flores/"
        },
        {
          "mediaImg": "stackoverflow-128.png",
          "mediaAlt": "StackOverflow Logo",
          "mediaUrl": "https://stackoverflow.com/users/9150518/f-flores"
        }],
        index = 0;

    // cardTitle.html("<h4 class=\"text-center font-weight-bold\">Connect With Me</h4>");
    // mediaLinks.addClass("media-links");
    console.log('connect with me');
    // build media list
    for (const elem of myMediaArr) {
      const listElem = $("<li>"),
          socialUrl = $("<a>"),
          mediaImg = $("<img>");

      socialUrl.attr("href", elem.mediaUrl).attr("target","_blank");
      // mediaImg.attr("src", IMG_DIR + elem.mediaImg).attr("alt", elem.mediaAlt).addClass("mb-2");
      mediaImg.attr("src", IMG_DIR + elem.mediaImg).attr("alt", elem.mediaAlt);

      if (elem.mediaImg === GITHUB_LOGO_IMG) {
        mediaImg.addClass("github-img");
      }
      socialUrl.append(mediaImg);
      listElem.append(socialUrl);
      // mediaList.append(listElem);
      mediaLinks.append(listElem);
    }
    // mediaLinks.append(mediaList);
    // $(".custom-xs-right").append(mediaLinks);
  }

  // validate contact form submission
  // ==========================================================================
  function handleContactForm() {
    const contactName = $("#contact-name").val(),
          contactEmail = $("#contact-email").val(),
          contactMsg = $("#contact-message").val();
    let submitError = false;

    event.preventDefault();
    clearContactErrorDivs();
    hideContactErrorDivs();

    if (!validName(contactName)) {
      displayErrorMessage(contactnameError, "Please enter name.");
      submitError = true;
    }

    if (!validEmail(contactEmail)) {
      displayErrorMessage(contactemailError, "Enter valid email.");
      submitError = true;
    }

    console.log("contactMsg.length");
    console.log(contactMsg);
    if (contactMsg.length < MIN_MSG_LENGTH) {
      displayErrorMessage(contactmsgError, "Please type in your message.");
      submitError = true;
    }

    if (contactName === "" || contactEmail === "" || contactMsg === "") {
      displayErrorMessage(contactError, "Please fill out all of the form fields");
      submitError = true;
    }

    if (submitError) return;

    const mailto_msg = `
mailto:ffflores1@outlook.com?subject=Portfolio Page Message&body=${contactMsg}
 contact Email: ${contactEmail}
 contact Name: ${contactName}`;

    winEmail = window.open(mailto_msg, 'emailWindow');
    if (winEmail && winEmail.open && !winEmail.closed) winEmail.close();

    $("#contact-name, #contact-email, #contact-message").val("");
  }

  $( "#navbarNav a" ).click(function() {
    $("#navbarNav").removeClass("show");
  });

  fillPortfolioInfo();
  fillConnectWithMeBoxes();
  $(document).on("click", "#contact-submit", handleContactForm);

  // refresh page on browser resize
  // src: https://www.sitepoint.com/jquery-refresh-page-browser-resize/
  // ====================================================================
  $(window).bind('resize', function(e)
  {
    if (window.RT) clearTimeout(window.RT);
    window.RT = setTimeout(function()
    {
      this.location.reload(false); /* false to get page from cache */
    }, 200);
  });

  // ====================================================================
  // CLEAR DIV FUNCTIONS
  // ====================================================================
  // ------------------------------------------------------------------------------------------------
  // clearContactErrorDivs empties out error validation divs
  //
  function clearContactErrorDivs() {
    $(contactError, contactnameError, contactemailError, contactmsgError).
    removeClass("bg-danger").
    addClass("bg-white").
    empty();
  }

  // -------------------------------------------------------------------------------------------------
  // hide signup error divs so they don't take up space on the view
  //
  function hideContactErrorDivs() {
    $(contactError).hide();
    $(contactnameError).hide();
    $(contactemailError).hide();
    $(contactmsgError).hide();
  }

});
