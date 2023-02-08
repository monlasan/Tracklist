<script setup>
import useVuelidate from '@vuelidate/core';
import useToast from '~~/composables/useToast';
import {
  required,
  email,
  minLength,
  maxLength,
  alphaNum,
  helpers,
} from '@vuelidate/validators';

import { useAuthMetadataStore } from '~~/composables/states';
const memberAuth = useAuthMetadataStore();
definePageMeta({
  middleware: ['auth'],
});
const inProcess = ref();
const formLogin = reactive({
  email: '',
  password: '',
  rememberMe: false,
});
const rules = {
  email: {
    required: helpers.withMessage('Ce champ est requis !', required),
    email: helpers.withMessage('Entrez une adresse email valide !', email),
  },
  password: {
    required: helpers.withMessage('Ce champ est requis !', required),
    minLength: helpers.withMessage('Au moins 6 caractères !', minLength(6)),
    maxLength: helpers.withMessage('Au plus 20 caractères !', maxLength(20)),
    alphaNum: helpers.withMessage(
      'Uniquement des caractères alphanumériques !',
      alphaNum
    ),
  },
};
const $v = useVuelidate(rules, formLogin);

const client = useSupabaseAuthClient();
async function handleLogin() {
  inProcess.value = true;
  const validatedLogin = await $v.value.$validate();
  if (validatedLogin) {
    // CREATE SUPABASE USER (auth)
    try {
      const { data, error } = await client.auth.signInWithPassword({
        email: formLogin.email,
        password: formLogin.password,
      });

      if (error && error.status === 400) {
        const err = error.message;
        if (err.toLowerCase() === 'invalid login credentials')
          useToast().error('Identifiants incorrects !');
        if (err.toLowerCase() === 'email not confirmed')
          useToast().error(
            'Email non confirmer, veuillez confirmer votre inscription !'
          );
      }

      formLogin.email = '';
      formLogin.password = '';
      $v.value.$reset();
    } finally {
      inProcess.value = false;
    }
  }
}
const user = useSupabaseUser();
onMounted(() => {
  watchEffect(async () => {
    if (user.value) {
      navigateTo('/dashboard');
    }
  });
});
</script>
<template>
  <div class="flex-1 px-6 bg-indigo-50">
    <Head>
      <title>Connexion - Tracklist</title>
    </Head>
    <form
      @submit.prevent="handleLogin"
      class="p-6 relative bg-white shadow max-w-sm rounded-md mx-auto mt-24"
    >
      <UILogoFull />
      <div class="flex flex-col gap-2">
        {{ memberAuth }}
        <div class="grid grid-cols-3 items-center mt-2">
          <span class="border-b"></span>
          <h2 class="mx-auto inline text-zinc-700">Connexion</h2>
          <span class="border-b"></span>
        </div>
        <div>
          <FormInputBase
            name="email"
            label="Email"
            class="py-2"
            v-model="formLogin.email"
          />
          <ul class="list-disc list-inside pl-2 mt-2">
            <li
              :key="addtableinputError.$uid"
              v-for="addtableinputError in $v.email.$errors"
              class="text-xs text-red-600 font-medium"
            >
              {{ addtableinputError.$message }}
            </li>
          </ul>
        </div>
        <div>
          <FormInputBase
            name="pwd"
            type="password"
            label="Mot de passe"
            class="py-2"
            v-model="formLogin.password"
          />
          <ul class="list-disc list-inside pl-2 mt-2">
            <li
              :key="addtableinputError.$uid"
              v-for="addtableinputError in $v.password.$errors"
              class="text-xs text-red-600 font-medium"
            >
              {{ addtableinputError.$message }}
            </li>
          </ul>
        </div>
      </div>

      <UIBtnRegular
        :disabled="
          inProcess || formLogin.email == '' || formLogin.password == ''
        "
        bType="submit"
        text="Se connecter"
        type="blue"
        class="mt-4 py-3"
        full
      />
      <p class="text-xs text-center mt-4 text-zinc-600">
        Pas encore de compte ?
        <nuxt-link to="register" class="text-task-5 underline"
          >Créez en un</nuxt-link
        >
      </p>
      <div
        class="text-sm flex flex-col justify-between gap-y-2 md:flex-row text-zinc-700 items-center mt-6 accent-indigo-600"
      >
        <div class="flex items-center">
          <input
            type="checkbox"
            name="rememberMe"
            id="rememberMe"
            v-model="formLogin.rememberMe"
          />
          <label for="rememberMe" class="ml-1">Se souvenir de moi</label>
        </div>
        <nuxt-link to="forgotpassword" class="text-indigo-600 underline"
          >Mot de passe oublié ?</nuxt-link
        >
      </div>
    </form>
  </div>
</template>
