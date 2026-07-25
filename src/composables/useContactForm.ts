import { reactive, ref, type Ref } from 'vue'

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export type ContactFormStatus = 'idle' | 'submitting' | 'success'

const FIELD_ORDER: Array<keyof ContactFormData> = ['name', 'email', 'subject', 'message']
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const emptyFormData = (): ContactFormData => ({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const emptyTouched = () => ({
  name: false,
  email: false,
  subject: false,
  message: false,
})

const emptyErrors = (): ContactFormData => ({
  name: '',
  email: '',
  subject: '',
  message: '',
})

export function useContactForm() {
  const form = reactive<ContactFormData>(emptyFormData())
  const touched = reactive(emptyTouched())
  const errors = reactive<ContactFormData>(emptyErrors())
  const status: Ref<ContactFormStatus> = ref('idle')

  const fieldError = (field: keyof ContactFormData): string => {
    const value = form[field].trim()
    if (!value) return 'This field is required'
    if (field === 'email' && !EMAIL_PATTERN.test(value)) return 'Enter a valid email address'
    return ''
  }

  const recomputeErrors = () => {
    FIELD_ORDER.forEach((field) => {
      errors[field] = fieldError(field)
    })
  }

  const touchField = (field: keyof ContactFormData) => {
    touched[field] = true
    recomputeErrors()
  }

  const validate = (): boolean => {
    FIELD_ORDER.forEach((field) => {
      touched[field] = true
    })
    recomputeErrors()
    return FIELD_ORDER.every((field) => errors[field] === '')
  }

  const firstInvalidField = (): keyof ContactFormData | null => {
    return FIELD_ORDER.find((field) => errors[field] !== '') ?? null
  }

  const submitContactForm = async (_data: ContactFormData): Promise<{ success: boolean }> => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    return { success: true }
  }

  const submit = async (): Promise<boolean> => {
    if (!validate()) return false
    status.value = 'submitting'
    await submitContactForm({ ...form })
    status.value = 'success'
    return true
  }

  const reset = () => {
    Object.assign(form, emptyFormData())
    Object.assign(touched, emptyTouched())
    Object.assign(errors, emptyErrors())
    status.value = 'idle'
  }

  return {
    form,
    errors,
    touched,
    status,
    touchField,
    validate,
    firstInvalidField,
    submit,
    reset,
  }
}
