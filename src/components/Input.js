export const Input = ({ state, onChangeText }) => (
    <input
      className="Input"
      value={state}
      placeholder={state || ''}
      onChange={onChangeText}
    />
  )