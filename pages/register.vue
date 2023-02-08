<script setup>
import useVuelidate from '@vuelidate/core';
import {
  required,
  email,
  minLength,
  maxLength,
  alphaNum,
  sameAs,
  helpers,
} from '@vuelidate/validators';

definePageMeta({
  middleware: ['auth'],
});

const inProcess = ref();

const formLogin = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  rememberMe: false,
});
const rules = computed(() => {
  return {
    firstName: {
      required: helpers.withMessage('Ce champ est requis !', required),
      minLength: helpers.withMessage('Au moins 2 caractères !', minLength(2)),
      maxLength: helpers.withMessage('Au plus 25 caractères !', maxLength(25)),
    },
    lastName: {
      required: helpers.withMessage('Ce champ est requis !', required),
      minLength: helpers.withMessage('Au moins 2 caractères !', minLength(2)),
      maxLength: helpers.withMessage('Au plus 25 caractères !', maxLength(25)),
    },
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
    confirmPassword: {
      required: helpers.withMessage('Ce champ est requis !', required),
      sameAs: helpers.withMessage(
        'Les mots de passe ne correspondent pas !',
        sameAs(formLogin.password)
      ),
    },
  };
});
const $v = useVuelidate(rules, formLogin);
const client = useSupabaseAuthClient();

async function handleRegistration() {
  inProcess.value = true;
  const validatedRegistration = await $v.value.$validate();
  if (validatedRegistration) {
    // CREATE SUPABASE USER (auth)
    const { data, error } = await client.auth.signUp({
      email: formLogin.email,
      password: formLogin.password,
    });
    console.log(data);
    if (!error) {
      // CREATE SUPABASE USER (profile)
      await $fetch('/api/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: data.user.id,
          firstName: formLogin.firstName,
          lastName: formLogin.lastName,
          email: formLogin.email,
        }),
      });
      // Navigate to dashboard
      navigateTo('/login');
    }

    formLogin.firstName = '';
    formLogin.lastName = '';
    formLogin.email = '';
    formLogin.password = '';
    formLogin.confirmPassword = '';
    $v.value.$reset();
    inProcess.value = false;
  }
}

const user = useSupabaseUser();
onMounted(() => {
  if (user.value) {
    navigateTo('/dashboard');
  }
});
</script>
<template>
  <div class="flex-1 px-6 bg-indigo-50">
    <Head>
      <title>Inscription - Tracklist</title>
    </Head>
    <form
      @submit.prevent="handleRegistration"
      class="p-6 relative bg-white shadow max-w-md rounded-md mx-auto mt-24"
    >
      <UILogoFull />
      <div class="flex flex-col gap-2">
        <div class="grid grid-cols-3 items-center mt-2">
          <span class="border-b"></span>
          <h2 class="mx-auto inline text-zinc-700">Inscription</h2>
          <span class="border-b"></span>
        </div>
        <div class="flex flex-col md:flex-row gap-4 mt-2">
          <div>
            <FormInputBase
              name="Nom"
              label="Nom"
              class="py-2"
              v-model="formLogin.firstName"
            />
            <ul class="list-disc list-inside pl-2 mt-2">
              <li
                :key="addtableinputError.$uid"
                v-for="addtableinputError in $v.firstName.$errors"
                class="text-xs text-red-600 font-medium"
              >
                {{ addtableinputError.$message }}
              </li>
            </ul>
          </div>
          <div>
            <FormInputBase
              name="Prénom"
              label="Prénom"
              class="py-2"
              v-model="formLogin.lastName"
            />
            <ul class="list-disc list-inside pl-2 mt-2">
              <li
                :key="addtableinputError.$uid"
                v-for="addtableinputError in $v.lastName.$errors"
                class="text-xs text-red-600 font-medium"
              >
                {{ addtableinputError.$message }}
              </li>
            </ul>
          </div>
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
        <div>
          <FormInputBase
            name="confirmPwd"
            type="password"
            label="Confirmer le mot de passe"
            class="py-2"
            v-model="formLogin.confirmPassword"
          />
          <ul class="list-disc list-inside pl-2 mt-2">
            <li
              :key="addtableinputError.$uid"
              v-for="addtableinputError in $v.confirmPassword.$errors"
              class="text-xs text-red-600 font-medium"
            >
              {{ addtableinputError.$message }}
            </li>
          </ul>
        </div>
      </div>

      <UIBtnRegular
        :disabled="
          inProcess ||
          formLogin.confirmPassword == '' ||
          formLogin.lastName == '' ||
          formLogin.firstName == '' ||
          formLogin.email == '' ||
          formLogin.password == ''
        "
        bType="submit"
        text="S'inscrire"
        type="blue"
        class="mt-4 py-3"
        full
      />
      <p class="text-xs text-center mt-4 text-zinc-600">
        Vous avez déjà un compte ?
        <nuxt-link to="login" class="text-task-5 underline"
          >Connectez vous</nuxt-link
        >
      </p>
    </form>
  </div>
</template>
