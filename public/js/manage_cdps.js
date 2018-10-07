$(document).ready(function() {
    // show loading
    showloading();

    var temp = [];
    for (i = 1; i < 3; i++) {

        var link_status = false;
        var main_status;
        
        temp = temp + '<tr><td>'+i+'</td><td>Taken loan to copitalise for the ordering raw material.</td><td>0.25</td><td>100</td><td>35</td><td><span data-status="'+link_status+'" data-id="SDF855ADFSG587ASDF" class="repay_loan_completely text-capitalize">Repay Loan</span><span data-status="'+link_status+'" data-id="SDF855ADFSG587ASDF" class="topup_loan text-capitalize">Loan Topup</span></td></tr>';
    };

    $('#payment_links tbody').append(temp);
    $('#payment_links').DataTable();
    
    // Stop loading
    stopLoading();

    $('body').on('click', '.change_payment_link_status',function(){
        
        var id = $(this).data('id');
        var current_status = $(this).data('status');

        var new_status = (current_status == 'true') ? 'false' : 'true';
        
        if(link_status) {
            changed_status = "enable";
            $(this).removeClass('disable');
            $(this).addClass('enable');
        }else{
            changed_status = "disable";
            $(this).removeClass('enable');
            $(this).addClass('disable');
        }

        $(this).data('status', new_status);
        $(this).html(changed_status);

    });

    //  copy link functionality
    var clipboardDemos = new ClipboardJS('.copy_link');
    clipboardDemos.on('success', function(e) {
        e.clearSelection();
        showTooltip(e.trigger, 'Copied!');
    });
    clipboardDemos.on('error', function(e) {
        showTooltip(e.trigger, fallbackMessage(e.action));
    });

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
    
    function showTooltip(elem, msg) {
        elem.setAttribute('class', 'copy_link tooltipped tooltipped-s');
        elem.setAttribute('aria-label', msg);
    }

    function showloading() {
        $('#loader').css('display','block');
    }
    
    function stopLoading() {
        // $('#loader').css('display','none');
        setTimeout(function(){ 
            $('#loader').css('display','none');
        }, 1000);
    }

    $('.take_cdp').on('click',function () {
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

       

        // Form submitted successfully
        
            $('.take_cdp_error').addClass('take_cdp_success');
            $('.take_cdp_error').html('Form Submitted Successfully');
            setTimeout(function(){ $('#take_cdps_block').fadeOut(); }, 1000);
        }else{
            $('.take_cdp_error').html('Please Fill all fields');
        }

    });

});
$( document ).ready(function() {
    function setEthRemain() {
        if (ethBalance) {
            console.log(ethBalance);
            $('#cdp_bal_eth').val(ethBalance.toFixed(2));
            $('#cdp_collatoral_name').attr({"max": ethBalance});
            $('#cdp_bal_eth').attr({"max": ethBalance});
        } else {
            setTimeout(function() {
                setEthRemain();
            }, 500);
        }
    }
    setEthRemain();
    var ethToDai = 255;

    var ethToLock;
    var daiFromLock;
    var percentDaiFromLock = 33;
    var ethRemainAfterLock;
    var totlePriceinDai;

    $('#cdp_collatoral_name').on('input', function () {
        ethToLock = $(this).val();
        if (ethToLock > ethBalance) {
            ethToLock = ethBalance;
            $('#cdp_collatoral_name').val(ethToLock.toFixed(2));
        }
        totlePriceinDai = ethToLock * ethToDai;
        daiFromLock = (percentDaiFromLock / 100) * totlePriceinDai;
        ethRemainAfterLock = ethBalance - ethToLock;
        $('#cdp_dai_against_eth').attr({"max": totlePriceinDai*0.5});
        $('#cdp_dai_against_eth').val(daiFromLock.toFixed(2));
        $('#cdp_bal_eth').val(ethRemainAfterLock.toFixed(2));
    });

    $('#cdp_dai_against_eth').on('input', function () {
        daiFromLock =  $(this).val();
        percentDaiFromLock = (daiFromLock / totlePriceinDai)*100;
        $('#cdp_perc_dai').val(percentDaiFromLock.toFixed(2));
    });

    $('#cdp_perc_dai').on('input', function () {
        percentDaiFromLock = $(this).val();
        if (percentDaiFromLock > 50) {
            percentDaiFromLock = 50;
            $('#cdp_perc_dai').val(percentDaiFromLock.toFixed(0));
        }
        daiFromLock = (percentDaiFromLock/100) * totlePriceinDai;
        $('#cdp_dai_against_eth').val(daiFromLock.toFixed(2));
    });
});
