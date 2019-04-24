$(() => {
  chrome.storage.sync.get(['total', 'limit'], (budget) => {
    $('#total').text(budget.total);
    $('#limit').text(budget.limit);
  });

  $('#spendAmount').click(() => {
    chrome.storage.sync.get(['total', 'limit'], (budget) => {
      let newTotal = 0;
      if (budget.total) {
        newTotal += parseInt(budget.total);
      }

      const amount = $('#amount').val();
      if (amount) {
        newTotal += parseInt(amount);
      }

      chrome.storage.sync.set({ total: newTotal }, () => {
        if (amount && newTotal >= budget.limit) {
          const notifOptions = {
            type: 'basic',
            iconUrl: 'icon48.png',
            title: 'Limit reached!',
            message: "Uh oh, look's like you've reached your alloted limit.",
          };
          chrome.notifications.create('limitNotif', notifOptions);
        }
      });
      $('#total').text(newTotal);
      $('#amount').val('');
    });
  });
});
