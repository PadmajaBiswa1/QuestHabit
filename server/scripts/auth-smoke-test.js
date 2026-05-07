const bcrypt = require('bcryptjs');
const User = require('../models/User');

const run = async () => {
  const saveHooks = User.schema.s.hooks._pres.get('save') || [];
  const passwordHook = saveHooks.find((hook) => (
    hook.fn.constructor.name === 'AsyncFunction'
    && hook.fn.length === 0
    && hook.fn.toString().includes('bcrypt.hash')
  ));

  if (!passwordHook) {
    throw new Error('Password hashing hook was not found or is still callback-style');
  }

  const createContext = {
    password: 'password123',
    isModified: (path) => path === 'password',
  };

  await passwordHook.fn.call(createContext);

  const passwordWasHashed = await bcrypt.compare('password123', createContext.password);
  if (!passwordWasHashed) {
    throw new Error('Password hook did not hash new passwords');
  }

  const previousHash = createContext.password;
  const loginSaveContext = {
    password: previousHash,
    isModified: () => false,
  };

  await passwordHook.fn.call(loginSaveContext);

  if (loginSaveContext.password !== previousHash) {
    throw new Error('Password hook changed the password during a non-password save');
  }

  console.log('auth smoke test passed');
};

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
