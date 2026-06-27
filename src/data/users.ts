/** SauceDemo credentials (public, documented on the login page). */
export const VALID_USER = {
  username: 'standard_user',
  password: 'secret_sauce',
} as const;

/** Negative login scenarios, used to drive parametrized tests. */
export const LOGIN_SCENARIOS = [
  {
    name: 'locked-out user',
    username: 'locked_out_user',
    password: 'secret_sauce',
    error: 'locked out',
  },
  {
    name: 'wrong password',
    username: 'standard_user',
    password: 'wrong_password',
    error: 'Username and password do not match',
  },
  {
    name: 'missing password',
    username: 'standard_user',
    password: '',
    error: 'Password is required',
  },
  {
    name: 'missing username',
    username: '',
    password: 'secret_sauce',
    error: 'Username is required',
  },
] as const;
