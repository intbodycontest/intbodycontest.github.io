// JavaScript Document
// LS

$("a#more-share-box").hover(
  function () {
    $("#share-custom").show().delay(800);
  }
);
$("#share-custom").hover(
  function () {
   //Please leave this blank
  },
   function () {
    $(this).hide();
  }
);


$("#share-box-close").click(function () { 
    $("#share-custom").hide();
  });

