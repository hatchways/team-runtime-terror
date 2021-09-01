import { FetchOptions } from '../../interface/FetchOptions';
import { ProfilesApiData } from '../../interface/Profile';

const getAllProfiles = async (): Promise<ProfilesApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };

  return await fetch(`/profile/list`, fetchOptions)
    .then((res) => res.json())
    .catch((err) => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

const getProfileDetails = async (profile_id: string) => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };

  return await fetch(`/profile/search?_id=${profile_id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

const createUserProfile = async (userId: string, userType: string, email: string) => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, userType, email }),
    credentials: 'include',
  };
  return await fetch(`/profile/create`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export { getAllProfiles, getProfileDetails, createUserProfile };
