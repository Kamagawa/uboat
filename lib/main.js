'use strict';
$(function (){
    var pkgID = '';
    //creating buttons on top of existing components
    function addButtonDetail() {
        vex.defaultOptions.className = 'vex-theme-default';
        addButtonGithub();
        addButtonGooglePlay();    
    }

    $(document).ready(function() {
        pkgID = window.location.hash;
        pkgID = pkgID.substring(pkgID.lastIndexOf('=')+1);
        initModal();
        addButtonDetail();
    })

    setInterval(function() {
        var articles = $('article').length;
        var occurance = $('.openModal').length;
        //console.log(articles + ', ' + occurance);
        if (occurance ==0){
            addButtonDetail();
        }
    }, 10); // check every second
})
