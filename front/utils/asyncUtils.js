export const reducerUtils = {
  init: () => ({
    data: null,
    loading: false,
    error: false,
  }),

  loading: (prevState = null) => ({
    data: prevState,
    loading: true,
    error: null,
  }),
  success: (data = null) => ({
    data,
    loading: false,
    error: null,
  }),
  error: (error) => ({
    data: null,
    loading: false,
    error,
  }),
};
