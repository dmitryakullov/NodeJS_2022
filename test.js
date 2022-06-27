const bcrypt = require('bcrypt');

const password = 'asdfg43567';
const saltRounds = 11;

async function asdf() {
  const hash = await bcrypt.hash(password, saltRounds);

  const res = await bcrypt.compare(password, hash);

  console.log({ hash, res });
}
asdf();
