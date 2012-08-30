define(["zq", "/templates/product-line.js"], function($, prodTemplate){
  $(function(){
    $("#create-product").on("click", function(e){
      e.preventDefault();
      var newProduct = {
            name: $("#product-name").val(),
            price: $("#product-price").val()
          };

      $("#product-list tbody")
        .append($.create(prodTemplate(newProduct)));
    });
  });
});