import Car from "../models/Car.js"; // Mongoose Car Scheme

export const getCarByCompany = async (req, res, next) => {
  //to handle unwanted errors during the execution
  try {
    const carByCompany = await Car.find({ company: req.params.id });
    if (carByCompany) {
      res.status(200).json(carByCompany);
      console.log(carByCompany);
    }
  } catch (err) {
    next(err);
  }
};
export const getCarByType = async (req, res, next) => {
  //to handle unwanted errors during the execution
  try {
    const carByType = await Car.find({ category: req.params.id });
    if (carByType) {
      res.status(200).json(carByType);
      console.log(carByType);
    }
  } catch (err) {
    next(err);
  }
};
export const getCarByColor = async (req, res, next) => {
  //to handle unwanted errors during the execution

  try {
    const carByColor = await Car.find({ color: req.params.id });
    if (carByColor) {
      res.status(200).json(carByColor);
      console.log(carByColor);
    }
  } catch (err) {
    next(err);
  }
};
export const getCarByModel = async (req, res, next) => {
  //to handle unwanted errors during the execution
  try {
    const carByModel = await Car.find({
      model: req.params.id,
    });
    if (carByModel) {
      res.status(200).json(carByModel);
      console.log(carByModel);
    }
  } catch (err) {
    next(err);
  }
};
export const createCar = async (req, res, next) => {
  //to handle unwanted errors during the execution
  console.log(req);
  const newCar = new Car(req.body);

  try {
    const savedCar = await newCar.save();
    res.status(200).json(savedCar);
  } catch (err) {
    next(err);
  }
};
export const updateCar = async (req, res, next) => {
  //to handle unwanted errors during the execution
  try {
    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCar);
  } catch (err) {
    next(err);
  }
};
export const deleteCar = async (req, res, next) => {
  //to handle unwanted errors during the execution
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.status(200).json("Car has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getCar = async (req, res, next) => {
  //to handle unwanted errors during the execution
  try {
    const car = await Car.findById(req.params.id);
    res.status(200).json(car);
  } catch (err) {
    next(err);
  }
};

export const getCars = async (req, res, next) => {
  const { ...details } = req.query;
  //to handle unwanted errors during the execution
  try {
    const cars = await Car.find({ ...details });
    res.status(200).json(cars);
  } catch (err) {
    next(err);
  }
};

export const getPaginatedCarDetails = async (req, res, next) => {
  const { ...details } = req.query;
  //to handle unwanted errors during the execution
  try {
    let page = req.body.page;
    let skip;
    if (page <= 1) {
      skip = 0;
    } else {
      skip = (page - 1) * 3;
    }
    const cars = await Car.find({ ...details })
      .skip(skip)
      .limit(3);
    res.status(200).json(cars);
  } catch (err) {
    next(err);
  }
};
