import { Favorite } from "@mui/icons-material";
import { AppBar, Box, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar
      sx={{ p: 2, height: "64px", display: "flex", justifyContent: "center" }}
      position="sticky"
    >
      <Box display="flex" alignItems="center" gap={1}>
        <Favorite />
        <Typography variant="h6" fontWeight={500}>
          Awesome Guestbook
        </Typography>
      </Box>
    </AppBar>
  );
};

export default Header;
