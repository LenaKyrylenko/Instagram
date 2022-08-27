import { Input } from 'antd'

export const CustomInput = ({ state, onChangeText, checked }) => (
    <Input
      className="Input"
      value={state}
      placeholder={state || ''}
    onChange={onChangeText}
    type={checked ? 'password':'text'}

  />
  )