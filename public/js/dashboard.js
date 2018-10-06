// show loading
showloading();

db.ref('links').on('value', function(snapshot) {
    var count = {
        links : 0,
        total_transaction : 0,
        dai_collected : 0
    };
    var data = snapshot.val();
    Object.keys(data)
    .forEach(function (key, i) {
        Object.keys(data[key])
        .forEach(function (links, i) {
            count.links++;
            if (links == account) {
                count.total_transaction = count.total_transaction + data[key][links].total_transaction;
                count.dai_collected = count.dai_collected + data[key][links].DAI_collected;
            }
        });
    });
    $('#active_payments').text(count.links);
    $('#transactions').text(count.total_transaction);
    $('#dai_received').text(count.dai_collected);
});

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
                            <span onclick="copyTheLink('element_copy_${i+1}')" class="copy_link">
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

// link copy
function copyTheLink(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(`#${element}`).text()).select();
    document.execCommand("copy");
    $temp.remove();
    console.log('done');
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