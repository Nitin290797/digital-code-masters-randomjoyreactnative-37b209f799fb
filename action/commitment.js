import * as api from "../api/commitment";
import Toast from "react-native-toast-message";

export const getSuggestion = (token, setStep, setTitle) => {
  return (dispatch) => {
    dispatch({ type: "STATEMENT_LOAD" });
    return api
      .statementSuggestion(token)
      .then(async (data) => {
        console.log("data log", data.data);
        dispatch({ type: "STATEMENT_SUCCESS", payload: data.data });
        // setTitle(data.data[0])
        setStep(1);
      })
      .catch((err) => {
        console.log(err.response.data);
        dispatch({ type: "STATEMENT_FAIL" });
        Toast.show({
          type: "error",
          text1: "Failed to fetch data",
        });
      });
  };
};

export const getCommitment = (token, setStep) => {
  return (dispatch) => {
    dispatch({ type: "COMMITMENT_LOAD" });
    return api
      .statementCommitment(token)
      .then(async (data) => {
        console.log(data.data);
        dispatch({ type: "COMMITMENT_SUCCESS", payload: data.data });
        setStep(1);
      })
      .catch((err) => {
        console.log(err.response.data);
        dispatch({ type: "COMMITMENT_FAIL" });
        Toast.show({
          type: "error",
          text1: "Failed to fetch data",
        });
      });
  };
};

export const homepageset = (setState) => {

  console.log('I am here');
  setState(0);
};

export const assignCommitment = (token, payload, setState) => {
  
  
  return api
    .assignCommitment(token, payload)
    .then((data) => {
      Toast.show({
        type: "success",
        text1: "Commitment assigned successfully",
      });
      // setState(0);
    })
    .catch((err) => {
      console.log(err.response.data);
      Toast.show({
        type: "error",
        text1: "Failed to assign commmitment",
      });
    });
};

export const assignStatement = async (token, payload) => {
  console.log(token);
  return await api
    .assignStatement(token, payload)
    .then((data) => {
      Toast.show({
        type: "success",
        text1: "Statement assigned successfully",
      });
    })
    .catch((err) => {
      console.log(err.response.data);
      // Toast.show({
      //     type: 'error',
      //     text1: 'Failed to assign commmitment'
      // })
    });
};

export const getAssignedCommitments = (token) => {
  return (dispatch) => {
    dispatch({ type: "COMMITMENT_LIST_LOAD" });
    return api
      .getCommitments(token)
      .then((data) => {
        console.log(data);
        dispatch({ type: "COMMITMENT_LIST_SUCCESS", payload: data });
      })
      .catch((err) => {
        console.log(err.response.data);
        dispatch({ type: "COMMITMENT_LIST_FAIL" });
        Toast.show({
          type: "error",
          text1: "Failed to fetch data",
        });
      });
  };
};

export const completeCommitment = (token, id, setStep, setCurrentTask) => {
  return (dispatch) => {
    return api
      .completeCommitment(token, id)
      .then((data) => {
        Toast.show({
          type: "success",
          text1: "Commitment completed successfully",
        });
        dispatch(getAssignedCommitments(token));
        setStep(0);
        setCurrentTask(null);
      })
      .catch((err) => {
        console.log(err.response.data, "Commitment Page");
        Toast.show({
          type: "error",
          text1: "Failed to complete commmitment",
        });
      });
  };
};
