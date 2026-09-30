import { api } from './apiService';
import { setAuthVals } from '../AuthSlice';

class UserService {
  async fetchCurrentUser(dispatch) {
    try {
      const response = await api.get('/api/auth/me', {}, true);
      const data = response.data || response;

      if (data && (data.user || data.username || data.email)) {
        const userData = data.user || data;
        dispatch(setAuthVals(userData));
        return userData;
      }
    } catch (error) {
      dispatch(setAuthVals({}));
    }
    return null;
  }
}

export const userService = new UserService();