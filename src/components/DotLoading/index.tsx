import React from "react";
import styled, { css } from "styled-components";
import { colors } from "@/utils";

interface DotLoading {}

const LoadingStyles = css`
  .dot-collision {
    position: relative;
    width: 9px;
    height: 9px;
    border-radius: 5px;
    background-color: ${colors.green};
    color: ${colors.green};
  }
  .dot-collision::before,
  .dot-collision::after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
  }
  .dot-collision::before {
    left: -9px;
    width: 9px;
    height: 9px;
    border-radius: 5px;
    background-color: ${colors.green};
    color: ${colors.green};
    animation: dot-collision-before 2s infinite ease-in;
  }
  .dot-collision::after {
    left: 9px;
    width: 9px;
    height: 9px;
    border-radius: 5px;
    background-color: ${colors.green};
    color: ${colors.green};
    animation: dot-collision-after 2s infinite ease-in;
    animation-delay: 1s;
  }

  @keyframes dot-collision-before {
    0%,
    50%,
    75%,
    100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-15px);
    }
  }
  @keyframes dot-collision-after {
    0%,
    50%,
    75%,
    100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(15px);
    }
  }
`;

const Cointainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1rem 0;
  ${LoadingStyles};
`;

const DotLoading = () => {
  return (
    <Cointainer>
      <div className="dot-collision" />
    </Cointainer>
  );
};

export default DotLoading;
