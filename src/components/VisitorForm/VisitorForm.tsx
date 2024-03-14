import React, { useRef, useState } from "react";
import {
  Paper,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import Restore from "@mui/icons-material/Restore";
import Person from "@mui/icons-material/Person";
import { Visitor } from "../../types/interfaces";

interface VisitorFormProps {
  onSubmit: (visitor: Visitor) => void;
}

const VisitorForm: React.FC<VisitorFormProps> = ({ onSubmit }) => {
  const [resetKey, setResetKey] = useState<number>(0);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const departmentRef = useRef<HTMLSelectElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newVisitor = {
      name: nameRef.current?.value ?? "",
      email: emailRef.current?.value ?? "",
      department: departmentRef.current?.value ?? "marketing",
      consent: consentRef.current?.checked ?? false,
    };

    if (newVisitor.consent && newVisitor.email) {
      onSubmit(newVisitor);
      handleReset();
    }
  };

  const handleReset = () => {
    if (nameRef.current) nameRef.current.value = "";
    if (emailRef.current) emailRef.current.value = "";
    if (departmentRef.current) departmentRef.current.value = "marketing";
    if (consentRef.current) consentRef.current.checked = false;

    setResetKey((prevKey) => prevKey + 1);
  };

  return (
    <Paper elevation={2}>
      <Box p={2} component="form" onSubmit={handleSubmit}>
        <Typography variant="h6">Add new visitor</Typography>
        <Typography variant="subtitle2">
          Fill name, email address and the department
        </Typography>
        <TextField
          label="Full Name"
          name="name"
          inputRef={nameRef}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email Address"
          name="email"
          type="email"
          inputRef={emailRef}
          fullWidth
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="department-label">Department</InputLabel>
          <Select
            key={resetKey}
            labelId="department-label"
            name="department"
            inputRef={departmentRef}
            label="Department"
            defaultValue="marketing"
          >
            <MenuItem value="marketing">Marketing</MenuItem>
            <MenuItem value="it">IT</MenuItem>
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem value="management">Management</MenuItem>
          </Select>
        </FormControl>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                key={resetKey}
                name="consent"
                color="primary"
                inputRef={consentRef}
                required
              />
            }
            label="I agree to be added to the table"
          />
        </FormGroup>
        <Box display="flex" flexShrink={1} gap={2}>
          <Button
            startIcon={<Restore />}
            variant="outlined"
            size="large"
            sx={{ borderRadius: 10 }}
            onClick={handleReset}
          >
            Reset Form
          </Button>
          <Button
            startIcon={<Person />}
            type="submit"
            variant="contained"
            size="large"
            sx={{ borderRadius: 10 }}
          >
            Add New Visitor
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default VisitorForm;
