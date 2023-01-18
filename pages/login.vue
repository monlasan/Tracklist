<template>
  <div class="flex-1 px-6 bg-indigo-50">
    <Head>
      <title>Login</title>
    </Head>
    <div class="p-6 bg-white shadow max-w-sm rounded-md mx-auto mt-20">
      <div
        class="my-4 mb-10 flex items-center text-zinc-700 justify-center gap-2"
      >
        <img
          src="../assets/images/Tracklist-Rounded-Color.png"
          alt="Tracklist Logo"
          width="40"
          class="accent-indigo-600"
        />
        <p class="text-center font-semibold font-montserratAlt text-xl">
          Tracklist
        </p>
      </div>
      <input
        class="border outline-indigo-600 w-full rounded-md shadow p-2 px-3 mb-4"
        type="text"
        name="email"
        placeholder="Email"
        id="email"
      />
      <input
        class="border outline-indigo-600 w-full rounded-md shadow p-2 px-3"
        type="password"
        placeholder="Mot de passe"
        name="password"
        id="password"
      />
      <button
        type="submit"
        class="w-full bg-indigo-600 mt-4 text-center text-sm font-medium text-white p-2 py-3 rounded-md"
      >
        Se connecter
      </button>
      <div
        class="text-sm flex flex-col justify-between gap-y-2 md:flex-row text-zinc-700 items-center mt-4 accent-indigo-600"
      >
        <div class="flex items-center">
          <input type="checkbox" name="rememberMe" id="remember" />
          <label for="rememberMe" class="ml-1">Se souvenir de moi</label>
        </div>
        <nuxt-link to="forgotpassword" class="text-indigo-600 underline"
          >Mot de passe oublié</nuxt-link
        >
      </div>
    </div>
  </div>
</template>
