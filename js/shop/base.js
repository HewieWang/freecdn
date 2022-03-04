jQuery(function($) {
    if ($(".order-now-btn").length > 0) {
        $(".order-now-btn").each(function(i) {
            $(this).on("click", function() {
                var type = $(this).data("type"),
                    product_id = $(this).data("id"),
                    variant_id = $(this).data("variant"),
                    quantity = $(this).data("num") || 1,
                    url;
                if ($(this).hasClass("mobile-checkout")) {
                    if (!variant_id) {
                        var checkedobj = $(".offer-check:checked");
                        $(this).attr("data-num", checkedobj.parent(".offerbox").find('input[name="quantity"]').val());
                        $(this).attr("data-id", checkedobj.data("id"));
                        $(this).attr("data-variant", checkedobj.data("variant"));
                        $(this).attr("data-type", checkedobj.data("type"));
                        quantity = checkedobj.parent(".offerbox").find('input[name="quantity"]').val();
                        product_id = checkedobj.data("id");
                        variant_id = checkedobj.data("variant");
                        type = checkedobj.data("type")
                    }
                }
                switch (type) {
                    case "wordpress":
                        if (product_id || variant_id) {
                            url = "/checkout/?fromlp=auto&add-to-cart=" + (variant_id ? variant_id : product_id) + "&quantity=" + quantity;
                            window.location.href = url
                        } else {
                            console.log("no product_id & variant_id")
                        }
                        break;
                    case "shopify":
                        if (variant_id) {
                            url = "/cart/" + variant_id + ":" + quantity;
                            window.location.href = url
                        } else {
                            console.log("no variant_id")
                        }
                        break;
                    case "shoplazza":
                        if (variant_id) {
                            url = "";
                            $.post(url + "/api/checkout/order", {
                                    line_items: [{
                                        quantity: quantity,
                                        variant_id: variant_id
                                    }]
                                },
                                function(ret) {
                                    if (ret.state === "success") {
                                        window.location.href = url + "/checkout/" + ret.data.order_token + "?step=contact_information"
                                    } else {
                                        console.log("shoplazza error")
                                    }
                                })
                        } else {
                            console.log("no variant_id")
                        }
                        break;
                    default:
                        console.log("no type matched")
                }
            })
        })
    }
    if ($(".gc-qty a").length > 0) {
        $(".gc-qty a").each(function(i) {
            $(this).on("click",
                function() {
                    var qty = $(this).parent(".gc-qty").find('input[name="quantity"]').val();
                    if ($(this).hasClass("gc-plus_btn")) {
                        qty++
                    }
                    if ($(this).hasClass("gc-minus_btn")) {
                        qty--
                    }
                    if (qty < 1) {
                        qty = 1
                    }
                    $(this).parent(".gc-qty").find('input[name="quantity"]').val(qty);
                    $(this).parents(".limited-right-area").find("button.pc-checkout").attr("data-num", qty)
                })
        })
    }
    if ($(".kore-select").length > 0) {
        $(".kore-select").each(function(i) {
            $(this).on("change", function() {
                var qty = $(this).val();
                $(this).parents(".kore-inner").find("button.pc-checkout").attr("data-num", qty);
            })
        })
    }
    if ($(".offer-check").length > 0) {
        $(".offer-check").each(function(i) {
            $(this).on("click",
                function() {
                    var qty = $(this).parent(".offerbox").find('input[name="quantity"]').val();
                    $(".offerbox").removeClass("box-checked");
                    $(".offer-check").removeAttr("checked");
                    $(this).attr("checked", "checked");
                    $(this).parents(".offerbox").addClass("box-checked");
                    $(this).parents(".offersWrapper").find("button.mobile-checkout").attr("data-num", qty);
                    $(this).parents(".offersWrapper").find("button.mobile-checkout").attr("data-id", $(this).data("id"));
                    $(this).parents(".offersWrapper").find("button.mobile-checkout").attr("data-variant", $(this).data("variant"));
                    $(this).parents(".offersWrapper").find("button.mobile-checkout").attr("data-type", $(this).data("type"))
                })
        })
    }
    if ($("#gallery_nav a").length > 0) {
        $("#gallery_nav a:first").addClass("on")
        $("#gallery_nav a").each(function(i) {
            $(this).on("click", function() {
                $("#gallery_output img").attr("src", $(this).find("img").attr("src"));
                $("#gallery_nav a").removeClass("on");
                $(this).addClass("on")
            })
        })
    }
    if ($("h1").hasClass("alt-1")) {
        $(".alt-1").countDown({
            css_class: "countdown"
        })
    }
});
