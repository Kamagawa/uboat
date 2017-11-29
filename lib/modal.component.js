
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
                jira(data.toSend);
                console.log('title', data.title, 'description', data.description)
                alert(data.title + ":" + data.description);
            }
        }
    })
}