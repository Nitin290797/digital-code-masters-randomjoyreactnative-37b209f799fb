import * as api from "../api/asset";
import Toast from "react-native-toast-message";

export const getRandomAsset = (token, setState, type) => {
  return (dispatch) => {
    dispatch({ type: "ASSET_LOAD" });
    return api
      .randomAsset(token, type)
      .then(async (data) => {
        dispatch({ type: "ASSET_SUCCESS", payload: data?.data });
        if (data?.data?.isMystery) {
          const random = Math.floor(Math.random() * 4 + 1);
          setState(random);
        } else {
          switch (data?.data?.openedWith) {
            case 0:
              setState(2);
              break;
            case 1:
              setState(1);
              break;
            case 2:
              setState(3);
              break;
          }
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        dispatch({ type: "ASSET_FAIL" });
        Toast.show({
          type: "error",
          text1: "Failed to fetch data",
        });
      });
  };
};

export const setSound = (v) => {
  return (dispatch) => {
    dispatch({ type: "SET_SOUND", payload: v });
  };
};

export const shareAsset = (token, id) => {
  return api
    .shareAsset(token, id)
    .then(async (data) => {
      Toast.show({
        type: "success",
        text1: "Asset Shared Successfully",
      });
      navigation.navigate("Main");
    })
    .catch((err) => {
      console.log(err.response.data);
      //     Toast.show({
      //         type: 'error',
      //         text1: 'Failed to Skip interest',
      //         text2: err.response.data.msg
      // })
    });
};

export const getNotifications = (token) => {
  return (dispatch) => {
    dispatch({ type: "NOTIFICATIONS_LOAD" });
    return api
      .notifications(token)
      .then((data) => {
        console.log("not", data.data);
        dispatch({ type: "NOTIFICATONS_SUCCESS", payload: [] });
      })
      .catch((err) => {
        dispatch({ type: "NOTIFICATIONS_FAIL" });
        console.log(err.response.data);
        //     Toast.show({
        //         type: 'error',
        //         text1: 'Failed to Skip interest',
        //         text2: err.response.data.msg
        // })
      });
  };
};

export const getAssetWithId = (token, id, setStep) => {
  return (dispatch) => {
    dispatch({ type: "ASSET_LOAD" });
    return api
      .randomAsset(token, id)
      .then(async (data) => {
        console.log(data?.data);
        dispatch(getNotifications(token));
        dispatch({ type: "ASSET_SUCCESS", payload: data?.data });
        if (data?.data?.isMystery) {
          setStep(4);
        } else {
          switch (data?.data?.openedWith) {
            case 0:
              setStep(2);
              break;
            case 1:
              setStep(1);
              break;
            case 2:
              setStep(3);
              break;
          }
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        dispatch({ type: "ASSET_FAIL" });
        Toast.show({
          type: "error",
          text1: "Failed to fetch data",
        });
      });
  };
};
