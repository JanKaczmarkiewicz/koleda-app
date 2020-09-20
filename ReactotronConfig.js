import Reactotron from "reactotron-react-native";
import { storage } from "@koleda/common";
Reactotron.setAsyncStorageHandler(storage)
  .configure()
  .useReactNative()
  .connect();
