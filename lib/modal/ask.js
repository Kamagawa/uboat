'use strict'
let onResultCallBack = function(status, data){
    if (status == 201) {
      Materialize.toast('Your issue has been created', 4000);
      alert(data);
    } else if (status == 400) {
      alert(data);
    } else {
      alert(data);
    }  
}
let open=()=>{$('#modal1').modal('open');}
let close=()=>{$('#modal1').modal('close')}

let materialModal=(rev)=>{
    $('select').material_select();
    $('#summary').val(rev.summary);
    $('#description').val(rev.description);

    $('#project').val(rev.project);
    //$('#issuetype').val(rev.issuetype);
    //$('#components').val(rev.components);
    //$('#platform').val(rev.platform);    
    $('#description').trigger('autoresize');
    $('.submit').click(submit);
    $('.close').click(close);
    open();
}

let submit=()=>{
    var data = { fields: {}  };
    var projectID = $('#project').val();
    var issType = ''+$('#issuetype').val();
    var compo = $('#components').val();
    var plat =  $('#platform').val();
    var sum = $('#summary').val();
    var desc = $('#description').val();

    // console.log(components);console.log(plat);   // debug output
    data.fields.summary = sum;
    data.fields.description = desc;
    data.fields.project = { key: projectID};
    data.fields.issuetype = { id: issType };
    data.fields.components = [{id: compo}];
    data.fields.customfield_14000 = [{id: plat}];
    data.fields.customfield_10108 = { id: '10208' };
    console.dir(data);
    
    JIRA_CREATE_ISSUE(JSON.stringify(data), onResultCallBack);
    close();
}

let initModal=(data)=>{
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
                <select id="issuetype">
                    <option value="1">BugFix</option>
                    <option value="2">Story</option>
                </select>
                <label class="active">Issue Type</label>
              </div>
            </div>
            <!--project name, component and Platform-->
            <div class="row">
              <div class="input-field col s4">
                <select id="project">
                    <option value="AVNPIM">AVNPIM</option>
                </select>
                <label class="active">Project</label>
              </div>
              <div class="input-field col s4">
                <select id="components">
                    <option value="30057">Calendar</option>
                    <option value="1">HUB</option>
                    <option value="3">Keyboard</option>
                </select>
                <label class="active">Components</label>
              </div>
              <div class="input-field col s4">
                <select id="platform">
                    <option value="16871">Android</option>
                    <option value="1">BB10</option>
                    <option value="3">BB7</option>
                </select>
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
        <Button class="close btn waves-effect waves-light" > 
        <div>close()</div> 
          </Button>
          <Button class="submit btn waves-effect waves-light" > 
            <div>submit()</div> 
          </Button>
        </div>
    </div>`;
    $('body').prepend(template);
}