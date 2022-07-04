import axios from "axios";
import { useEffect, useState } from "react";

const Climate = (url) => {
  const [Api, setApi] = useState({});
  useEffect(() => {
    axios.get(url)
    .then(res => setApi(res.data))
    .catch(error => console.log(error))
  });
  return [Api];
};

export default Climate;