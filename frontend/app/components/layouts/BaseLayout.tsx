import styled from "styled-components";
import Header from "../base/Header";

interface Props {
  children?: React.ReactNode
}

export default function BaseLayout({
  children
}: Props) {
  return (
   <Block>
      <Header title="Aryshi" />
      <Content>{children}</Content>
   </Block>
  );
}

const Block = styled.div`
  margin: 0;
  padding: 0;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`