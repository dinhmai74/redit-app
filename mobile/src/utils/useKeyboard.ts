export const useKeyboard = () => {
  useEffect(() => {
    Keyboard.addListener("keyboardWillShow", handleKeyboardWillShow)
    Keyboard.addListener("keyboardDidShow", handleKeyboardDidShow)
    Keyboard.addListener("keyboardWillHide", handleKeyboardWillHide)
    Keyboard.addListener("keyboardDidHide", handleKeyboardDidHide)

    return () => {
      Keyboard.removeListener("keyboardWillShow", handleKeyboardWillShow)
      Keyboard.removeListener("keyboardDidShow", handleKeyboardDidShow)
      Keyboard.removeListener("keyboardWillHide", handleKeyboardWillHide)
      Keyboard.removeListener("keyboardDidHide", handleKeyboardDidHide)
      animatedKeyboardHeight.stopAnimation()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
