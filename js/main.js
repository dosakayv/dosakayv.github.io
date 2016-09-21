jQuery(document).ready(function($){
	// Page Navigation
	var contentSections = $(".vi-section");
	var navigationItems = $(".vertical-navigation a");

	updateNavigation();
	$(window).on('scroll', function(){
		updateNavigation();
	});

	navigationItems.on("click", function(event){
		event.preventDefault();
		smoothScroll($(this.hash));
	});

	function updateNavigation() {
		contentSections.each(function(){
			$this = $(this);
			var activeSection = $('.vertical-navigation a[href="#'+$this.attr('id')+'"]').data('number') - 1;
			if ( ( $this.offset().top - $(window).height()/2 < $(window).scrollTop() ) && ( $this.offset().top + $this.height() - $(window).height()/2 > $(window).scrollTop() ) ) {
				navigationItems.eq(activeSection).addClass('is-selected');
			}else {
				navigationItems.eq(activeSection).removeClass('is-selected');
			}
		});
	}

	function smoothScroll(target) {
        $("body,html").animate(
        	{"scrollTop":target.offset().top},
        	600
        );
	}

	// Code for fixed icons
	var githubContactIcon =  $(".github-logo img");
	var linkedinContactIcon =  $(".linkedin-logo img");
	var gmailContactIcon =  $(".gmail-logo img");

	githubContactIcon.hover(
		function() {
			$(this).attr("src", "./logos/github/github-active.png");
		}, function() {
			$(this).attr("src", "./logos/github/github-inactive.png");
		}
	)

	linkedinContactIcon.hover(
		function() {
			$(this).attr("src", "./logos/linkedIn/linkedin-active.png");
		}, function() {
			$(this).attr("src", "./logos/linkedIn/linkedin-inactive.png");
		}
	)

	gmailContactIcon.hover(
		function() {
			$(this).attr("src", "./logos/gmail/mail-active.png");
		}, function() {
			$(this).attr("src", "./logos/gmail/mail-inactive.png");
		}
	)

	// Contact Form
	// var name,from,phonenumber,text;

	// $("#send_email").click(function() {      
	// 	name=$("#name").val();
	// 	from=$("#from").val();
	// 	phonenumber=$("#phonenumber").val();
	// 	text=$("#content").val();

	// 	$("#message").text("Sending E-mail...Please wait");
	// 	$.get("https://portfolio-mail-server.herokuapp.com/send",
	// 		{from:from,name:name,phonenumber:phonenumber,text:text},
	// 		function(data) {
	// 			console.log("makes it in here");
	// 			console.log(data);
	// 			console.log("makes it in here");
	// 			if (data=="sent") {
	// 				$("#message").empty().html("Email is been sent at "+from+". Please check inbox");
	// 			}
	// 		});
	// });

	var name, company, emailAddress, phoneNumber, message;
	$(".contact-submit-button").click(function(){

		nameInput = $(".mail-container .name");
		companyInput = $(".mail-container .company");
		emailAddressInput = $(".mail-container .email-address");
		phoneNumberInput = $(".mail-container .phone-number");
		messageInput = $(".mail-container .contact-form-message")[0];

		nameValue = nameInput.val();
		companyValue = companyInput.val();
		emailAddressValue = emailAddressInput.val();
		phoneNumberValue = phoneNumberInput.val();
		messageValue = messageInput.innerHTML;

		if (nameValue.length > 0 && emailAddressValue.length > 0 && messageValue.length > 0) {
			$(".contact-header-message").text("Sending E-mail...Please wait").css( "color", "orange" );
			$.get("https://portfolio-mail-server.herokuapp.com/send",
				{name:nameValue, company:companyValue, emailAddress:emailAddressValue, phoneNumber:phoneNumberValue, message:messageValue},
				function(data) {
					console.log("makes it in here");
					console.log(data);
					console.log("makes it in here");
					if (data == "sent") {
						$(".required-fields").removeClass("required-fields");
						nameInput.val("");
						companyInput.val("");
						emailAddressInput.val("");
						phoneNumberInput.val("");
						messageInput.innerHTML = "";
						$(".contact-form-message-label").removeClass("contact-form-message-active");				

						$(".contact-header-message").empty().html("Thank You for the input. Email has been successfully sent to my inbox.");
					}
				});
		}
		else {
			$(".contact-header-message").text("Error: Fill out the highlighted feilds before submitting").css( "color", "red" );

			$(".contact-name-field").addClass("required-fields");
			$(".contact-email-field").addClass("required-fields");
			$(".contact-message-field").addClass("required-fields");

			console.log("Handle case in which fields are required");
		}

	});

	$(".contact-form-message").focusin(function(event){
		$(".contact-form-message-label").addClass("contact-form-message-active");
	});

	$(".contact-form-message").focusout(function(event){
		var contactMessage = this.innerHTML;
		if (contactMessage.length == 0) {
			$(".contact-form-message-label").removeClass("contact-form-message-active");
		}
	});

	// Functionality to hide the fixed icon navigator.
	function isScrolledIntoView(elem) {
		var docViewTop = $(window).scrollTop();
		var docViewBottom = docViewTop + $(window).height();

		var elemTop = $(elem).offset().top;
		var elemBottom = elemTop + $(elem).height();

		return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	}

	$(window).scroll(function(event){
		if (isScrolledIntoView(".contact-sites")) {
			$(".fixed-contacts").css("display", "none");
			console.log("visible");
		} 
		else {
			$(".fixed-contacts").show();
			console.log("not visible");
		}
	});

});