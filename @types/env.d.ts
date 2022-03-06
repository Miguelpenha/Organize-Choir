declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PROJECT_PATH: string,
        IGNORE_FILE: string
      }
    }
}

export {}