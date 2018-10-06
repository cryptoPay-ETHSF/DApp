$(document).ready(function() {

    $('#dai_percentage').on('change', function () {

        var dai_per_val = parseInt($(this).val());
        var eth_per_val = 100 - dai_per_val;

        $('#eth_percentage').val(eth_per_val);

    });

    $('#eth_percentage').on('change',function () {

        var eth_per_val = parseInt($(this).val());
        var dai_per_val = 100 - eth_per_val;

        $('#dai_percentage').val(dai_per_val);

    });

    $('#settings_form').submit(function(e){
        e.preventDefault();

        var dai_percentage= parseInt($('#dai_percentage').val());
        var eth_percentage= parseInt($('#eth_percentage').val());
        var total_per = dai_percentage + eth_percentage;

        if(total_per > 100) {
            console.log("Please Enter Correct values");
            $('#eth_percentage').val('0');
            $('#dai_percentage').val('100');
        }else{

            console.log("Update Successfull");
            
        }
    });

});