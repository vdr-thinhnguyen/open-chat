import React, { useCallback } from "react";
import styled from "styled-components";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import { IconButton } from "@material-ui/core";
import clsx from "clsx";
import { colors, breakpoint } from "@/utils";
import { useSelector, useDispatch } from "react-redux";
import { IRootReducer } from "@/types";
import { setConversationActive } from "@redux/slices/root";

interface ISidebar {
  open: boolean;
  onToggle: (open: boolean) => void;
  onAddConversation: () => void;
  onSelect: (uuid: string) => void;
}

const Navbar = styled.nav`
  height: 50px;
  width: 50px;
  position: fixed;
  top: 0.5rem;
  left: 0.5rem;
  button {
    border: 1px solid ${colors.secondaryGrey};
    border-radius: 4px;
    padding: 0.125rem;
    background-color: ${colors.navbar};
    svg path {
      fill: ${colors.white};
    }

    &:hover {
      background-color: ${colors.white};
      svg path {
        fill: ${colors.navbar};
      }
    }
  }

  ${breakpoint("md")`
    top: 1rem;
    left: 1rem;

    button {
      padding: 0.25rem;
    }
  `}
`;

const NavMenu = styled.div`
  background-color: ${colors.navbar};
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: -100%;
  transition: 400ms;
  z-index: 2;

  &.active {
    left: 0;
    transition: 350ms;
  }

  ${breakpoint("md")`
    width: 250px;
  `}
`;

const NavText = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 8px 0 8px 16px;
  list-style: none;
  height: 60px;

  > div {
    color: #f5f5f5;
    font-size: 1rem;
    width: 95%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 16px;
    border-radius: 4px;

    &.active {
      background-color: ${colors.gray};
    }

    &:hover {
      background-color: ${colors.darkGrey};
    }
  }
`;

const ItemsWrapper = styled.ul`
  width: 100%;
  padding: 0;
`;

const NavbarToggle = styled.li`
  background-color: ${colors.navbar};
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    margin-right: 1.5rem;
    path {
      fill: ${colors.white};
    }
  }
`;

const Button = styled(NavText)`
  background-color: ${colors.gray};
  border: 1px solid ${colors.white};
  color: ${colors.white};
  cursor: pointer;
  width: 65%;
  padding: 0.375rem 1rem;
  height: auto;
  border-radius: 4px;
  margin-left: 0.5rem;

  svg {
    margin-right: 0.5rem;
  }
`;

const CloseIconWrapper = styled(IconButton)`
  svg {
    margin-right: 0;
    padding: 0.375rem;
    border-radius: 4px;
    border: 1px solid ${colors.white};
  }
`;

const Sidebar: React.FC<ISidebar> = ({
  open,
  onToggle,
  onAddConversation,
  onSelect,
}) => {
  const showSidebar = () => onToggle(!open);
  const conversations = useSelector(
    (state: IRootReducer) => state?.conversations
  );
  const conversationActive = useSelector(
    (state: IRootReducer) => state?.conversationActive
  );
  const dispatch = useDispatch();

  return (
    <>
      <Navbar>
        <IconButton onClick={showSidebar}>
          <MenuIcon />
        </IconButton>
      </Navbar>
      <NavMenu className={clsx("nav-menu", { active: open })}>
        <ItemsWrapper>
          <NavbarToggle>
            <Button onClick={onAddConversation}>
              <AddIcon />
              <span>New chat</span>
            </Button>
            <CloseIconWrapper onClick={showSidebar}>
              <CloseIcon />
            </CloseIconWrapper>
          </NavbarToggle>

          {conversations?.length > 0 &&
            conversations.map((item) => {
              return (
                <NavText key={item.uuid}>
                  <div
                    className={clsx({
                      active: item.uuid === conversationActive,
                    })}
                    onClick={() => onSelect(item.uuid)}
                  >
                    {item?.title}
                  </div>
                </NavText>
              );
            })}
        </ItemsWrapper>
      </NavMenu>
    </>
  );
};

export default Sidebar;
