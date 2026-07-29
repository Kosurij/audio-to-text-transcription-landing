import { reactive, ref, type Ref } from 'vue'

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactFormValues extends ContactFormData {
  website: string
  attachments: File[]
}

export const MAX_ATTACHMENTS = 3
export const MAX_ATTACHMENT_SIZE = 5 * 1024 * 1024 // 5 MB

function isAllowedAttachmentType(mimetype: string): boolean {
  return mimetype.startsWith('image/') || mimetype === 'application/pdf'
}

export type ContactFormStatus = 'idle' | 'submitting' | 'success' | 'error'

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
  const form = reactive<ContactFormValues>({ ...emptyFormData(), website: '', attachments: [] })
  const touched = reactive(emptyTouched())
  const errors = reactive<ContactFormData>(emptyErrors())
  const status: Ref<ContactFormStatus> = ref('idle')
  const attachmentError: Ref<string> = ref('')

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

  const addFiles = (files: File[]) => {
    for (const file of files) {
      if (form.attachments.length >= MAX_ATTACHMENTS) {
        attachmentError.value = `You can attach up to ${MAX_ATTACHMENTS} files`
        return
      }
      if (file.size > MAX_ATTACHMENT_SIZE) {
        attachmentError.value = `${file.name} is larger than ${MAX_ATTACHMENT_SIZE / 1024 / 1024} MB`
        return
      }
      if (!isAllowedAttachmentType(file.type)) {
        attachmentError.value = `${file.name} is not an image or PDF`
        return
      }
      form.attachments.push(file)
      attachmentError.value = ''
    }
  }

  const removeFile = (index: number) => {
    form.attachments.splice(index, 1)
    attachmentError.value = ''
  }

  const submitContactForm = async (data: ContactFormValues): Promise<void> => {
    const body = new FormData()
    body.append('name', data.name)
    body.append('email', data.email)
    body.append('subject', data.subject)
    body.append('message', data.message)
    body.append('website', data.website)
    data.attachments.forEach((file) => body.append('attachments', file))

    // No explicit Content-Type header — the browser sets the multipart boundary itself.
    const response = await fetch('https://api.audio-to-text-transcription.com/contact', {
      method: 'POST',
      body,
    })
    if (!response.ok) {
      throw new Error(`Contact form request failed with status ${response.status}`)
    }
  }

  const submit = async (): Promise<boolean> => {
    if (!validate()) return false
    status.value = 'submitting'
    try {
      await submitContactForm({ ...form })
      status.value = 'success'
      return true
    } catch {
      status.value = 'error'
      return false
    }
  }

  const reset = () => {
    Object.assign(form, emptyFormData(), { website: '', attachments: [] })
    Object.assign(touched, emptyTouched())
    Object.assign(errors, emptyErrors())
    attachmentError.value = ''
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
    attachmentError,
    addFiles,
    removeFile,
  }
}
