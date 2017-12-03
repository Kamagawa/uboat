'use strict';
$(function (){
    var init = false;
    var urlstored = '';
    var pkgID = '';
    
    //creating buttons on top of existing components
    function addButtonDetail() {
        addButtonGithub();
        addButtonGooglePlay();    
    }

    var pageHasReview = function() {
        let url =(window.location.toString());
        var review = url.indexOf('ReviewsPlace:p');
        var beta = url.indexOf('BetaFeedbackPlace:p');
        console.log ('string index:' + review + ',' + beta);
        if (review>0 || beta>0){
            pkgID = url.substring(url.lastIndexOf('=')+1);
            console.log('' + pkgID);
            return true;
        } else {
            return false;
        }
    }

    $(document).ready(function() {
        console.log('Document.ready()');
        setInterval(function() {
            if (window.location.toString() != urlstored){
                console.log('init fired');
                urlstored = window.location.toString();
                if (pageHasReview()){
                    console.log('page triggered: ' + pkgID);
                    initModal();
                    $('.modal').modal();
                }
            }

            var articles = $('article').length;
            var occurance = $('.openModal').length;
            //console.log('occurence'+articles + ':' + occurance);
            if ( (occurance == 0 ) && pageHasReview()){
                
                addButtonDetail();
            }
        }, 10); // check every second
    })
})
