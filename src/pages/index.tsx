import React, { useState, useCallback, useEffect } from "react";
import styled, { css } from "styled-components";
import SearchInput from "@/components/SearchInput";
import { IMessage, IConversation, IRootReducer } from "@/types";
import { Configuration, OpenAIApi } from "openai";
import Head from "next/head";
import Image from "next/image";
import DotLoading from "@/components/DotLoading";
import {
  colors,
  breakpoint,
  useResponsive,
  uuidV4,
  updateConversationByUuid,
} from "@/utils";
import useScrollToBottom from "@/hooks/useScrollToBottom";
import Sidebar from "@/components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  updateConversation,
  setConversationActive,
  setMenuOpen,
} from "@redux/slices/root";

const Container = styled.div<{ isMenuOpen: boolean }>`
  width: 100%;
  text-align: center;
  overflow-x: auto;
  max-height: calc(100vh - 6.5rem);

  ${breakpoint("lg")`
    max-height: calc(100vh - 12rem);
  `}

  ${({ isMenuOpen }) =>
    isMenuOpen && `width: calc(100% - 250px); float: right;`}
`;

const Title = styled.h1`
  font-size: 1.25rem;
  line-height: 1.5rem;
  text-align: center;
  color: #4d2b15;
  margin: 0;

  ${breakpoint("md")`
    font-size: 2rem;
    line-height: 2.5rem;
  `};
`;
const Result = styled.div``;

const InputWrapper = styled.div<{ isMenuOpen: boolean }>`
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  width: calc(100% - 2rem);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  ${breakpoint("md")`
    left: 2rem;
    bottom: 4rem;
    width: calc(100% - 4rem);
  `}

  ${({ isMenuOpen }) =>
    isMenuOpen &&
    css`
      ${breakpoint("md")`
      width: calc(100% - 250px - 2rem);
      left: calc(250px + 1rem);
   
  `}
    `}
`;

const Row = styled.div`
  text-align: left;
  padding: 1rem 2.5rem;
  display: flex;
  align-items: center;

  span {
    margin-left: 1rem;
  }

  ${breakpoint("md")`
    padding: 1.25rem 6rem;
  `}

  &:first-child {
    border-top: none;
  }

  &:nth-child(even) {
    background-color: ${colors.lighterGrey};
  }

  &:nth-child(odd) {
    background-color: ${colors.white};
    border-top: 1px solid ${colors.secondaryGrey};
    border-bottom: 1px solid ${colors.secondaryGrey};
  }
`;

const HomePage = () => {
  const conversations = useSelector(
    (state: IRootReducer) => state?.conversations
  );
  const conversationActive = useSelector(
    (state: IRootReducer) => state?.conversationActive
  );
  const menuOpen = useSelector((state: IRootReducer) => state?.menuOpen);

  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(menuOpen);
  const [currUuid, setCurrUuid] = useState(conversationActive || "");
  const [isNewChat, setIsNewChat] = useState(false);

  const scrollRef = useScrollToBottom(messages);

  const isDesktop = useResponsive({ breakpoint: "md" });

  const dispatch = useDispatch();

  useEffect(() => {
    if (conversations?.length > 0) {
      if (conversationActive) {
        const selectedConversation = conversations.find(
          (e) => e.uuid === conversationActive
        );
        if (selectedConversation) {
          setMessages(selectedConversation?.messages);
        } else {
          setMessages(conversations[conversations.length - 1]?.messages);
        }
        setCurrUuid(conversationActive);
      }
    }
  }, [conversationActive]);

  const onSelect = useCallback((uuid: string) => {
    dispatch(setConversationActive(uuid));
    setIsMenuOpen(false);
  }, []);

  const handleSubmit = async () => {
    try {
      const configuration = new Configuration({
        apiKey: process.env.NEXT_PUBLIC_OPEN_AI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);

      const newResponse = [
        ...(messages || []),
        { isPerson: true, content: prompt },
      ];
      let uuid = currUuid || "";
      let payload: IConversation[] = [];
      if (!currUuid) {
        uuid = uuidV4();
        setCurrUuid(uuid);
        dispatch(setConversationActive(uuid));
      }
      const cloned = [...conversations];
      let updatedData = updateConversationByUuid(cloned, uuid, {
        uuid,
        title: prompt,
        messages: newResponse,
      });

      payload = [
        ...(cloned || []),
        {
          uuid,
          title: prompt,
          messages: newResponse,
        },
      ];
      if (updatedData.length) {
        if (isNewChat) {
          setIsNewChat(false);
        } else {
          payload = [...updatedData];
        }
      }
      dispatch(updateConversation(payload));
      setPrompt("");
      setMessages(newResponse);

      setLoading(true);
      const res = await openai.createCompletion({
        model: process.env.NEXT_PUBLIC_OPEN_AI_API_MODEL!,
        prompt: prompt,
      });
      const result = res?.data?.choices?.[0]?.text || "";
      const newMessages = [
        ...newResponse,
        { isPerson: false, content: result },
      ];
      let updatedConversation = updateConversationByUuid([...payload], uuid, {
        uuid,
        title: prompt,
        messages: newMessages,
      });

      dispatch(updateConversation(updatedConversation));

      setMessages(newMessages);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleChange = (value: string) => {
    setPrompt(value);
  };

  const handleAddConversation = useCallback(() => {
    setCurrUuid("");
    setIsNewChat(true);
    setPrompt("");
    setMessages([]);
  }, []);

  const onToggleMenu = useCallback((status: boolean) => {
    dispatch(setMenuOpen(status));
    setIsMenuOpen(status);
  }, []);

  return (
    <>
      <Head>
        <title>Open chat</title>
        <meta name="description" content="Open chat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo_2.png" />
      </Head>
      <Sidebar
        open={isMenuOpen}
        onToggle={onToggleMenu}
        onAddConversation={handleAddConversation}
        onSelect={onSelect}
      />
      {!!(!isMenuOpen && !isDesktop) || isDesktop ? (
        <Container ref={scrollRef} isMenuOpen={isMenuOpen}>
          {!messages?.length && (
            <>
              <Image
                src="/logo.webp"
                alt="Open chat logo"
                width={200}
                height={200}
                priority
              />
              <Title>Welcome to Open AI Chat</Title>
            </>
          )}

          <Result>
            {messages?.length > 0 &&
              messages.map((item, i) => (
                <Row key={i}>
                  <Image
                    src={item?.isPerson ? "/person.png" : "/logo_2.png"}
                    alt="Open chat logo"
                    width={30}
                    height={30}
                    priority
                  />
                  <span>{item.content}</span>
                </Row>
              ))}
          </Result>
          {loading && <DotLoading />}
          <InputWrapper isMenuOpen={isMenuOpen}>
            <SearchInput
              onChange={handleChange}
              onSubmit={handleSubmit}
              placeholder="Send a message"
              value={prompt}
            />
          </InputWrapper>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
};

export default HomePage;
