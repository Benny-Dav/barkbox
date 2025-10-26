import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const ClickToCall = () => {

  return (
    <a href="tel:+233595742231">
        <li className="text-[1.3em]"><FontAwesomeIcon icon={faPhone} className="text-[1.2em] cursor-pointer" /></li></a>
  )
}
export default ClickToCall;