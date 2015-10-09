
(function($) {
  $(document).ready(function(){
    if ($(".select_address").length > 0) {
      $('input#order_use_billing').unbind("change");
      
      hide_address_form('billing');
      hide_address_form('shipping');
      
      if ($('input#order_use_billing').is(':checked')) {
        $("#shipping .select_address").hide();
      }
      
      var onUseBillingClicked = function() {
        if ($('input#order_use_billing').is(':checked')) {
          $("#shipping .select_address").hide();
          hide_address_form('shipping');
        } else {
          $("#shipping .select_address").show();
          if ($("input[name='order[ship_address_id]']:checked").val() == '0') {
            show_address_form('shipping');
          } else {
            hide_address_form('shipping');
          }
        }
      };
      $('input#order_use_billing').click(onUseBillingClicked);
      onUseBillingClicked();
      
      $("input[name='order[bill_address_id]']:radio").change(function(){
        if ($("input[name='order[bill_address_id]']:checked").val() == '0') {
          show_address_form('billing');
        } else {
          hide_address_form('billing');
        }
      }).change();
      
      $("input[name='order[ship_address_id]']:radio").change(function(){
        if (!$('input#order_use_billing').is(':checked') && $("input[name='order[ship_address_id]']:checked").val() == '0') {
          show_address_form('shipping');
        } else {
          hide_address_form('shipping');
        }
      }).change();
    }
  });
  
  function hide_address_form(address_type){
    $("#" + address_type + " .inner").hide();
    $("#" + address_type + " .inner input").prop("disabled", true);
    $("#" + address_type + " .inner select").prop("disabled", true);
    //$("#" + address_type + " .inner input").attr("shouldBeHidden", true);
  }
  
  function show_address_form(address_type){
    $("#" + address_type + " .inner").show();
    $("#" + address_type + " .inner input").prop("disabled", false);
    $("#" + address_type + " .inner select").prop("disabled", false);
    //$("#" + address_type + " .inner input").attr("shouldBeHidden", false);
  }
})(jQuery);
