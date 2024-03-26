import { Box, Typography} from "@mui/material";
import { Link } from "react-router-dom";
import { StationType } from "../../types";

const Station: React.FC<StationType> = ({ id, name, lineId }) => {
  return (
    <Link style={{ color: "unset" }} to={`/line/${lineId}/station/${id}`}>
      <Box>
        <Typography variant="body2">{name}</Typography>
      </Box>
    </Link>
  );
};

export default Station;
