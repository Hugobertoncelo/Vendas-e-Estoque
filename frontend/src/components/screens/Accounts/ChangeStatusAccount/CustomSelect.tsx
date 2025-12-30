import { styled } from "@mui/system";
import {
  inputLabelClasses,
  outlinedInputClasses,
  TextField,
} from "@mui/material";

export const CustomSelect = styled(TextField)({
  [`& .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
    borderRadius: "10px",
    borderColor: "transparent",
    color: "#ffffff",
  },
  [`& .Mui-error .${outlinedInputClasses.notchedOutline}`]: {
    borderRadius: "0.7rem",
    border: "transparent",
  },
  [`&:hover .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]:
    {
      borderColor: "transparent",
    },
  [`&:hover .Mui-error .${outlinedInputClasses.notchedOutline}`]: {
    borderColor: "#ff2222",
  },
  [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
    {},
  [`& .${outlinedInputClasses.input} `]: {
    color: "#ffffff",
  },
  [`&:hover .${outlinedInputClasses.input}`]: {
    color: "#ffffff",
  },
  [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.input}`]:
    {
      color: "#ffffff",
    },
  [`& .${inputLabelClasses.outlined}`]: {
    color: "#ffffff",
  },
  [`& .Mui-error`]: {
    color: "#ff4646",
  },
  [`& .Mui-error .MuiSelect-icon`]: {
    color: "#ff4646",
  },
  [`& .${inputLabelClasses.outlined}.${inputLabelClasses.focused}`]: {
    color: "#ff6600",
  },
});
