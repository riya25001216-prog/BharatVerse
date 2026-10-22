/**
 * Escapes straight apostrophes that appear inside single-quoted string
 * literals, e.g.  'Tirupati's'  ->  'Tirupati\'s'
 *
 * A quote is treated as content when it sits between two word characters.
 */
const fs = require('fs');
const path = require('path');

const files = process.argv.slice(2);
let total = 0;

for (const file of files) {
  const src = fs.readFileSync(file, 'utf8');
  const out = src.replace(/'(?=[A-Za-z])/g, (match, offset, full) => {
    const prev = full[offset - 1];
    if (prev && /[A-Za-z]/.test(prev) && full[offset + 1] && /[A-Za-z]/.test(full[offset + 1])) {
      return "\\'";
    }
    return match;
  });
  if (out !== src) {
    const count = (out.match(/\\'/g) ?? []).length - (src.match(/\\'/g) ?? []).length;
    fs.writeFileSync(file, out);
    console.log(`${path.basename(file)}: escaped ${count} apostrophes`);
    total += count;
  }
}
console.log('total escaped:', total);
