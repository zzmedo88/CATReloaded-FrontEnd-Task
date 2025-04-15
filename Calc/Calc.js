let Calc = localStorage.getItem('sum') || '';
document.querySelector('.p1').innerHTML = localStorage.getItem('sum');
function add(num) {
  Calc += num;
  localStorage.setItem('sum',Calc);
  display();
}
function eq() {
  Calc=eval(Calc);
  localStorage.setItem('sum',Calc);
  display();
}
function calcClear() {
  Calc = '';
  localStorage.setItem('sum',Calc);
  document.querySelector('.p1').innerHTML = '0';
}
function display() {
  document.querySelector('.p1').innerHTML = Calc; 
}