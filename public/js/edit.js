

$('#rangestart').calendar({
    type: 'date',
    endCalendar: $('#rangeend')
  });
  $('#rangeend').calendar({
    type: 'date',
    startCalendar: $('#rangestart')
  });

  $('#startTime').calendar({
    type: 'time'
  });
  $('#endTime').calendar({
    type: 'time'
  });
  $('.ui.radio.checkbox')
  .checkbox();
  $('select.dropdown')
  .dropdown()
;