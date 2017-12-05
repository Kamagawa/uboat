'use strict';
$(function () {
    var urlstored = '';
    var pkgID = '';

    //creating buttons on top of existing components
    function addButtonDetail() {
        addButtonGooglePlay();    
    }

    var pageHasReview = function() {
        let url =(window.location.toString());
        var review = url.indexOf('ReviewsPlace:p');
        var beta = url.indexOf('BetaFeedbackPlace:p');
        // console.log ('string index:' + review + ',' + beta);
        if (review>0 || beta>0){
            pkgID = url.substring(url.lastIndexOf('=')+1);
            //console.log('' + pkgID);
            return true;
        } else {
            return false;
        }
    }

    $(document).ready(function() {
        console.log('Document.ready()');
        setInterval(function() {
            if (pageHasReview()){
                if (window.location.toString() != urlstored){
                    //console.log('init fired on new page');
                    urlstored = window.location.toString();
                    console.log('page triggered: ' + pkgID);
                    initModal();
                    $('.modal').modal();                    
                }
                var num = $('#issuetype').val();
                if (num == 6 || num == 7){
                    $('#reqSquare').attr('style', 'display:inline');
                } else {
                    $('#reqSquare').attr('style', 'display:none');
                }

                
                var articles = $('article').length;
                var occurance = $('.openModal').length;
                //console.log('occurence'+articles + ':' + occurance);
                if ( occurance == 0 || (articles != occurance)) {
                    addButtonDetail();
                    console.log('added Button');
                }
            }
            
        }, 100); // check every second
    })
})
