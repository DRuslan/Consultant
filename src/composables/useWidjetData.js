import { ref, onMounted } from 'vue';

export default function useWidjet() {
  const widjet = ref(null);

  onMounted(() => {
    widjet.value = $widjet();
  });

  return { widjet };
}