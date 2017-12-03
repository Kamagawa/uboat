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
                '<label for="project" class="">Project</label>',
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


function materialModal(rev){
    $('#summary').val(rev.summary);
    $('#description').val(rev.description);
    $('#project').val(rev.project);
    $('#issuetype').val(rev.issuetype);
    $('#components').val(rev.components);
    $('#platform').val(rev.platform);    
    $('#description').trigger('autoresize');
    $('#modal1').modal('open');
}

function initModal(data){
    var template = `
    <!-- Modal Structure -->
      <div id="modal1" class="modal modal-fixed-footer">
        <div class="modal-content">
          <h4>Create a New Issue</h4>
          
          
          <div class="row">
          <form class="col s12">
            
          <!--Title-->
            <div class="row">
              <div class="input-field col s9">
                <input id="summary" type="text" class="validate valid">
                <label for="summary" class="active">Summary</label>
              </div>
              <div class="input-field col s3">
                <input id="issuetype" type="text" class="validate valid">
                <label for="issuetype" class="active">Issue Type</label>
              </div>
            </div>

            <!--project name, component and Platform-->
            <div class="row">
              <div class="input-field col s4">
                <input id="project" type="text" class="validate valid">
                <label for="project" class="active">Project</label>
              </div>
              <div class="input-field col s4">
                <input id="components" type="text" class="validate valid" >
                <label for="components" class="active">Components</label>
              </div>
              <div class="input-field col s4">
                <input id="platform" type="text" class="validate valid">
                <label for="platform" class="active">Platform</label>
              </div>
            </div>

            <!--description-->
            <div class="row">
              <div class="input-field col s12">
                <textarea id="description" class="materialize-textarea " line="10"></textarea>
                <label for="description" class="active">Description</label>
              </div>
            </div>

          </form>
        </div>


        </div>
        <div class="modal-footer">
          <a href="" class="modal-action modal-close waves-effect waves-green btn-flat ">Cancel</a>
          <a href="" class="modal-action modal-close waves-effect waves-green btn-flat ">Agree</a>
        </div>
    </div>`;
    $('body').prepend(template);
    $('#description').val(`
--- Steps to Reproduce: ---

--- Actual Result: ---

--- Expected Result: ---

--- Workaround: ---

--- Performance Impact: ---

--- Environment Details: ---
    `);
    $('#description').trigger('autoresize');
}