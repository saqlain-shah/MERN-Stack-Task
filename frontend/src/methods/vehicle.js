import axios from "axios";

export const listVehicles = async (userData) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:8800/api/cars/list`,
      config
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const addVehicle = async (userData, vehicleData) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${userData.token}`,
      },
    };

    const { data } = await axios.post(
      `http://localhost:8800/api/cars/create`,
      vehicleData,
      config
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const updateVehicle = async (userData, vehicleData) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${userData.token}`,
      },
    };

    const { data } = await axios.post(
      `http://localhost:8800/api/cars/update/${vehicleData._id}`,
      vehicleData,
      config
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteVehicle = async (userData, vehicleData) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${userData.token}`,
      },
    };

    const { data } = await axios.delete(
      `http://localhost:8800/api/cars/delete/${vehicleData._id}`,
      config
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
