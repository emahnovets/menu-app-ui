import styled from 'styled-components';

export const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(256px, 1fr));
  grid-auto-rows: fit-content(256px);
  grid-gap: 16px;

  padding: 16px;
`;
