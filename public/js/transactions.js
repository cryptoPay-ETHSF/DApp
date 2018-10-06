var link_id;
var dataObj = {};

function getQueryParams() {
    let querystring = window.location.search.substring(1);
    let divide = querystring.split('&');
    for (var i = 0; i < divide.length; i++) {
        let keyValPair = divide[i].split('=');
        dataObj[keyValPair[0]] = keyValPair[1];
    }
    link_id = dataObj.id;
}

getQueryParams();

db.ref('links').on('value', function(snapshot) {
    var count = {
        name : "",
        description : "",
        amount : 0,
        address : "",
    };
    var data = snapshot.val();
    Object.keys(data)
    .forEach(function (key, i) {
        Object.keys(data[key])
        .forEach(function (links, i) {
            if (links == link_id) {
                count.name = data[key][links].name;
                count.description = data[key][links].desc;
                count.amount = data[key][links].price;
                count.address = key;
            }
        });
    });
    $('#transact_name').text(count.name);
    $('#transact_desc').text(count.description);
    $('#transact_amount').text(count.amount);
    $('#transact_value').val(count.amount);
    $('#transact_address').val(count.address);
});


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
        

    }else{
        $(".transact_info_title").addClass('red');
        $(".transact_info_title").html("Please enter all fields");
    }

});

$("#payments_block").css('display','block');

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
    var payment_status = true;

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

Object.keys(coinsData)
    .sort()
    .forEach(function (key, i) {
    // if (coinsData[key].rop) {
        var forClass = `${coinsData[key].id + 'ForColor'}`;
        var color = coinsData[key].color;
        var html = `<div class="selectCoinsClick ${forClass}" onclick="funcToSelect('${coinsData[key].id}')">
                        <div class="logoNameBox">
                            <div class="logoBox">
                                <img src="https://easwap.com/logos/${coinsData[key].id}.svg" style="width:54px; height:54px">
                            </div>
                            <div class="nameCodeBox">
                                <div class="nameBox">${coinsData[key].name}</div>
                                <div class="nameToken">${coinsData[key].fullname}</div>
                            </div>
                        </div>
                    </div>`;
        
        if (key != "dai" && key != "eth") {
            $(".coinSelectContainer").append(html);
        } else if (key == "eth") {
            $(".ethBoxClick").append(html);
        } else if (key == "dai") {
            $(".daiBoxClick").append(html);
        }
    // }
});

$('.changeTokenBut').click(function() {
    console.log('adhuj');
    $('.coinsBox').show();
});