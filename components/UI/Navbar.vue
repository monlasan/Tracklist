<template>
  <header>
    <nav
      class="w-full bg-task-1 sm:text-blue-700 md:text-red-700 lg:text-yellow-700 xl:text-green-700 flex gap-4 justify-center"
    >
      <nuxt-link
        class="p-2 rounded-md hover:bg-white/10 transition-colors"
        to="/"
        >Home</nuxt-link
      >
      <nuxt-link
        class="p-2 rounded-md hover:bg-white/10 transition-colors"
        to="/dashboard"
        >Dashboard</nuxt-link
      >
      <nuxt-link
        class="p-2 rounded-md hover:bg-white/10 transition-colors"
        to="/login"
        >Login</nuxt-link
      >
      <nuxt-link
        class="p-2 rounded-md hover:bg-white/10 transition-colors"
        to="/register"
        >Register</nuxt-link
      >
      <nuxt-link
        class="p-2 rounded-md hover:bg-white/10 transition-colors"
        to="/widgets"
        >Widgets</nuxt-link
      >
    </nav>
  </header>
</template>
