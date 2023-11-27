import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleNotch} from "@fortawesome/free-solid-svg-icons";

<i class="fa-solid fa-circle-notch"></i>;

export const LoadingSpinner = ({hidden, color}) => {
  return (
    <div className={`inline ${hidden ? "hidden" : ""}`}>
      <FontAwesomeIcon
        className={`${!color ? "" : color} animate-spin`}
        icon={faCircleNotch}></FontAwesomeIcon>
    </div>
  );
};

export default LoadingSpinner;