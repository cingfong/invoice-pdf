import { ref, Ref } from "vue";

const useToggle = (): [Ref<boolean>, (val?: boolean) => void] => {

  const _value: Ref<boolean> = ref(false)

  const _toggle = (val?: boolean): void => {
    if (val !== undefined) {
      _value.value = val
    } else {
      _value.value = !_value.value
    }
  }

  return [_value, _toggle]
}


export { useToggle };