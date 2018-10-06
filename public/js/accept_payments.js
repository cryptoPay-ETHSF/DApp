$('.accept_payments').on('click',function(){
    $('.accept_payments_main_block').fadeIn();
});

$('.accept_pay_close').on('click',function(){
    $('.accept_payments_main_block').fadeOut();
});

$('.done_btn').on('click',function(){
    $('.accept_payments_main_block').fadeOut();
});

$('#accept_payments').submit(function(e){
    
    e.preventDefault();
     
    var accept_pay_name = $('#accept_pay_name').val();
    var accept_pay_desc = $('#accept_pay_desc').val();
    var accept_pay_price = $('#accept_pay_price').val();

    // collect info block

    var accept_pay_firstname = $('#accept_pay_firstname').is(':checked');
    var accept_pay_email = $('#accept_pay_email').is(':checked');
    var accept_pay_phone = $('#accept_pay_phone').is(':checked');
    var accept_pay_address = $('#accept_pay_address').is(':checked');
    var accept_pay_dont_collect_info = $('#accept_pay_dont_collect_info').is(':checked');
    console.log($('#accept_pay_firstname').val(), $('#accept_pay_email').val());
    
    // if ($('#accept_pay_firstname').checked) {
    //     accept_pay_firstname = true;
    // }

    // if ($('#accept_pay_email').checked) {
    //     accept_pay_email = true;
    // }

    // if ($('#accept_pay_phone').checked) {
    //     accept_pay_firstname = true;
    // }

    // if ($('#accept_pay_address').checked) {
    //     accept_pay_firstname = true;
    // }

    // if ($('#accept_pay_dont_collect_info').checked) {
    //     accept_pay_firstname = true;
    // }

    if(accept_pay_name && accept_pay_desc && accept_pay_price){
        
        // use for coading send all the info what we have to server
        $( "#accept_pay_collect_information" ).css('display','none');
        $( "#accept_pay_build_link" ).css('display','block');

        var key;

        firebase.database().ref('links/' + account).push({
            'name': accept_pay_name,
            'desc': accept_pay_desc,
            'price': accept_pay_price,
            'currency': 'DAI',
            'first_Name': accept_pay_firstname,
            'email': accept_pay_email,
            'phone': accept_pay_phone,
            'address': accept_pay_address,
            'no_info': accept_pay_dont_collect_info,
            'total_transaction': 0,
            'DAI_collected': 0,
            'pay_active': true
        }).then((snap) => {
            key = snap.key 
            $( ".accept_pay_build_title" ).html(accept_pay_name);
            $( ".accept_pay_build_desc" ).html(accept_pay_desc);
            $('#accept_pay_build').val(`http://localhost:3030/payments?id=${key}`); 
         });


    }else{
        $('.accept_pay_error').html("Please Choose all the necessary fields");
    }

});


var clipboardDemos = new ClipboardJS('.accept_pay_link_copy');
clipboardDemos.on('success', function(e) {
    e.clearSelection();
    showTooltip(e.trigger, 'Copied!');
});
clipboardDemos.on('error', function(e) {
    showTooltip(e.trigger, fallbackMessage(e.action));
});

var btns = document.querySelectorAll('.accept_pay_link_copy');
function fallbackMessage(action) {
    var actionMsg = '';
    var actionKey = (action === 'cut' ? 'X' : 'C');
    if (/iPhone|iPad/i.test(navigator.userAgent)) {
        actionMsg = 'No support :(';
    } else if (/Mac/i.test(navigator.userAgent)) {
        actionMsg = 'Press âŒ˜-' + actionKey + ' to ' + action;
    } else {
        actionMsg = 'Press Ctrl-' + actionKey + ' to ' + action;
    }
    return actionMsg;
}

function showTooltip(elem, msg) {
    elem.setAttribute('class', 'accept_pay_link_copy tooltipped tooltipped-s');
    elem.setAttribute('aria-label', msg);
}


$('#accept_pay_dont_collect_info').on('click', function(){
    $( "#accept_pay_firstname" ).prop( "checked", false );
    $( "#accept_pay_email" ).prop( "checked", false );
    $( "#accept_pay_phone" ).prop( "checked", false );
    $( "#accept_pay_address" ).prop( "checked", false );
});

$('#accept_pay_firstname').on('click', function(){
    $( "#accept_pay_dont_collect_info" ).prop( "checked", false );
});

$('#accept_pay_email').on('click', function(){
    $( "#accept_pay_dont_collect_info" ).prop( "checked", false );
});

$('#accept_pay_phone').on('click', function(){
    $( "#accept_pay_dont_collect_info" ).prop( "checked", false );
});

$('#accept_pay_address').on('click', function(){
    $( "#accept_pay_dont_collect_info" ).prop( "checked", false );
});
