/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Klucz dostępu Web3Forms. Bez niego formularz otwiera program pocztowy. */
  readonly VITE_WEB3FORMS_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
