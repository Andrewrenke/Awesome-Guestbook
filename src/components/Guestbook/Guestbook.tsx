import { useState, useEffect, useCallback } from "react";
import { Grid, Button } from "@mui/material";
import VisitorForm from "../VisitorForm/VisitorForm";
import VisitorTable from "../VisitorTable/VisitorTable";
import { Visitor } from "../../types/interfaces";
import DeleteIcon from "@mui/icons-material/Delete";

const Guestbook = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [selectedVisitors, setSelectedVisitors] = useState<string[]>([]);

  useEffect(() => {
    const init = async () => {
      try {
        const storedVisitors = localStorage.getItem("visitors");
        if (storedVisitors) {
          setVisitors(JSON.parse(storedVisitors));
        }
      } catch (e) {
        console.error(`Error loading visitors from local storage: \n ${e}`);
      }
    };

    init();
  }, []);

  const handleAddVisitor = useCallback(
    (newVisitor: Visitor) => {
      if (visitors.some((visitor) => visitor.email === newVisitor.email)) {
        alert("A visitor with this email already exists.");
        return;
      }

      const updatedVisitors = [...visitors, newVisitor];
      setVisitors(updatedVisitors);
      localStorage.setItem("visitors", JSON.stringify(updatedVisitors));
    },
    [visitors]
  );

  const handleRemoveSelectedVisitors = useCallback(() => {
    const updatedVisitors = visitors.filter(
      (visitor) => !selectedVisitors.includes(visitor.email)
    );
    setVisitors(updatedVisitors);
    setSelectedVisitors([]);
    localStorage.setItem("visitors", JSON.stringify(updatedVisitors));
  }, [selectedVisitors, visitors]);

  const toggleVisitorSelection = useCallback((email: string) => {
    setSelectedVisitors((prevSelectedVisitors) =>
      prevSelectedVisitors.includes(email)
        ? prevSelectedVisitors.filter((e) => e !== email)
        : [...prevSelectedVisitors, email]
    );
  }, []);

  return (
    <Grid container spacing={2} p={2}>
      <Grid item xs={12} md={4}>
        <VisitorForm onSubmit={handleAddVisitor} />
      </Grid>
      <Grid item xs={12} md={8}>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleRemoveSelectedVisitors}
          sx={{ mb: 2 }}
          disabled={selectedVisitors.length <= 0}
        >
          Remove Selected Visitors
        </Button>
        <VisitorTable
          visitors={visitors}
          selectedVisitors={selectedVisitors}
          toggleVisitorSelection={toggleVisitorSelection}
        />
      </Grid>
    </Grid>
  );
};

export default Guestbook;
