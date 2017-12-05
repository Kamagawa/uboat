'use strict'
let onResultCallBack = function(status, data){
    if (status == 201) {
        $('#notif-body').text('Your issue has been created!');
        $('#linkToNewIssue').attr('href', BASE_URL + '/browse/' +data.key);
        $('#inform').modal('open');
    } else if (status == 400) {
        $('#notif-body').text(JSON.stringify(data));
        $('#inform').modal('open');
    } else {
        $('#notif-body').text(JSON.stringify(data));
        $('#inform').modal('open');
    }  
}

var showResultModal=(information)=>{
    $('#notif-body').text(JSON.stringify(information));
    $('#inform').modal('open');
}

let open=()=>{$('#modal1').modal('open');}
let close=()=>{$('#modal1').modal('close')}
let closeOK=()=>{$('#inform').modal('close')}

let materialModal=(rev)=>{
    $('select').material_select();
    $('#summary').val(rev.summary);
    $('#description').val(rev.description);

    $('#project').val(rev.project);
    $('#description').trigger('autoresize');
    $('.submit').click(submit);
    $('#OK-close').click(closeOK);
    $('.close').click(close);
    open();
}

let submit=()=>{
    var data = { fields: {}  };
    var projectID = $('#project').val();
    var issType = ''+$('#issuetype').val();
    var compo = $('#components').val();
    var plat =  "16871";  //set to Android
    var sum = $('#summary').val();
    var desc = $('#description').val();
    var requestType = $('#requestType').val();

    // console.log(components);console.log(plat);   // debug output
    data.fields.summary = sum;
    data.fields.description = desc;
    data.fields.project = { key: projectID};
    data.fields.issuetype = { id: issType };


    if (issType == 1){                                  //defect
        data.fields.components = [{id: compo}];
        data.fields.customfield_14000 = [{id: plat}];
        data.fields.customfield_10108 = { id: '10208' }; //severity
    } else if (issType == 6){                           // story
        data.fields.components = [{id: compo}];
        data.fields.customfield_14000 = [{id: plat}];
        data.fields.customfield_12002 = { id: requestType }; //requestType
    } else if (issType == 7) {                          // epic
        data.fields.customfield_10007 = sum;
        data.fields.components = [{id: compo}];
        data.fields.customfield_14000 = [{id: plat}];
        data.fields.customfield_12002 = { id: requestType }; //requestType
    }

    console.dir(data);
    
    JIRA_CREATE_ISSUE(JSON.stringify(data), onResultCallBack);
    close();
}



var initModal=(data)=>{
    var template = `
    <!-- Modal Structure -->
      <div id="modal1" class="modal modal-fixed-footer ">
        <div class="modal-content">
          <h4>Create a New Issue</h4>
          <div class="row">
          <form class="col s12">
          <!--Title-->
            <div class="row">
              <div class="input-field col s9">
                <input id="summary" type="text" class="validate valid ">
                <label for="summary" class="active">Summary</label>
              </div>
              <div class="input-field col s3">
                <select id="issuetype">
                    <option value="1">Defect</option>
                    <option value="6">Story</option>
                    <option value="7">Epic</option>
                    <option value="15">Dev Internal Debug</option>
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
                    <option value="96754">GP-CAL-Reviews</option>
                    <option value="96541">Help - Content</option>
                    <option value="30054">PIM-Accounts</option>
                    <option value="30055">PIM-Analytics</option>
                    <option value="96868">PIM-Builds</option>
                    <option value="30056">PIM-Calendar</option>
                    <option value="30969">PIM-Compression</option>
                    <option value="30057">PIM-Contacts</option>
                    <option value="30058">PIM-DataServices</option>
                    <option value="30059">PIM-Email Attachment Handling</option>
                    <option value="30060">PIM-Email Protocols</option>
                    <option value="30061">PIM-Email UI</option>
                    <option value="30062">PIM-Hub</option>
                    <option value="30150">PIM-HUB Folders</option>
                    <option value="30427">PIM-Hub Search</option>
                    <option value="30151">PIM-HUB Snooze</option>
                    <option value="31277">PIM-Message List UI</option>
                    <option value="30152">PIM-Messaging AfW</option>
                    <option value="30132">PIM-Notes</option>
                    <option value="30063">PIM-Notifications</option>
                    <option value="30064">PIM-Performance</option>
                    <option value="30065">PIM-Process</option>
                    <option value="32051">PIM-Settings</option>
                    <option value="30066">PIM-Social Connect</option>
                    <option value="30067">PIM-Tasks</option>
                    <option value="31050">PIM-Telephony Integration</option>
                    <option value="30259">PIM-Upgrade</option>
                    <option value="96142">PIM-UX</option>
                    <option value="96021">Requirements</option>
                    <option value="96340">UI String Reviews</option>
                    <option value="96146">UX</option>
                </select>
                <label class="active">Components</label>
              </div>
              <div id="reqSquare" class="input-field col s4" style="display:none;">
                <select id="requestType" value="15303">
                    <option value="17503">Accessibility</option>
                    <option value="17504">Accessories</option>
                    <option value="17505">Certification and Standards</option>
                    <option value="15302">Carrier/Customer Requirement</option>
                    <option value="17506">BB Care</option>
                    <option value="15307">Developer/Ecosystem</option>
                    <option value="17507">Environmental</option>
                    <option value="15305">Hardware</option>
                    <option value="15304">Legal and Regulatory</option>
                    <option value="16000">Manufacturing</option>
                    <option value="15303">Product Experience</option>
                    <option value="17508">Product Roadmap</option>
                    <option value="17509">Quality</option>
                    <option value="17510">Security</option>
                    <option value="15306">Technical</option>
                    <option value="17600">Carrier and Certification</option>
                </select>
                <label for="requestType" class="active">RequestType</label>
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
        <div>Close</div> 
          </Button>
          <Button class="submit btn waves-effect waves-light" > 
            <div>Submit</div> 
          </Button>
        </div>
    </div>

    <!-- Modal Structure -->
    <div id="inform" class="modal">
        <div class="modal-content">
        <h4>Notification</h4>
            <p id = "notif-body"></p>
        </div>
        <div class="modal-footer">
            <a href="" id="linkToNewIssue" class="btn waves-effect waves-light">View on Jira</a>
            <a href="closeOK()" id="OK-close" class="btn waves-effect waves-light">OK</a>
        </div>
    </div>`

    ;
    $('body').prepend(template);

}


