import css from "./Loader.module.css";
import { InfinitySpin } from 'react-loader-spinner';

export default function Loader() {
    return (
     <div><InfinitySpin
  visible={true}
  width="200"
  color="blueviolet"
  ariaLabel="infinity-spin-loading"
  />
</div>   
  
    )
};