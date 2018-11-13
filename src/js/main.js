import $ from 'jquery';
import 'popper.js';
import 'bootstrap'
import '../css/style.css';
import helpers from './helpers'



const pollards = (n, a) => {
  if ( a > 100 ) { return { p : '?', q : '?' } }
  let m = a, d = 0;
  for ( let i = 2; i < 200; i++ ) {
    m = helpers.powerMod(m, i, n)
    d = helpers.gcd( m-1, n)
    if ( d > 1 && d < n ) {
      return { p : d, q : n / d}
    }
  }
  console.log("Choosing next a!", a)
  return pollards(n, a+1)
}


$('#factorButt').on('click', (ev) => {
  let results = pollards( $('#Nput').val(), 2 );
  $('#factorResults').html(`<h3> Factors: p = ${results.p} q = ${results.q}`)

})
