//return a triple (g, x, y), such that ax + by = g = gcd(a, b).
const extendedEuc = (a, b) => {
  if ( a === 0 ) {
    return [b, 0, 1]
  } else {
    let g,x,y;
    [g, x, y] = extendedEuc( b % a, a)
    return [g, y - ( Math.floor(b/a) ) * x, x]
  }
}

const inverseMod = (b, n) => {
  let gcd, x, _na;
  [gcd, x, _na] = extendedEuc(b,n)
  if ( gcd == 1 ) {
    return x % n;
  }
}

const multiplyMod = (a, b, m) => {
  //non overflow
  if ((a < 94906265) && (b < 94906265)) {
    return (a*b) % m;
  }
  let d = 0,
      mp2 = m / 2;

  if (a >= m) a %= m;
  if (b >= m) b %= m;
  //shifting bits to handle bigger numbers
  for (let i = 0; i < 53; i++) {
  	d = (d >= mp2) ? (2 * d - m) : (2 * d);
  	if (a >= 4503599627370496) {
      d += b;
      a = a - 4503599627370495;
  	}
  	if (d > m) {
      d -= m;
    }
  	a *= 2;
  }
  return d;
}

const powerMod = (base, exponent, mod) => {
  if (exponent < 0) {
    return inverseMod( powerMod(base, -exponent, mod), mod );
  }
  let result = 1;
  base = base % mod;
  while (exponent > 0) {
    if (exponent % 2 == 1) {
      result = multiplyMod(result, base, mod);
      exponent -= 1;
    }
    exponent /= 2;
    base = multiplyMod(base, base, mod);
  }
  return result;
};


module.exports = {
  extendedEuc : extendedEuc,
  inverseMod : inverseMod,
  multiplyMod : multiplyMod,
  powerMod : powerMod
}
