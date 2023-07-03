import axios from "axios";
const token = localStorage.getItem("token");

export function isLogin() {
  if (!token) {
    window.location.replace("/login");
    return false;
  }
  return true;
}

export async function getPrograms() {
  if (isLogin()) {
    const API_URL = "http://oicar-22-433a6d03acdd.herokuapp.com/program";
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Greska prilikom dohvacanja programa!", error);
      throw error;
    }
  }
}

export const getClients = async () => {
  if (isLogin()) {
    const API_URL = "http://oicar-22-433a6d03acdd.herokuapp.com/myusers";
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        const usersData = response.data;
        return usersData;
      } else {
        alert("greska prilokom dohvacanja klijenata");
      }
    } catch (error) {
      alert("greska prilokom dohvacanja klijenata");
    }
  }
};

export const getMeals = async () => {
  if (isLogin()) {
    const API_URL = "http://oicar-22-433a6d03acdd.herokuapp.com/meal/all";

    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      alert("Greska prilikom dohvacanja programa!");
    }
  }
};

export const getTrainings = async () => {
  if (isLogin()) {
    const API_URL = "http://oicar-22-433a6d03acdd.herokuapp.com/training/all";

    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      alert("Greska prilikom dohvacanja treninga!");
    }
  }
};
