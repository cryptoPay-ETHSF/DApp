$(document).ready(function() {
    // show loading
    showloading();

    var temp = [];
    for (i = 1; i < 12; i++) {

        var link_status = false;
        var main_status;
        
        if(!link_status) {
            main_status = "enable";
        }else{
            main_status = "disable";
        }

        temp = temp + '<tr><td>'+i+'</td><td>Product '+i+'</td><td><span id="element_copy_'+i+'">https://linkgenerate.com/uyankf245jhg123n</span><span class="copy_link" data-clipboard-target="#element_copy_'+i+'"><i class="fa fa-clone" aria-hidden="true"></i></span></td><td>987</td><td>458</td><td><span data-status="'+link_status+'" data-id="SDF855ADFSG587ASDF" class="change_payment_link_status text-capitalize '+ main_status+'">'+ main_status+'</span></td></tr>';
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

});