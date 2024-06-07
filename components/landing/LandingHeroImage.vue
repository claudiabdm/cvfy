<script lang="ts" setup>
const IMAGES = [
  '/cv-screenshot-one-col-eliot.png',
  '/cv-screenshot-two-col.png',
  '/cv-screenshot-one-col-les.png',
]
</script>

<template>
  <div class="flex items-center relative w-full sm:w-3/5">
    <div
      v-for="url in IMAGES"
      :key="url"
      class="cv-example"
    >
      <NuxtImg
        width="908"
        height="1269"
        alt="CV example"
        format="webp"
        sizes="100px md:250px"
        :src="url"
        loading="eager"
        preload
      />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.cv-example {
    &:nth-child(1) {
        animation: cvExample1 8s cubic-bezier(0.65, 0.05, 0.36, 1) both infinite;
    }

    &:nth-child(2) {
        animation: cvExample2 8s cubic-bezier(0.65, 0.05, 0.36, 1) both infinite;
    }

    &:nth-child(3) {
        animation: cvExample3 8s cubic-bezier(0.65, 0.05, 0.36, 1) both infinite;
    }
}

@keyframes cvExample1 {
    0% {
        transform: translate3d(0, 0, 0) scale(0.8);
        box-shadow: 0 4px 6px -1px rgb(0, 0, 0, 0.1);
        z-index: 1;
    }

    32% {
        transform: translate3d(100%, -2%, 0) scale(1);
        box-shadow: 0 20px 25px -5px rgb(0, 0, 0, 0.1);
        z-index: 10;
    }

    68% {
        transform: translate3d(200%, 0, 0) scale(0.8);
        box-shadow: 0 4px 6px -1px rgb(0, 0, 0, 0.1);
        z-index: 1;
    }

    100% {
        transform: translate3d(0, 0, 0) scale(0.8);
        box-shadow: 0 4px 6px -1px rgb(0, 0, 0, 0.1);
        z-index: 1;
    }
}

@keyframes cvExample2 {
    0% {
        transform: translate3d(0, -2%, 0) scale(1);
        box-shadow: 0 20px 25px -5px rgb(0, 0, 0, 0.1);
        z-index: 10;
    }

    32% {
        transform: translate3d(100%, 0, 0) scale(0.8);
        box-shadow: 0 4px 6px -1px rgb(0, 0, 0, 0.1);
        z-index: 1;
    }

    68% {
        transform: translate3d(-100%, 0, 0) scale(0.8);
        box-shadow: 0 4px 6px -1px rgb(0, 0, 0, 0.1);
        z-index: 1;
    }

    100% {
        transform: translate3d(0, -2%, 0) scale(1);
        box-shadow: 0 20px 25px -5px rgb(0, 0, 0, 0.1);
        z-index: 10;
    }
}

@keyframes cvExample3 {
    0% {
        transform: translate3d(0, 0, 0) scale(0.8);
        box-shadow: 0 4px 6px -1px rgb(0, 0, 0, 0.1);
        z-index: 1;
    }

    32% {
        transform: translate3d(-200%, 0, 0) scale(0.8);
        box-shadow: 0 4px 6px -1px rgb(0, 0, 0, 0.1);
        z-index: 1;
    }

    68% {
        transform: translate3d(-100%, -2%, 0) scale(1);
        box-shadow: 0 20px 25px -5px rgb(0, 0, 0, 0.1);
        z-index: 10;
    }

    100% {
        transform: translate3d(0, 0, 0) scale(0.8);
        box-shadow: 0 4px 6px -1px rgb(0, 0, 0, 0.1);
        z-index: 1;
    }
}
</style>
