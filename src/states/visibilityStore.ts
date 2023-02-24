import { reactive } from "vue";

const state = reactive({
  visible: false,
});

const visible = ref(state.visible);

const handleChange = () => {
  state.visible = !state.visible;
  visible.value = state.visible;
};

export { visible, handleChange };
