import styled from "@emotion/styled";
import Select from 'react-select'


export const SingleSelectBlock = styled(Select)`
  width: 15vw;
  color: rgba(0, 0, 0, 0.85);
  z-index: 30;

  &:hover {
    border-color: #70e0a8;
  }
  &:focus {
    border-color: #70e0a8;
    border-right-width: 1px !important;
    outline: 0;
    box-shadow: 0 0 0 2px rgba(95, 228, 161, 0.2);
  }

  &:active {
    border-color: #70e0a8;
    border-right-width: 1px !important;
    outline: 0;
    box-shadow: 0 0 0 2px rgba(95, 228, 161, 0.2);
  }

`;

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const SingleSelect = () => (
  <SingleSelectBlock options={options} />
)

export default SingleSelect;