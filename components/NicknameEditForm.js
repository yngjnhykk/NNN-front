import { Form, Input } from 'antd';
import styled from 'styled-components';

function NicknameEditForm() {
  return (
    <InputWrapper>
      <Input.Search addonBefore='닉네임' enterButton='수정'></Input.Search>
    </InputWrapper>
  );
}

export default NicknameEditForm;

const InputWrapper = styled(Form)`
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  padding: 20px;
`;
