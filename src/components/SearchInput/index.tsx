import React, { useCallback } from "react";
import {
  TextField as MuiSearchInput,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import styled from "styled-components";
import clsx from "clsx";
import { colors } from "@/utils";
import { use } from "chai";

interface ISearchInput {
  placeholder?: string;
  value: string;
  onChange?: (value: string) => void;
  onSubmit: () => void;
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;

  .send-icon {
    path {
      fill: ${colors.green};
    }
    &.disabled {
      path {
        fill: ${colors.grey} !important;
      }
    }
  }
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: ${colors.darkGrey};
    border-width: 1px;
  }
  .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
    border-color: ${colors.darkGrey};
  }
`;

const SearchInput: React.FC<ISearchInput> = ({
  placeholder,
  value,
  onChange,
  onSubmit,
}) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value),
    [onChange]
  );

  const handleKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onSubmit();
      }
    },
    [onSubmit]
  );
  return (
    <Wrapper>
      <MuiSearchInput
        variant="outlined"
        onChange={handleChange}
        placeholder={placeholder}
        fullWidth
        value={value}
        onKeyUp={handleKeyUp}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <IconButton disabled={!value} onClick={onSubmit}>
                <SendIcon className={clsx("send-icon", { disabled: !value })} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Wrapper>
  );
};

export default SearchInput;
