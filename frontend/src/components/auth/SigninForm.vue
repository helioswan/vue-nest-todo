<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'

const { signin } = useAuthStore()
const schema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Enter an email address in the correct format, like name@example.com '),
  password: z.string({
    required_error: 'Password is required',
  }),
})

const showPassword = ref(false)

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data)
  signin()
}
</script>

<template>
  <div class="max-w-96 flex flex-col border p-10 w-full gap-8 shadow-2xl rounded-2xl">
    <div class="text-center">
      <h1 class="text-2xl font-bold mb-2">Welcome back!</h1>
      <p>Don't have an account? <ULink :to="{ name: 'signup' }">Sign up</ULink>.</p>
    </div>
    <UForm :schema="schema" :state="state" class="space-y-6" @submit="onSubmit">
      <UFormField label="Email" name="email" required hint="Exemple : name@example.com">
        <UInput v-model="state.email" placeholder="Enter your email" class="block" />
      </UFormField>

      <UFormField label="Password" name="password" required>
        <UInput
          v-model="state.password"
          placeholder="Enter your password"
          :type="showPassword ? 'text' : 'password'"
          block
          class="block"
          :ui="{ trailing: 'pe-1' }"
        >
          <template #trailing>
            <UButton
              color="neutral"
              variant="link"
              size="sm"
              :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
              :aria-pressed="showPassword"
              aria-controls="password"
              @click="showPassword = !showPassword"
            />
          </template>
        </UInput>
      </UFormField>

      <UButton type="submit" block> Log In </UButton>
    </UForm>
  </div>
</template>
