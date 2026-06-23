import jetPaths from 'jet-paths';

const Paths = {
  _: '/api',
  Auth: {
    _: '/auth',
    Register: '/register',
    Login: '/login'
  },
} as const;

export const JetPaths = jetPaths(Paths);
export default Paths;
