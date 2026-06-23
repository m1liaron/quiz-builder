const Paths = {
  _: '/api',
  Auth: {
    _: '/auth',
    Register: '/register',
    Login: '/login'
  },
  Quiz: {
    _: '/quizzes',
    CREATE_QUIZ: '',
    GET_ALL_QUIZZES: '',
    GET_BY_ID_QUIZ: '/:id',
    DELETE_QUIZ: '/:id'
  },
} as const;

export { Paths };
