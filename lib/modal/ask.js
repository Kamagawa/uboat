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
                JIRA_CREATE_ISSUE(JSON.stringify(mock_issue_creation), onSuccessCallBack);
            }
        }
    })
}

function templateCreater(data){
    var modalTemplate = {
        message: 'Please fill this form:',
        input: [
            '<style>',
            '.vex-custom-field-wrapper {',
                'margin: 1em 0;',
            '}',
            '.vex-custom-field-wrapper > label {',
                'display: inline-block;',
                'margin-bottom: .2em;',
            '}',
            '</style>',

            '<div class="vex-custom-field-wrapper">',
                '<label for="project">Project</label>',
                '<div class="vex-custom-input-wrapper">',
                    '<input name="project" type="text" value="' + data.project + '" required/>',
                '</div>',
            '</div>',
            '<div class="vex-custom-field-wrapper">',
                '<label for="type">Issue Type</label>',
                '<div class="vex-custom-input-wrapper">',
                    '<input readonly name="type" type="text" list="bugType" value="BugFix" required/>',
                    '<datalist id="bugType">',
                    '<option value="BugFix">',
                    '<option value="Story">',
                    '</datalist>',
                '</div>',
            '</div>',
            '<div class="vex-custom-field-wrapper">',
                '<label for="summary">Summary</label>',
                '<div class="vex-custom-input-wrapper">',
                    '<input name="summary" type="text" value="' + data.summary + '" required/>',
                '</div>',
            '</div>',
            '<div class="vex-custom-field-wrapper">',
                '<label for="desc">Description</label>',
                '<div class="vex-custom-input-wrapper">',
                    '<input name="desc" type="text" rows="5" value="' + data.desc + '" required/>',
                '</div>',
            '</div>'
        ].join('')
    };
    return modalTemplate;
}
