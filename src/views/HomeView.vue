<!-- eslint-disable vue/component-name-in-template-casing -->
<template>
<div>
  <vue-particles
    id="tsparticles"
    :options="{
      background: {
        color: {
          value: '#111111'
        }
      },
      fpsLimit: 60,
      interactivity: {
        detectsOn: 'canvas',
        events: {
          onClick: {
            enable: true,
            mode: 'push'
          },
          onHover: {
            enable: true,
            mode: 'repulse'
          },
          resize: true
        },
        modes: {
          bubble: {
            distance: 400,
            duration: 2,
            opacity: 0.8,
            size: 40,
            speed: 3
          },
          push: {
            quantity: 4
          },
          repulse: {
            distance: 200,
            duration: 0.4
          }
        }
      },
      particles: {
        color: {
          value: '#ffffff'
        },
        links: {
          color: '#ffffff',
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1
        },
        collisions: {
          enable: true
        },
        move: {
          direction: 'none',
          enable: true,
          outMode: 'bounce',
          random: false,
          speed: 1,
          straight: false
        },
        number: {
          density: {
            enable: true,
            value_area: 800
          },
          value: 80
        },
        opacity: {
          value: 0.5
        },
        shape: {
          type: 'circle'
        },
        size: {
          random: true,
          value: 5
        }
      },
    }"
    :particles-init="particlesInit"
  />

  <div class="flex flex-column justify-content-center align-items-center min-h-screen">
    <h2 class="text-primary">
      Prueba Técnica
    </h2>
    <h1 class="my-4">
      Christian Carrillo Zúñiga
    </h1>

    <Button
      class="my-4"
      label="Iniciar Demo"
      size="large"
      @click="$router.push('/products')"
    />

    <div class="home">
      <a href="https://github.com/christiancazu">
        <img
          alt="github"
          src="https://www.google.com/s2/favicons?domain=github.com"
        >
        GitHub
      </a>

      <a href="https://www.linkedin.com/in/christiancazu/">
        <img
          alt="linkedin"
          src="https://www.google.com/s2/favicons?domain=stackoverflow.com"
        >
        Stack Overflow
      </a>

      <a href="https://stackoverflow.com/users/10872684/christian-carrillo">
        <img
          alt="stackoverflow"
          src="https://www.google.com/s2/favicons?domain=linkedin.com"
        >
        Linked in
      </a>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { loadSlim } from 'tsparticles-slim'

import Button from 'primevue/button'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const particlesInit = async (engine: any) => {
  await loadSlim(engine)
}
</script>

<style lang="scss">
#tsparticles {
  position: fixed;
  width: 100%;
  z-index: -1;
}

.home {
  display: flex;
  margin-top: 4rem;

  & img {
    height: 24px;
    margin-right: 8px;
  }

  & a {
    text-decoration: none;
    margin: 8px;
    display: flex;
  }
}
</style>
