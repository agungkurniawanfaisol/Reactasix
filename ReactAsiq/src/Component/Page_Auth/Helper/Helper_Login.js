import axios from 'axios';

const Helper_Login = async props => {
  try {
    console.log(props);
    let response = await axios.post(
      'https://api.rsudsidoarjo.co.id/rest_dashboard/login',
      props,
    );

    // console.log(response.data.status);

    return response;
  } catch (e) {
    console.log(e);
  }
};

export default Helper_Login;
