var onSuccessCallBack = function(data){
    alert(data);
}

function showInfoModal(reviewObject) {
    let temp = templateCreater(reviewObject);
    vex.dialog.open({
        
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
            '<div>',
            '<div style="float:left; margin-right:5%;" class="vex-custom-field-wrapper">',
                '<label for="project">Project</label>',
                '<div class="vex-custom-input-wrapper">',
                    '<input name="project" type="text" value="' + data.project + '" required/>',
                '</div>',
            '</div>',
            '<div style="" class="vex-custom-field-wrapper">',
            '<label for="type">Component</label>',
            '<div class="vex-custom-input-wrapper">',
                '<input name="project" type="text" value="' + data.project + '" required/>',
            '</div>',
        '</div>',
            '<div style="float:right; margin-left:5%;" class="vex-custom-field-wrapper">',
                '<label for="type">Issue Type</label>',
                '<label class="switch"><input type="checkbox" id="togBtn"><div class="slider round"><!--ADDED HTML --><span class="on">ON</span><span class="off">OFF</span><!--END--></div></label>',
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
                    '<textarea name="desc" type="text" rows="5" value="' + data.desc + '" required></textarea>',
                '</div>',
            '</div>'
        ].join('')
    };
    return modalTemplate;
}


function materialModal(){
    
    
}

function initModal(){
    var template = `
    <!-- Modal Structure -->
      <div id="modal1" class="modal modal-fixed-footer">
        <div class="modal-content">
          <h4>Modal Header</h4>
          <p>A bunch of text</p>
        </div>
        <div class="modal-footer">
          <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat ">Agree</a>
        </div>
    </div>`;
    $('body').prepend(template);
}