import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const MapLocation = () => {
  const [showMap, setShowMap] = useState(false);

  const toggleMap = () => {
    setShowMap(!showMap);
  };

  return (
    <li>
      <FontAwesomeIcon
        icon={faLocationDot}
        className="text-[1.2em] cursor-pointer"
        onClick={toggleMap}
      />
      {showMap && (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.0402833216735!2d-0.174341626179086!3d5.561048033601333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9075eb829889%3A0xa7f9f58d8a417bf6!2sPlot%207!5e0!3m2!1sen!2sgh!4v1729344153096!5m2!1sen!2sgh"
          width="200"
          height="250"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      )}
    </li>
  );
};

export default MapLocation;
