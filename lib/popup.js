$(function(){
  //sync first 
  chrome.storage.sync.get(['total', 'limit'], function(budget){
    $('#total').text(budget.total);
    $('#limit').text(budget.limit);
  })

  $('#SpendAmount').click(function(){
    chrome.storage.sync.get(['total', 'limit'], function(budget){
      var newTotal = 0;    
      newTotal += parseInt(budget.total);

      var amount = parseInt($('#amount').val());

      newTotal += amount;
      chrome.storage.sync.set({'total': newTotal}, function(){
        if (amount && newTotal >=budget.limit){
          var notifOptions = {
            type:'basic',
            iconUrl: 'icon.png',
            title: 'Limit reached',
            message: 'Ohshit, limit reached bro',
          };
          chrome.notifications.create('limitNotif', notifOptions);
        }
      });

      $('#total').text(newTotal);
      $('#amount').val('');
    })
  })
})
