var clipboardDemos = new ClipboardJS('.transact_copy');
clipboardDemos.on('success', function(e) {
    e.clearSelection();
    showTooltip(e.trigger, 'Copied!');
});
clipboardDemos.on('error', function(e) {
    showTooltip(e.trigger, fallbackMessage(e.action));
});

var btns = document.querySelectorAll('.transact_copy');
function fallbackMessage(action) {
    var actionMsg = '';
    var actionKey = (action === 'cut' ? 'X' : 'C');
    if (/iPhone|iPad/i.test(navigator.userAgent)) {
        actionMsg = 'No support :(';
    } else if (/Mac/i.test(navigator.userAgent)) {
        actionMsg = 'Press ⌘-' + actionKey + ' to ' + action;
    } else {
        actionMsg = 'Press Ctrl-' + actionKey + ' to ' + action;
    }
    return actionMsg;
}

$('.transact_currency').on('click', function(){
    $('.transaction_currency_main').fadeIn();
});

$('.transaction_currency_close').on('click', function(){
    $('.transaction_currency_main').fadeOut();
});

$('.selectCoinBox').on('click', function(){
    var currency = $(this).data('currency');

    $('.transact_currency').html(currency);
    $('.transaction_currency_main').fadeOut();

});


function showTooltip(elem, msg) {
    elem.setAttribute('class', 'transact_copy tooltipped tooltipped-s');
    elem.setAttribute('aria-label', msg);
}

/* main */

$('#information_form').submit(function(e){
    e.preventDefault();
    var name = $('#fullname').val();
    var email = $('#email').val();
    var phone = $('#phone').val();
    var address = $('#address').val();

    if(name && email && phone && address){

        // form submit takes place here on successfull form submission return here

        $("#information_block").css('display','none');
        $("#payments_block").css('display','block');

    }else{
        $(".transact_info_title").addClass('red');
        $(".transact_info_title").html("Please enter all fields");
    }

});



$('.paybyloan').on('click',function () {
    $('#take_cdps_block').fadeIn();
});

$('.take_cdp_close').on('click',function () {
    $('#take_cdps_block').fadeOut();
});

$('#take_cdps').submit(function(e){
    e.preventDefault();
    var cdp_collatoral_name = $('#cdp_collatoral_name').val();
    var cdp_dai_against_eth = $('#cdp_dai_against_eth').val();
    var cdp_perc_dai = $('#cdp_perc_dai').val();
    var cdp_bal_eth = $('#cdp_bal_eth').val();

    if(cdp_collatoral_name && cdp_dai_against_eth && cdp_perc_dai && cdp_bal_eth){

        $('#take_cdps_block').fadeOut();
   
        // On payment Successfull
        var payment_status = true;

        payment_method(payment_status);

    
    }else{
        $('.take_cdp_error').html('Please Fill all fields');
    }

});


$('#transact_form').submit(function(e){
    e.preventDefault();

    var transact_value = $('#transact_value').val();
    var transact_address = $('#transact_address').val();

    // payment functionality goes here
    console.log(transact_value +"--- ---"+ transact_address);
    // ends here
    var payment_status = false;

    payment_method(payment_status);

});

function payment_method(pay_status) {
    
    $("#payments_block").css('display','none');
    $("#payment_status").css('display','block');

    if(pay_status){

        $('.transact_payment_status_title').html('Payment Successful');
        $('.transact_status_report span').removeClass('pe-7s-close text-danger');
        $('.transact_status_report span').addClass('pe-7s-check text-crypto');

    }else{
        
        $('.transact_payment_status_title').html('Payment Failed');
        $('.transact_status_report span').removeClass('pe-7s-check text-crypto');
        $('.transact_status_report span').addClass('pe-7s-close-circle text-danger');

    }

}