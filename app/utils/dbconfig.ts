import { connect } from "mongoose";
const url = process.env.URL as string;

export const dbconfig = async () => {
  try {
    await connect(url).then(() => {
      console.log("Connected to MongoDB");
    });
  } catch (error) {
    console.log(error);
  }
};
