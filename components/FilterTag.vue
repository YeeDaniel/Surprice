<template>
  <div
    @click="toggle"
    :class="[
      'cursor-pointer rounded-full border px-3 py-1 text-sm font-bold',
      isSelected
        ? 'bg-green-500 text-white border-green-500'
        : 'text-dark-txt border-border',
    ]"
  >
    {{ label }}
  </div>
</template>

<script setup>
const props = defineProps({
  label: String,
  selected: Array,
});

const emit = defineEmits(["update:selected"]);

const isSelected = computed(() => props.selected.includes(props.label));

const toggle = () => {
  const newValue = isSelected.value
    ? props.selected.filter((item) => item !== props.label)
    : [...props.selected, props.label];
  emit("update:selected", newValue);
};
</script>
