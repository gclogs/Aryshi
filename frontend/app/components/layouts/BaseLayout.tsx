import styled from "styled-components";
import Header from "../base/Header";

interface Props {
  title?: React.ReactNode
  children?: React.ReactNode
  isHeaderVisible?: boolean
}

export default function BaseLayout({
  children,
  title,
  isHeaderVisible
}: Props) {
  return (
    <Header title={title} />
  );
}