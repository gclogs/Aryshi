import { styled } from '@stitches/react';
import color from '~/lib/color';

interface Props {
  title?: string
}

export default function Header({
  title,
}: Props) {
  return (
    <Block>
      <Title title={title}/> 
    </Block>
  )
}

const Block = styled('header', {
  position: 'relative',
  height: '56px',
  borderBottom: `1px solid ${color.bottom}`,
  paddingLeft: '16px',
  paddingRight: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '2rem',
})

const Title = styled('div', {
  color: `${color.black}`,
  fontSize: '18px',
  fontWeight: '600'
})