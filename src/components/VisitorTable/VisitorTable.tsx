import React, { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Chip,
} from "@mui/material";
import { Visitor } from "../../types/interfaces";

interface VisitorTableProps {
  visitors: Visitor[];
  selectedVisitors: string[];
  toggleVisitorSelection: (email: string) => void;
}

const getDepartmentColor = (department: string) => {
  switch (department) {
    case "marketing":
      return "success";
    case "it":
      return "secondary";
    case "sales":
      return "info";
    case "management":
      return "warning";
    default:
      return "default";
  }
};

const VisitorTable: React.FC<VisitorTableProps> = ({
  visitors,
  selectedVisitors,
  toggleVisitorSelection,
}) => {
  const handleSelect = (email: string) => {
    toggleVisitorSelection(email);
  };

  // TODO: fix bug with partial selection
  const handleSelectAll = () => {
    visitors.forEach((visitor) => {
      if (visitor) toggleVisitorSelection(visitor.email);
    });
  };

  const isAllSelected = useMemo(() => {
    return selectedVisitors.length === visitors.length;
  }, [selectedVisitors, visitors]);

  const isSelected = useMemo(
    () => (email: string) => selectedVisitors.includes(email),
    [selectedVisitors]
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 550 }} aria-label="visitor table">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                checked={isAllSelected}
                onChange={handleSelectAll}
              />
            </TableCell>
            <TableCell>Visitor</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align="right">Department</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {visitors.map((visitor) => (
            <TableRow
              key={visitor.email}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={isSelected(visitor.email)}
                  onChange={() => handleSelect(visitor.email)}
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {visitor.name}
              </TableCell>
              <TableCell>{visitor.email}</TableCell>
              <TableCell align="right">
                <Chip
                  color={getDepartmentColor(visitor?.department)}
                  label={visitor.department.toUpperCase()}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VisitorTable;
