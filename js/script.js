/* script.js 
   Author: Grace Manthey
   Date: March 27, 2020
*/

$.fn.digits = function(){ 
    return this.each(function(){ 
        $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
    })
}


$(document).ready(function(){ // begin document.ready block

	//jquery code here

	console.log("ROUND 2")

	$(".q1next").click(function(){

		if ($("#filingstatus input:radio:checked").length > 0) {
			$(this).hide()
			$(".q2back").show()
			$(".q2next").show()
			$(".question1").hide()
			$(".question2").show()
		} else {
			alert("Please pick an option.")
		}
		

		
	});

	$(".q2back").click(function(){
	 	$(".q1next").show()
	 	$(".q2back").hide()
		$(".q2next").hide()
	 	$(".question2").hide()
		$(".question1").show()
	});

	$(".q2next").click(function(){

		if ($("#children input:radio:checked").length > 0) {
			$(this).hide()
			$(".q2next").hide()
	 		$(".q2back").hide()
			$(".q3submit").show()
			$(".q3back").show()
	 		$(".question2").hide()
			$(".question3").show()
			$(".what").show()
		} else {
			alert("Please pick an option.")
		}


		

		


	});

	$(".q3back").click(function(){
	 	$(".q2next").show()
	 	$(".q2back").show()
	 	$(".q3back").hide()
		$(".q3submit").hide()
	 	$(".question3").hide()
		$(".question2").show()
		$(".result").hide()


	});

	$(".q3submit").click(function(){

	 	var status = $('input[name="filingstatus"]:checked').val()
			console.log(status)

		var children = $('input[name="children"]:checked').val()
			console.log(children)	

	 	var income = $("#income").val()

			income = income.replace(/,/g, "");
			income = income.replace("$", "");
			console.log(income)

		if (income == '') {
			alert("Please type a number.")
		} else {

			if (status == 'single') {
				
				if (Number(income) <= 75000) {

					if(children == 'no') {
						var payment = 350
					} else {
					 	var payment = 700
					}
				} else if (Number(income) > 75000 & Number(income) <= 125000){
					if(children == 'no') {
						var payment = 250
					} else {
					 	var payment = 500
					}

				} else if (Number(income) > 125000 & Number(income) <= 250000){
					if(children == 'no') {
						var payment = 200
					} else {
					 	var payment = 400
					}

				} else if (Number(income) > 250000){
						var payment = "nothing"

				}



			} else if (status == 'married') {
				
				if (Number(income) <= 150000) {

					if(children == 'no') {
						var payment = 700
					} else {
					 	var payment = 1050
					}
				} else if (Number(income) > 150000 & Number(income) <= 250000){
					if(children == 'no') {
						var payment = 500
					} else {
					 	var payment = 750
					}

				} else if (Number(income) > 250000 & Number(income) <= 500000){
					if(children == 'no') {
						var payment = 400
					} else {
					 	var payment = 600
					}

				} else if (Number(income) > 500000){
						var payment = "nothing"

				}


		

			} else if (status == 'head') {

				if (Number(income) <= 150000) {

					if(children == 'no') {
						var payment = 350
					} else {
					 	var payment = 700
					}
				} else if (Number(income) > 150000 & Number(income) <= 250000){
					if(children == 'no') {
						var payment = 250
					} else {
					 	var payment = 500
					}

				} else if (Number(income) > 250000 & Number(income) <= 500000){
					if(children == 'no') {
						var payment = 200
					} else {
					 	var payment = 400
					}

				} else if (Number(income) > 500000){
						var payment = "nothing"

				}

	
			}



			if (payment == 'nothing') {
				var abpayment = 'nothing'
			} else {
				var abpayment = payment.toFixed(0)
			}

			if (abpayment == 'nothing') {
				$(".payment").html('<h3>You may not qualify for a gas rebate.</h3>')
			} else {
				$(".payment h3").html('Your gas rebate amount is likely:')
				$(".payment h1").html('$'+abpayment).digits()
			}

		

			$(".result").show()
	 		$(".what").hide()

			}

			

	


	});

	$(".startover").on("click", function(){
		location.reload(true);
	});




	// ________________________________________MAKE THE INCOME INPUT A CURRENCY ___________________________________________________________________

	$("input[data-type='currency']").on({
    keyup: function() {
      formatCurrency($(this));
    },
    blur: function() { 
      formatCurrency($(this), "blur");
    }
});


function formatNumber(n) {
  // format number 1000000 to 1,234,567
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}


function formatCurrency(input, blur) {
  // appends $ to value, validates decimal side
  // and puts cursor back in right position.
  
  // get input value
  var input_val = input.val();
  
  // don't validate empty input
  if (input_val === "") { return; }
  
  // original length
  var original_len = input_val.length;

  // initial caret position 
  var caret_pos = input.prop("selectionStart");
    
  // check for decimal
  if (input_val.indexOf(".") >= 0) {

    // get position of first decimal
    // this prevents multiple decimals from
    // being entered
    var decimal_pos = input_val.indexOf(".");

    // split number by decimal point
    var left_side = input_val.substring(0, decimal_pos);
    var right_side = input_val.substring(decimal_pos);

    // add commas to left side of number
    left_side = formatNumber(left_side);

    // validate right side
    right_side = formatNumber(right_side);
    
    // On blur make sure 2 numbers after decimal
    if (blur === "blur") {
      right_side += "00";
    }
    
    // Limit decimal to only 2 digits
    right_side = right_side.substring(0, 2);

    // join number by .
    input_val = "$" + left_side + "." + right_side;

  } else {
    // no decimal entered
    // add commas to number
    // remove all non-digits
    input_val = formatNumber(input_val);
    input_val = "$" + input_val;
    
    // final formatting
    if (blur === "blur") {
      input_val += ".00";
    }
  }
  
  // send updated string to input
  input.val(input_val);

  // put caret back in the right position
  var updated_len = input_val.length;
  caret_pos = updated_len - original_len + caret_pos;
  input[0].setSelectionRange(caret_pos, caret_pos);
}

// CODE FOR data-type='currency' by Ashok R Kalkhair https://codepen.io/akalkhair/pen/dyPaozZ







}); //end document.ready block
