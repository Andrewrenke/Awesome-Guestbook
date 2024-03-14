import { ThemeProvider } from "@mui/material";
import theme from "./utils/theme";
import Guestbook from "./components/Guestbook/Guestbook";
import Header from "./components/Header/Header";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Guestbook />
    </ThemeProvider>
  );
}

export default App;
