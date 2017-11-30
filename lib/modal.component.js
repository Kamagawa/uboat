var onSuccessCallBack = function(data){
    alert(data);
}

function showInfoModal(reviewObject) {
    let temp = templateCreater(reviewObject);
    vex.dialog.open({
        message: temp.message,
        input: temp.input,
        buttons: [
            $.extend({}, vex.dialog.buttons.YES, { text: 'Confirm' }),
            $.extend({}, vex.dialog.buttons.NO, { text: 'Discard' })
        ],
        callback: function (data) {
            if (!data) {
                console.log('Cancelled')
            } else {
                createIssueCall(data, onSuccessCallBack);
            }
        }
    })
}
