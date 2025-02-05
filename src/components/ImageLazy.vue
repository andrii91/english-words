<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, ref, watch } from "vue";

const emit = defineEmits(["loaded", "error"]);

const props = defineProps({
  alt: {
    type: String,
    default: "",
  },
  src: {
    type: String,
    default: "",
  },
  populating: {
    type: Boolean,
    default: false,
  },
  populatingClass: {
    type: String,
    default: "",
  },
  cover: {
    type: Boolean,
    default: true,
  },
});

const image = ref({} as HTMLImageElement);
const imgSrc = ref("");
const imgError = ref(false);
const loaded = ref(false);
const instance = ref();
const elementObserverRef = ref();

const objectFitClass = computed(() => {
  return {
    "object-cover": props.cover,
    "object-contain": !props.cover,
  };
});
const loadedClass = computed(() => {
  return {
    "lazy-image-loaded": loaded.value && !props.populating,
  };
});
const expandClass = computed(() => {
  return {
    "lazy-image-expand": props.populating || imgError.value,
  };
});

onMounted(() => {
  instance.value = getCurrentInstance();
  populatingData();
});

async function populatingData() {
  loaded.value = false;
  if (!window["IntersectionObserver"]) {
    await loadImage();
  } else {
    createObserver();
  }
}

function createObserver() {
  const observer = new IntersectionObserver(
    (intersectionEntry) => {
      intersectionEntry.forEach(({ isIntersecting }) => {
        if (isIntersecting && !loaded.value) {
          loadImage();
        }
      });
    },
    {
      root: null,
      threshold: 0,
    },
  );
  observer.observe(elementObserverRef.value);
}

function error(
  message = "The name of the image is missing",
  event?: string | Event,
) {
  imgError.value = true;
  emit("error");
  const componentName = instance.value.$parent?.$parent?.$options.name;
  if (event instanceof Event) {
    throw new Error(
      `${message} ....error route: ${componentName} (${event.type})`,
    );
  }
  throw new Error(`${message} ....error route: ${componentName}`);
}

async function loadImage() {
  //Only load the image if the src is defined.
  if (props.src !== undefined && props.src !== "") {
    imgError.value = false;
    image.value = new Image();
    image.value.onload = () => {
      loaded.value = true;
    };
    image.value.onerror = (event) => {
      error(`The image ${props.src} could not be loaded`, event);
    };
    image.value.src = props.src;

    imgSrc.value = image.value.src;
    emit("loaded");
  }
}

watch(
  () => props.src,
  (newSrc, oldSrc) => {
    if (oldSrc === undefined && newSrc === "" && !props.populating) {
      error(`The image path is invalid`);
    }
    if (oldSrc !== newSrc) {
      loaded.value = false;
      loadImage();
    }
  },
);

defineExpose({
  imgSrc,
  imgError,
  loaded,
  image,
});
</script>

<template>
  <div
    ref="elementObserverRef"
    class="lazy-image"
    :class="[expandClass, { 'lazy-image-loaded': !loaded || populating }]"
  >
    <div
      v-if="(!loaded || populating) && !imgError"
      :class="['lazy-image-skeleton', populatingClass]"
    />
    <div
      v-else-if="(loaded || !populating) && imgError"
      class="lazy-image-error"
    >
      <slot name="errorSlot"> Error image </slot>
    </div>
    <img
      v-else
      :src="imgSrc"
      :class="['lazy-image-img', objectFitClass, loadedClass]"
      :alt="alt"
      draggable="false"
    />
  </div>
</template>

<style lang="scss" scoped>
.lazy-image {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &-expand {
    width: 100%;
    height: 100%;
  }

  &-skeleton {
    height: 100%;
    width: 100%;
    display: block;
    background-color: #e5e7eb;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  &-error {
    height: 100%;
    max-height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #e5e7eb;

    &__span {
      height: 2.5rem;
      width: 2.5rem;
      color: #9ca3af;
      margin-left: auto;
      margin-right: auto;
      display: block;
    }
  }

  &-img {
    transition: all 0.3s ease-in;
    transition-delay: 0.3s;
    aspect-ratio: auto;
    height: 100%;
    max-height: 100%;
    width: 100%;
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
