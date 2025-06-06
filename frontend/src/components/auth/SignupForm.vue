<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { reactive } from 'vue'
import { useAuthStore } from '@/stores/auth.store'

const { signup } = useAuthStore()
const schema = z.object({
  username: z.string({
    required_error: 'Username is required',
  }),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Enter an email address in the correct format, like name@example.com '),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .regex(/\d/, { message: 'At least 1 number - Requirement not met' })
    .regex(/[a-z]/, { message: 'At least 1 lowercase letter - Requirement not met' })
    .regex(/[A-Z]/, { message: 'At least 1 uppercase letter - Requirement not met' }),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  username: undefined,
  email: undefined,
  password: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  event.preventDefault()
  const result = schema.safeParse(state)

  if (!result.success) {
    return console.log(result.error.formErrors.fieldErrors)
  }

  const { username, email, password } = result.data
  await signup({ username, email, password })
  state.username = undefined
  state.email = undefined
  state.password = undefined
}
</script>

<template>
  <div class="max-w-96 flex flex-col border p-10 w-full gap-8 shadow-2xl rounded-2xl">
    <div class="text-center">
      <h1 class="text-2xl font-bold mb-2">Create an account</h1>
      <p>Already have an account? <ULink :to="{ name: 'signin' }">Sign in</ULink>.</p>
    </div>
    <UForm :schema="schema" :state="state" class="space-y-6" @submit="onSubmit">
      <UFormField label="Username" name="username" required>
        <UInput v-model="state.username" placeholder="Enter your username" class="block" />
      </UFormField>

      <UFormField label="Email" name="email" required hint="Exemple : name@example.com">
        <UInput v-model="state.email" placeholder="Enter your email" class="block" />
      </UFormField>
      <IndicatorPasswordInput v-model="state.password" />

      <UButton type="submit" block> Create account </UButton>
    </UForm>
  </div>
</template>
