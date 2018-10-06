    // show loading
    showloading();

    function changeStatus(forThis, key) {

        console.log(key);
        if ($(forThis).text() == "enable") {
            changed_text = 'disable';
            $(forThis).removeClass('disable');
            $(forThis).addClass('enable');
            firebase.database().ref(`links/${account}/${key}/pay_active`).set(true);
        } else {
            changed_text = "enable";
            $(forThis).removeClass('enable');
            $(forThis).addClass('disable');
            firebase.database().ref(`links/${account}/${key}/pay_active`).set(false);
        }
        $(forThis).html(changed_text);
    }

    var temp;
    db.ref('links/' + account).on('value', function(snapshot) {
        var data = snapshot.val();
        $('#payment_links tbody').empty();
        temp = "";
        Object.keys(data)
        .forEach(function (key, i) {
            var main_status;
            if(!data[key].pay_active) {
                main_status = "enable";
            } else {
                main_status = "disable";
            }

            temp = temp + `<tr>
                            <td>${i+1}</td>
                            <td>${data[key].name}</td>
                            <td>
                                <span id="element_copy_${i+1}">http://localhost:3030/payments?id=${key}</span>
                                <span class="copy_link" data-clipboard-target="#element_copy_${i+1}">
                                    <i class="fa fa-clone" aria-hidden="true"></i>
                                </span>
                            </td>
                            <td>${data[key].total_transaction}</td>
                            <td>${data[key].DAI_collected}</td>
                            <td>
                                <span onclick="changeStatus(this, '${key}')" class="change_payment_link_status text-capitalize ${main_status}">${main_status}</span>
                            </td>
                        </tr>'`; 
        });
        $('#payment_links tbody').append(temp);
        $('#payment_links').DataTable();
    });
    
    // Stop loading
    stopLoading();

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