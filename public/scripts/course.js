let creditsTaken = 0;
let limit = 1

$('input.ue').on('change', function(u) {
  // console.log($(this));
  // console.log(u);
   if($(this).siblings(':checked').length >= limit) {
     this.checked = false;
     $('div.error').html("You can only choose 1 UE course.")
     creditsTaken += parseInt(u.target.value, 10)
   }
});

$('input.checks').on('change',e => {
  if (e.target.checked) {
     $('div.error').html(" ")
    creditsTaken += parseInt(e.target.value, 10)
  } else {
    creditsTaken -= parseInt(e.target.value, 10)
  }
  changeTotal()
});

function reset(){
  $('input.checks').prop('checked', false)
  creditsTaken = 0
  changeTotal()
}

function changeTotal(){
  $('#total').html(creditsTaken)
}
